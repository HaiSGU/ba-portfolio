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
                link: "https://www.udecareer.com/kien-thuc-chuyen-mon/it/ba"
            },
            {
                title: "Giới thiệu tổng quan về BABOK Guide",
                description: "Bài viết giới thiệu chi tiết về BABOK Guide (Business Analysis Body of Knowledge) - Bộ tài liệu chuẩn mực toàn cầu cốt lõi về kỹ năng, kiến thức và các tiêu chuẩn của nghề phân tích nghiệp vụ.",
                tags: ["BABOK", "IIBA", "Tài liệu"],
                keywords: "babok guide iiba tieu chuan kien thuc thong tin udecareer",
                link: "https://www.udecareer.com/bai-viet/babokgioi-thieu-ve-babok-guide_babok5048"
            }
        ],
        templates: [
            {
                title: "Data Analyst Bootcamp Series (Alex The Analyst)",
                description: "Khóa học Bootcamp phân tích dữ liệu toàn diện cực kỳ nổi tiếng trên YouTube. Hướng dẫn thực hành thực tế chi tiết từ SQL, Excel, Python đến các công cụ trực quan hóa Power BI và Tableau.",
                keywords: "da bootcamp alex the analyst youtube sql python excel tableau powerbi khoa hoc mien phi",
                link: "https://www.youtube.com/watch?v=rGx1QNdYzvs&list=PLUaB-1hjhk8FE_XZ87vPPSfHqb6OcM0cF",
                icon: "fa-play",
                btnText: "Xem trên Youtube"
            }
        ]
    },



    // 4. CHỨNG CHỈ (CERTIFICATES)
    // Hãy copy/paste thông tin chứng chỉ từ LinkedIn của bạn vào đây!
    certificates: [
        {
            title: "Tên Chứng Chỉ 1 (Thay thế nội dung ở đây)",
            provider: "Tên Tổ chức Cấp (vd: Google, Coursera)",
            date: "Tháng/Năm Hoàn thành",
            link: "https://url-xac-thuc-chung-chi-cua-ban.com",
            keywords: "certificate credential",
            icon: "fa-award",
            color: "#fbbf24"
        },
        {
            title: "Agile Scrum Master (Ví dụ)",
            provider: "Scrum.org",
            date: "12/2023",
            link: "#",
            keywords: "certificate agile scrum",
            icon: "fa-award",
            color: "#fbbf24"
        }
        // Để thêm chứng chỉ thứ 3, chỉ cần thêm dấu phẩy ở trên và copy xuống.
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
