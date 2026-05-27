import os
import json
import re
import markdown

def clean_html(text):
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')

def convert_ipynb_to_html(ipynb_path, output_html_path, title, description, skills_used, theme_class, header_icon):
    if not os.path.exists(ipynb_path):
        print(f"Error: {ipynb_path} does not exist.")
        return

    with open(ipynb_path, 'r', encoding='utf-8') as f:
        notebook = json.load(f)

    # Scan directory for resource files
    proj_dir = os.path.dirname(ipynb_path)
    resources = []
    
    # Check what files exist in the project folder to list them
    for f_name in sorted(os.listdir(proj_dir)):
        f_path = os.path.join(proj_dir, f_name)
        if os.path.isfile(f_path):
            if f_name.endswith('.ipynb'):
                resources.append({
                    'name': f_name,
                    'icon': 'fa-file-code',
                    'type': 'ipynb'
                })
            elif f_name.endswith('.csv'):
                resources.append({
                    'name': f_name,
                    'icon': 'fa-file-csv',
                    'type': 'csv'
                })

    # We need to extract Table of Contents (all H1 and H2 in markdown cells)
    toc = []
    cell_htmls = []
    plotly_charts = []
    chart_counter = 0

    for idx, cell in enumerate(notebook.get('cells', [])):
        cell_type = cell.get('cell_type')
        source_lines = cell.get('source', [])
        source = "".join(source_lines)

        if cell_type == 'markdown':
            cleaned_lines = [l.strip() for l in source_lines if l.strip()]
            
            # Check if this cell represents or starts with a heading
            is_heading_cell = False
            heading_text = ""
            
            if cleaned_lines:
                first_line = cleaned_lines[0]
                
                # 1. Standard markdown headers
                if first_line.startswith('#'):
                    is_heading_cell = True
                    heading_text = re.sub(r'^#+\s*', '', first_line).strip()
                # 2. Heuristics for plain text headings
                elif len(first_line) < 60 and not first_line.endswith('.') and not first_line.endswith('?') and not first_line.endswith('!'):
                    if len(cleaned_lines) == 1 or (len(cleaned_lines) > 1 and not cleaned_lines[1].strip()):
                        is_heading_cell = True
                        heading_text = first_line
            
            if is_heading_cell and heading_text:
                anchor = re.sub(r'[^a-z0-9\-]+', '-', heading_text.lower()).strip('-')
                toc.append({'level': 2, 'text': heading_text, 'anchor': anchor})
                
                # Replace the heading line with standard markdown h2 syntax to ensure it renders correctly
                if not first_line.startswith('#'):
                    for i_line, line_content in enumerate(source_lines):
                        if line_content.strip() == first_line:
                            source_lines[i_line] = f'## {heading_text}\n'
                            break
                    source = "".join(source_lines)

            # Render markdown
            html_content = markdown.markdown(source, extensions=['fenced_code', 'codehilite'])
            
            # Post-process headings to add anchors
            def add_anchors(match):
                level = match.group(1)
                text = match.group(2)
                anchor = re.sub(r'[^a-z0-9\-]+', '-', text.lower()).strip('-')
                return f'<h{level} id="{anchor}">{text}</h{level}>'
            
            html_content = re.sub(r'<h([1-6])>(.*?)</h\1>', add_anchors, html_content)
            
            cell_htmls.append(f'<div class="cell markdown-cell">{html_content}</div>')

        elif cell_type == 'code':
            escaped_code = clean_html(source)
            
            # Render outputs
            outputs_html = []
            for out in cell.get('outputs', []):
                out_type = out.get('output_type')
                
                if out_type == 'stream':
                    text = "".join(out.get('text', []))
                    outputs_html.append(f'<pre class="terminal-output">{clean_html(text)}</pre>')
                
                elif out_type in ('execute_result', 'display_data'):
                    data = out.get('data', {})
                    
                    # 1. Plotly interactive json
                    if 'application/vnd.plotly.v1+json' in data:
                        chart_id = f'plotly-chart-{chart_counter}'
                        chart_counter += 1
                        plotly_json = data['application/vnd.plotly.v1+json']
                        plotly_charts.append({
                            'id': chart_id,
                            'data': plotly_json.get('data', []),
                            'layout': plotly_json.get('layout', {}),
                            'config': plotly_json.get('config', {})
                        })
                        outputs_html.append(f'<div class="plotly-container"><div id="{chart_id}" class="plotly-chart"></div></div>')
                    
                    # 2. Render standard HTML (pandas DataFrames tables)
                    elif 'text/html' in data:
                        html_table = "".join(data['text/html'])
                        outputs_html.append(f'<div class="table-container">{html_table}</div>')
                        
                    # 3. Render base64 images (static plots)
                    elif 'image/png' in data:
                        b64_data = data['image/png'].replace('\n', '')
                        outputs_html.append(f'<div class="image-output"><img src="data:image/png;base64,{b64_data}" alt="Output Chart"></div>')
                        
                    # 4. Fallback text
                    elif 'text/plain' in data:
                        text_val = "".join(data['text/plain'])
                        outputs_html.append(f'<pre class="terminal-output">{clean_html(text_val)}</pre>')

            outputs_rendered = ""
            if outputs_html:
                outputs_rendered = f'<div class="cell-outputs"><div class="outputs-title">Outputs</div>{"".join(outputs_html)}</div>'

            code_html = f'''
            <div class="cell code-cell">
                <details class="code-details" open>
                    <summary class="code-summary">
                        <span class="code-summary-title"><i class="fab fa-python"></i> Python Code</span>
                        <button class="copy-btn" onclick="copyCode(this, event)">Copy <i class="far fa-copy"></i></button>
                    </summary>
                    <pre><code class="python">{escaped_code}</code></pre>
                </details>
                {outputs_rendered}
            </div>
            '''
            cell_htmls.append(code_html)

    # Build TOC HTML
    toc_html = ""
    if toc:
        toc_html = '<ul class="toc-list">'
        for t in toc:
            indent_class = 'toc-indent' if t['level'] == 2 else 'toc-parent'
            toc_html += f'<li class="{indent_class}"><a href="#{t["anchor"]}">{t["text"]}</a></li>'
        toc_html += '</ul>'
    else:
        toc_html = '<div style="font-size:0.85rem;color:#718096;font-style:italic;">No section headings found.</div>'

    # Build Resources/Downloads HTML matching the SQL Showcase exactly
    resources_html = ""
    if resources:
        for res in resources:
            if res['type'] == 'ipynb':
                resources_html += f'''
                <p style="font-size: 0.85rem; color: #4a5568; margin-bottom: 6px; font-weight: 600;"><strong>{res['name']} (Code File):</strong></p>
                <a href="{res['name']}" download class="btn btn-primary btn-small" style="display: flex; justify-content: center; align-items: center; font-size: 0.8rem; padding: 8px 10px; width: 100%; margin-bottom: 15px; text-decoration: none;">
                    <i class="fas fa-download"></i> Download Notebook
                </a>
                '''
            elif res['type'] == 'csv':
                root_relative_path = os.path.join(proj_dir, res['name']).replace('\\', '/')
                resources_html += f'''
                <p style="font-size: 0.85rem; color: #4a5568; margin-bottom: 6px; font-weight: 600;"><strong>{res['name']} (Dataset):</strong></p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 15px;">
                    <a href="../../pages/xlsx-viewer.html?file={root_relative_path}" target="_blank" class="btn btn-primary btn-small" style="display: flex; justify-content: center; align-items: center; font-size: 0.8rem; padding: 6px 8px; text-decoration: none;">
                        <i class="fas fa-eye"></i> View Data
                    </a>
                    <a href="{res['name']}" download class="btn btn-outline btn-small" style="display: flex; justify-content: center; align-items: center; font-size: 0.8rem; padding: 6px 8px; border-color: rgba(0,0,0,0.15); color: #333; text-decoration: none;">
                        <i class="fas fa-download"></i> Download
                    </a>
                </div>
                '''
    else:
        resources_html = '<div style="font-size:0.85rem;color:#718096;font-style:italic;">No files found.</div>'

    # Build Skill Tags HTML
    tags_html = "".join([f'<span class="tech-badge">{tag}</span>' for tag in skills_used])

    # Plotly JS initialization script
    plotly_scripts = ""
    for chart in plotly_charts:
        plotly_scripts += f"""
        try {{
            Plotly.newPlot('{chart['id']}', {json.dumps(chart['data'])}, {json.dumps(chart['layout'])}, {json.dumps(chart['config'])});
        }} catch(e) {{
            console.error('Error rendering chart {chart['id']}:', e);
            document.getElementById('{chart['id']}').innerHTML = '<div style="color:red;padding:1rem;">Failed to render interactive chart. Details in console.</div>';
        }}
        """

    # Premium Template matching SQL showcase perfectly
    html_template = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{TITLE}} | Nguyễn Nhật Hải BA Portfolio</title>
    <!-- Modern FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Style CSS -->
    <link rel="stylesheet" href="../../css/style.css">
    <!-- Plotly.js for interactive charts -->
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    
    <style>
        /* Define custom theme variables for Instagram (orange-to-pink gradient theme) */
        body.theme-instagram {
            --accent: #f97316; /* Instagram orange */
            --accent-strong: #ea580c;
            --accent2: #ec4899; /* Instagram pink */
            --accent-soft: #fff7ed;
            --accent-shadow: rgba(249, 115, 22, 0.22);
        }

        /* CSS Grid Layout - minmax(0, 1fr) locks width to container and prevents layout blowouts from long code lines */
        .showcase-grid {
            display: grid;
            grid-template-columns: 350px minmax(0, 1fr);
            gap: 30px;
            margin-top: 30px;
            align-items: start;
        }
        @media (max-width: 992px) {
            .showcase-grid {
                grid-template-columns: 1fr;
            }
        }
        .sidebar {
            position: sticky;
            top: 100px;
            height: fit-content;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        .glass-card {
            background: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            border: 1px solid rgba(0, 0, 0, 0.06);
        }
        .tech-badge-container {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 20px;
        }
        .tech-badge {
            padding: 6px 12px;
            background: var(--accent-soft);
            border: 1px solid rgba(79, 70, 229, 0.15);
            color: var(--accent);
            border-radius: 6px;
            font-weight: 700;
            font-size: 0.85rem;
        }
        body.theme-instagram .tech-badge {
            border-color: rgba(249, 115, 22, 0.15);
        }
        .download-card {
            background: var(--accent-soft);
            border-left: 5px solid var(--accent);
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 25px;
        }
        .toc-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        .toc-list a {
            color: #4a5568;
            font-size: 0.9rem;
            text-decoration: none;
            display: block;
            padding: 6px 12px;
            border-radius: 8px;
            transition: 0.2s ease;
        }
        .toc-list a:hover {
            background: var(--accent-soft);
            color: var(--accent);
            font-weight: 600;
        }
        .toc-indent {
            padding-left: 15px;
            border-left: 1px solid rgba(0,0,0,0.05);
        }

        /* Notebook Cells rendering styling */
        .notebook-content {
            display: flex;
            flex-direction: column;
            gap: 30px;
        }
        .cell {
            background: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            border: 1px solid rgba(0, 0, 0, 0.05);
        }
        .markdown-cell h1, .markdown-cell h2, .markdown-cell h3 {
            color: #2c3e50;
            margin-top: 1.5rem;
            margin-bottom: 1rem;
            font-weight: 700;
        }
        .markdown-cell h1 { font-size: 1.8rem; border-bottom: 3px solid var(--accent); padding-bottom: 10px; }
        .markdown-cell h2 { font-size: 1.45rem; border-bottom: 1px solid rgba(0,0,0,0.08); padding-bottom: 8px; }
        .markdown-cell h3 { font-size: 1.2rem; }
        .markdown-cell p { margin-bottom: 1rem; color: #4a5568; }
        .markdown-cell ul, .markdown-cell ol { margin-left: 1.5rem; margin-bottom: 1rem; color: #4a5568; }
        .markdown-cell li { margin-bottom: 0.35rem; }
        .markdown-cell blockquote {
            border-left: 4px solid var(--accent);
            background: var(--accent-soft);
            padding: 12px 20px;
            margin: 20px 0;
            border-radius: 0 10px 10px 0;
            font-style: italic;
        }

        /* Code Details styling */
        .code-cell {
            padding: 0;
            overflow: hidden;
        }
        .code-details {
            border: none;
        }
        .code-summary {
            list-style: none;
            padding: 14px 20px;
            background: #1e1e2e;
            color: #cbd5e1;
            font-size: 0.85rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
        }
        .code-details[open] .code-summary {
            border-bottom: 1px solid #2e2e3e;
        }
        .code-summary-title {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .code-summary-title i {
            color: #38bdf8;
            font-size: 1.1rem;
        }
        .code-cell pre {
            background: #1e1e2e;
            padding: 20px;
            margin: 0;
            overflow-x: auto;
            font-family: 'Courier New', Courier, monospace;
            font-size: 0.95rem;
        }
        .code-cell code.python {
            color: #cdd6f4;
            display: block;
            white-space: pre;
        }
        .cell-outputs {
            padding: 25px;
            background: #f8fafc;
            border-top: 1px solid rgba(0, 0, 0, 0.05);
        }
        .outputs-title {
            font-size: 0.85rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #64748b;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .outputs-title::before {
            content: '';
            display: inline-block;
            width: 8px;
            height: 8px;
            background: #10b981;
            border-radius: 50%;
        }
        .terminal-output {
            background: #1e1e2e;
            color: #e2e8f0;
            padding: 15px;
            border-radius: 8px;
            font-family: 'Courier New', Courier, monospace;
            font-size: 0.85rem;
            overflow-x: auto;
            margin-bottom: 1.5rem;
            white-space: pre-wrap;
            border-left: 4px solid #64748b;
        }
        .table-container {
            width: 100%;
            overflow-x: auto;
            margin-bottom: 20px;
            border-radius: 10px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        }
        table.dataframe {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.9rem;
            text-align: left;
            background: white;
        }
        table.dataframe th {
            background: #f1f5f9;
            color: #334155;
            font-weight: 600;
            padding: 8px 12px;
            border-bottom: 2px solid #e2e8f0;
        }
        table.dataframe td {
            padding: 8px 12px;
            border-bottom: 1px solid #f1f5f9;
            color: #475569;
        }
        table.dataframe tr:hover td {
            background: #f8fafc;
        }
        .image-output {
            text-align: center;
            margin-bottom: 20px;
            background: white;
            padding: 10px;
            border-radius: 10px;
            border: 1px solid #e2e8f0;
        }
        .image-output img {
            max-width: 100%;
            height: auto;
            border-radius: 6px;
        }
        .plotly-container {
            margin-bottom: 20px;
            background: white;
            border-radius: 10px;
            border: 1px solid #e2e8f0;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        }
        .plotly-chart {
            width: 100%;
            min-height: 480px;
        }
        .copy-btn {
            background: rgba(255, 255, 255, 0.1);
            color: #cbd5e1;
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 4px 10px;
            border-radius: 6px;
            font-weight: 500;
            font-size: 0.75rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 4px;
            transition: 0.2s;
        }
        .copy-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            color: white;
        }
    </style>
</head>
<body class="{{THEME_CLASS}}">
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <a href="../../index.html" class="nav-logo"><i class="fas fa-arrow-left"></i> Back to Portfolio</a>
            <div class="nav-links">
                <a href="../../index.html">Home</a>
                <a href="#overview" class="active">Showcase Notebook</a>
            </div>
        </div>
    </nav>

    <!-- Main Content Container -->
    <div class="container" id="overview">
        <header class="page-header">
            <h1 style="font-size: clamp(2rem, 4vw, 3rem);"><i class="{{ICON}}"></i> {{TITLE}}</h1>
            <p class="subtitle">{{DESCRIPTION}}</p>
        </header>

        <!-- Showcase Workspace Grid -->
        <div class="showcase-grid">
            <!-- Sidebar Specs & Downloads -->
            <aside class="sidebar">
                <div class="glass-card">
                    <h3 style="margin-bottom: 15px; font-size: 1.15rem; font-weight:700;"><i class="fas fa-info-circle"></i> Project Specs</h3>
                    <div class="tech-badge-container">
                        {{TAGS}}
                    </div>

                    <div class="download-card">
                        <h4 style="margin-bottom: 10px; color: #1a202c; font-size: 1rem; font-weight:700;"><i class="fas fa-folder-open"></i> Project Files</h4>
                        <p style="font-size: 0.85rem; color: #4a5568; margin-bottom: 15px;">View or download raw datasets and notebooks.</p>
                        {{RESOURCES}}
                    </div>

                    <h3 style="margin-top: 20px; margin-bottom: 15px; font-size: 1.15rem; font-weight:700;"><i class="fas fa-compass"></i> Table of Contents</h3>
                    {{TOC}}
                </div>
            </aside>

            <!-- Notebook contents -->
            <main class="showcase-content notebook-content">
                {{CELLS}}
            </main>
        </div>
    </div>

    <!-- Footer -->
    <footer class="footer" style="margin-top: 50px; padding: 30px 0; border-top: 1px solid rgba(0,0,0,0.06); text-align: center; color: #718096;">
        <div class="container">
            <p>&copy; 2026 Nguyễn Nhật Hải | Business Analyst &amp; Data Analyst Portfolio Showcase</p>
        </div>
    </footer>

    <!-- Script logic for Copy Code -->
    <script>
        function copyCode(btn, event) {
            event.preventDefault();
            const preElement = btn.closest('.code-details').querySelector('pre');
            const codeText = preElement.innerText;
            navigator.clipboard.writeText(codeText).then(() => {
                const originalHtml = btn.innerHTML;
                btn.innerHTML = 'Copied! <i class="fas fa-check"></i>';
                btn.style.borderColor = '#10b981';
                btn.style.color = '#10b981';
                setTimeout(() => {
                    btn.innerHTML = originalHtml;
                    btn.style.borderColor = '';
                    btn.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy code: ', err);
            });
        }
    </script>

    <!-- Embedded Plotly Graph Generation -->
    <script>
        {{PLOTLY_SCRIPTS}}
    </script>
</body>
</html>
'''

    # Perform string replacements safely without f-string syntax issues
    html = html_template
    html = html.replace('{{THEME_CLASS}}', theme_class)
    html = html.replace('{{ICON}}', header_icon)
    html = html.replace('{{TITLE}}', title)
    html = html.replace('{{DESCRIPTION}}', description)
    html = html.replace('{{TAGS}}', tags_html)
    html = html.replace('{{RESOURCES}}', resources_html)
    html = html.replace('{{TOC}}', toc_html)
    html = html.replace('{{CELLS}}', "".join(cell_htmls))
    html = html.replace('{{PLOTLY_SCRIPTS}}', plotly_scripts)

    with open(output_html_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Successfully converted {ipynb_path} -> {output_html_path}")

if __name__ == "__main__":
    # Convert Instagram Reach Analysis Project (using premium theme-instagram orange-to-pink gradient theme!)
    convert_ipynb_to_html(
        ipynb_path='projects/Instagram Reach Analysis Project/InstaAnalysis.ipynb',
        output_html_path='projects/Instagram Reach Analysis Project/index.html',
        title='Instagram Reach Analysis & Predictions',
        description='Analyzes Instagram reach patterns and features using Python, Pandas, and Plotly. Identifies primary reach drivers (Home, Explore, Hashtags) and creates a predictive analysis of post engagement and followers growth.',
        skills_used=['Python', 'Pandas', 'Plotly Express', 'Interactive Plots', 'Predictive Analysis'],
        theme_class='theme-instagram', # Premium warm orange/pink Instagram theme
        header_icon='fab fa-instagram'
    )

    # Convert AB Testing ( marketing campaigns ) (using standard theme-sql indigo/blue theme)
    convert_ipynb_to_html(
        ipynb_path='projects/AB Testing ( marketing campaigns )/ABTestMarCampaign.ipynb',
        output_html_path='projects/AB Testing ( marketing campaigns )/index.html',
        title='A/B Testing for Marketing Campaigns',
        description='Statistically validates A/B test results for two distinct marketing campaigns (Control and Test Groups) using Python and Plotly. Evaluates conversion rates, clicks, spend efficiency, and sales performance with interactive visualization.',
        skills_used=['A/B Testing', 'Hypothesis Validation', 'Conversion Funnel', 'Spend ROI', 'Interactive Visualizations'],
        theme_class='theme-sql', # Indigo theme for data science
        header_icon='fas fa-flask'
    )
