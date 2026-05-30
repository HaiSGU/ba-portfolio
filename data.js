// TOÀN BỘ DỮ LIỆU CỦA TRANG WEB ĐƯỢC LƯU Ở ĐÂY
// Bạn chỉ cần sửa nội dung trong file này, giao diện web sẽ tự động cập nhật!

const PORTFOLIO_DATA = {
    // 1. THÔNG TIN CÁ NHÂN
    profile: {
        name: "Nguyễn Nhật Hải",
        role: "Business Analyst",
        tagline: "A detail-oriented Business Analyst specializing in requirements gathering, process modeling, and turning complex problems into clear, actionable, and testable strategies.",
        linkedin: "https://www.linkedin.com/in/hai31004/",
        github: "https://github.com/HaiSGU",
        email: "hai.nguyen@example.com" // Hãy sửa lại email thật của bạn
    },

    // 2. DANH SÁCH DỰ ÁN (CASE STUDIES)
    // Để thêm dự án mới, bạn chỉ cần copy 1 khối { ... } và dán xuống dưới, thay đổi nội dung.
    caseStudies: [
        {
            title: "Foodora — Order & Pick-up (MVP)",
            link: "projects/foodora-mvp/project-overview.html",
            description: "A pickup-ordering MVP designed to cut 3rd-party commissions by 20% and capture 1st-party customer data. Packaged to be immediately buildable: PRD, wireflows, and RTM → UAT.",
            image: "projects/thumnail_img/project1.jpg", // Đường dẫn tới ảnh bìa (thumbnail) của dự án
            tags: ["MVP", "14 Deliverables", "16 Test Cases"],
            keywords: "mvp requirements validation foodora" // Từ khóa để tìm kiếm
        },
        {
            title: "Retail Operations Backoffice",
            link: "projects/Retail_System/project-overview.html",
            description: "Streamlines backoffice controls to reduce audit discrepancies by 15%. Features end-to-end BPMN flows, sequence diagrams, and decision tables for complex pricing rules.",
            image: "projects/thumnail_img/project2.jpg",
            tags: ["BPMN Flow", "Reason Codes", "Audit Trail"],
            keywords: "design domain retail analysis backoffice"
        },
        {
            title: "Design & Testing — MOW Garden",
            link: "projects/Design_Testing_MOW_Garden/project-overview.html",
            description: "Ensures zero critical defects before launch. A comprehensive QA pack featuring risk-based test plans, NFR checklists, and performance validation via JMeter.",
            image: "projects/thumnail_img/project3.png",
            tags: ["Test Design", "JMeter", "38 Evidence Files"],
            keywords: "testing design nfr performance mow garden"
        },
        {
            title: "SAP ERP Mock — Order-to-Cash",
            link: "projects/SAP_ERP/project-overview.html",
            description: "A learning-focused SAP mock to practice strict data governance and RBAC (Role-Based Access Control), ensuring 100% compliance in Order-to-Cash operations.",
            image: "projects/thumnail_img/project4.jpg",
            tags: ["O2C Domain", "RBAC", "Rules Traceability"],
            keywords: "erp domain governance sap learning"
        },
        {
            title: "SQL — World Layoffs Cleaning & EDA",
            link: "projects/sql-layoffs-analysis/index.html",
            description: "A comprehensive database project focusing on rigorous data cleaning and exploratory analytics of global layoffs. Leverages staging tables, CTEs, Window functions, and complex aggregations.",
            image: "projects/thumnail_img/sql-layoffs.png",
            tags: ["SQL", "Data Cleaning", "EDA", "Window Functions"],
            keywords: "sql database layouts layoffs analytics cleaning eda window cte world staging"
        },
        {
            title: "Excel — Demographics & Sales Dashboard",
            link: "projects/excel-dashboard/index.html",
            description: "Cleans raw contact records and engineers an interactive demographic analysis tool for bike buyers. Features advanced logic nested IF formulas, dynamic Pivot Tables, and sleek slicer filters.",
            image: "projects/thumnail_img/excel-dashboard.png",
            tags: ["Excel", "Data Cleaning", "Dynamic Slicers", "Pivot Tables"],
            keywords: "excel dashboard bike buyers demographics pivot tables slicers formulas nested if"
        },
        {
            title: "A/B Testing: Marketing Campaigns",
            link: "projects/AB Testing ( marketing campaigns )/index.html",
            description: "A statistical evaluation of A/B test conversion funnels, spend ROI, and click performance across distinct marketing campaigns using Python and interactive Plotly visualization.",
            image: "projects/thumnail_img/ab_testing_real.png",
            tags: ["A/B Testing", "Python", "Plotly", "Statistical ROI"],
            keywords: "a/b testing marketing campaign conversion rate statistics python plotly hypothesis"
        },
        {
            title: "Instagram Reach Analysis & Predictions",
            link: "projects/Instagram Reach Analysis Project/index.html",
            description: "Analyzes Instagram post reach drivers (Explore, Hashtags, Home) and models engagement and followers growth using Python and fully interactive Plotly.js charts.",
            image: "projects/thumnail_img/instagram_reach_real.png",
            tags: ["Data Analytics", "Python", "Plotly Express", "Regression Model"],
            keywords: "instagram reach analysis predictive modeling visualization python plotly social media engagement"
        },
        {
            title: "Tableau — Business Intelligence Showcase",
            link: "projects/Tableau_prj/index.html",
            description: "Two live Tableau Public dashboards: Seattle Airbnb rental market optimization (pricing maps, seasonal trends, bedroom analysis) and global Video Game Sales analytics (genre treemap, console lifecycles, regional distribution).",
            image: "projects/thumnail_img/tableau-showcase.png",
            tags: ["Tableau Public", "Geographic Mapping", "Dual-Axis Chart", "BI Dashboard"],
            keywords: "tableau dashboard airbnb video game sales charts visualization workbook public embed"
        }
    ],




    // 3. TÀI LIỆU HỌC TẬP (LEARN BA)
    learnResources: {
        concepts: [
            {
                title: "Kiến thức chuyên môn Business Analyst (Udecareer)",
                description: "Chuyên mục chia sẻ các kiến thức chuyên môn cốt lõi, kỹ năng phân tích thiết kế hệ thống, tài liệu đặc tả và cẩm nang nghề nghiệp dành riêng cho Business Analyst tại Việt Nam.",
                tags: ["IT BA", "Nghiệp vụ", "Udecareer"],
                keywords: "udecareer kien thuc chuyen mon ba it kien thuc ba nghiep vu",
                link: "https://www.udecareer.com/kien-thuc-chuyen-mon/it/ba",
                visualBg: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                visualIcon: "fas fa-graduation-cap"
            },
            {
                title: "Giới thiệu tổng quan về BABOK Guide",
                description: "Bài viết giới thiệu chi tiết về BABOK Guide (Business Analysis Body of Knowledge) - Bộ tài liệu chuẩn mực toàn cầu cốt lõi về kỹ năng, kiến thức và các tiêu chuẩn của nghề phân tích nghiệp vụ.",
                tags: ["BABOK", "IIBA", "Tài liệu"],
                keywords: "babok guide iiba tieu chuan kien thuc thong tin udecareer",
                link: "https://www.udecareer.com/bai-viet/babokgioi-thieu-ve-babok-guide_babok5048",
                visualBg: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                visualIcon: "fas fa-book"
            }
        ],
        templates: [
            {
                title: "Data Analyst Bootcamp Series (Alex The Analyst)",
                description: "A highly popular, comprehensive Data Analytics Bootcamp on YouTube. Provides hands-on, step-by-step practical guides covering SQL, Excel, Python, and data visualization tools like Power BI and Tableau.",
                keywords: "da bootcamp alex the analyst youtube sql python excel tableau powerbi khoa hoc mien phi",
                link: "https://www.youtube.com/watch?v=rGx1QNdYzvs&list=PLUaB-1hjhk8FE_XZ87vPPSfHqb6OcM0cF",
                icon: "fas fa-play",
                btnText: "Watch on YouTube",
                visualBg: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                visualIcon: "fab fa-youtube"
            },
            {
                title: "Business Analysis Foundations: Business Process Modeling",
                description: "An essential LinkedIn Learning course covering business process modeling foundations. Learn standard BPMN 2.0 notation, process mapping, and how to analyze and improve workflows.",
                keywords: "linkedin learning business process modeling bpmn workflow analysis foundations course",
                link: "https://www.linkedin.com/learning/business-analysis-foundations-business-process-modeling",
                icon: "fab fa-linkedin",
                btnText: "Start Learning",
                visualBg: "linear-gradient(135deg, #0a66c2 0%, #0077b5 100%)",
                visualIcon: "fab fa-linkedin-in"
            },
            {
                title: "Requirements Elicitation for Business Analysis: Stakeholder Conversations",
                description: "Master the art of stakeholder elicitation. Learn active listening techniques, questioning strategies, workshop facilitation, and how to capture requirements accurately through structured conversations.",
                keywords: "requirements gathering elicitation stakeholder conversations facilitation communication linkedin learning course",
                link: "https://www.linkedin.com/learning/requirements-elicitation-for-business-analysis-stakeholder-conversations",
                icon: "fab fa-linkedin",
                btnText: "Start Learning",
                visualBg: "linear-gradient(135deg, #0a66c2 0%, #0077b5 100%)",
                visualIcon: "fab fa-linkedin-in"
            },
            {
                title: "PowerPoint Essential Training (Microsoft 365)",
                description: "A comprehensive course on PowerPoint Microsoft 365. Master presentation design, slide layouts, storytelling with visual aids, and creating high-impact slides for business stakeholders.",
                keywords: "powerpoint presentation microsoft 365 storytelling visual design linkedin learning course",
                link: "https://www.linkedin.com/learning/powerpoint-essential-training-microsoft-365-26213209",
                icon: "fab fa-linkedin",
                btnText: "Start Learning",
                visualBg: "linear-gradient(135deg, #0a66c2 0%, #0077b5 100%)",
                visualIcon: "fab fa-linkedin-in"
            }
        ]
    },



    // 4. CHỨNG CHỈ (CERTIFICATES)
    certificates: [
        {
            title: "Business Analysis Foundations: Business Process Modeling",
            provider: "LinkedIn Learning (IIBA® Course)",
            date: "03/2026",
            link: "assets/Certificate/CertificateOfCompletion_Business Analysis Foundations Business Process Modeling.pdf",
            keywords: "business analysis process modeling bpmn iiba linkedin certificate credential",
            icon: "fa-diagram-project",
            color: "#0284c7"
        },
        {
            title: "Requirements Elicitation for Business Analysis: Stakeholder Conversations",
            provider: "LinkedIn Learning (IIBA® Course)",
            date: "03/2026",
            link: "assets/Certificate/CertificateOfCompletion_Requirements Elicitation for Business Analysis Stakeholder Conversations.pdf",
            keywords: "requirements gathering elicitation business analysis stakeholder engagement iiba linkedin certificate credential",
            icon: "fa-comments",
            color: "#0f766e"
        },
        {
            title: "IELTS Academic (Band 6.0 - B2)",
            provider: "IDP | British Council | Cambridge University Press & Assessment",
            date: "10/2025",
            link: "assets/Certificate/IELTS Cer.pdf",
            keywords: "ielts academic english b2 language test report certificate credential",
            icon: "fa-language",
            color: "#e11d48"
        },
        {
            title: "Basics Tutorial on Business",
            provider: "Business Tutorial Course",
            date: "01/2026",
            link: "assets/Certificate/BasicTutorialBusiness_certificate.pdf",
            keywords: "basics tutorial business foundations certificate credential",
            icon: "fa-briefcase",
            color: "#16a34a"
        }
    ],

    // 5. NGHIÊN CỨU AI (AI RESEARCH)
    aiResearch: [
        {
            title: "MISA AMIS OneAI Deep Dive & Business Model",
            description: "Phân tích chi tiết nền tảng AMIS OneAI: tích hợp đa LLM (GPT, Gemini, Claude, Grok, DeepSeek, MISA AI), quản trị credit doanh nghiệp, trích xuất file (.docx, .xlsx, .pdf), trợ lý AI ảo và hạ tầng GPU bảo mật trong nước.",
            tags: ["MISA OneAI", "Orchestration", "Credit Governance", "Data Sovereignty"],
            keywords: "misa oneai amis ai deep dive model security credit pricing business",
            link: "projects/misa-oneai-research/index.html"
        },
        {
            title: "Onyx (Danswer) Enterprise GenAI Search & Connectors",
            description: "Nghiên cứu sâu nền tảng tìm kiếm doanh nghiệp Onyx (Danswer). Đánh giá tính năng Code Interpreter sandbox, phân quyền Curator, 40+ connectors đồng bộ quyền (Permission Sync) và kiến trúc đa lớp Docker (Next.js + FastAPI + Vespa + Postgres + MinIO).",
            tags: ["Onyx AI", "Code Interpreter", "Vector Search", "FastAPI + Next.js"],
            keywords: "onyx danswer architecture connector curate group role fastapi vespa docker security sso license compliance",
            link: "projects/onyx-research/index.html"
        },
        {
            title: "OpenClaw: Self-Hosted Stateful Agent Gateway Architecture",
            description: "Khảo sát kiến trúc điều phối Agent đa kênh (Telegram, Discord, iMessage) bằng Node.js/TypeScript. Phân tích cơ chế quản lý session (transcript JSONL), nén ngữ cảnh (compaction), skills/plugins và bản làm lại IronClaw bằng Rust.",
            tags: ["OpenClaw", "Agent Gateway", "Compaction & Memory", "IronClaw Rust"],
            keywords: "openclaw ironclaw architecture session gateway telegram discord compaction stateful memory node typescript rust",
            link: "projects/openclaw-architecture/index.html"
        }
    ]
};
