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
        }
    ],

    // 3. TÀI LIỆU HỌC TẬP (LEARN BA)
    learnResources: {
        concepts: [
            {
                title: "What a BA actually does",
                description: "Role clarity: discovery, requirements, alignment, and validation.",
                tags: ["Intro", "Scope", "Stakeholders"],
                keywords: "role clarity intro scope stakeholders",
                link: "#"
            },
            {
                title: "User stories vs requirements",
                description: "How to express needs: stories, acceptance criteria, and exceptions.",
                tags: ["Writing", "AC", "Edge Cases"],
                keywords: "user stories requirements writing ac edge cases",
                link: "#"
            },
            {
                title: "Traceability (RTM) explained",
                description: "Why linking requirements to tests prevents gaps and scope creep.",
                tags: ["RTM", "Coverage", "UAT"],
                keywords: "traceability rtm coverage uat gaps",
                link: "#"
            }
        ],
        templates: [
            {
                title: "PRD / Requirements template",
                description: "A practical structure: scope, rules, AC, and non-functional requirements.",
                keywords: "template prd requirements testable",
                link: "#",
                icon: "fa-download",
                btnText: "Download"
            },
            {
                title: "RTM template",
                description: "Requirements → design → test cases (coverage you can prove).",
                keywords: "template rtm coverage design",
                link: "#",
                icon: "fa-download",
                btnText: "Download"
            },
            {
                title: "UAT sign-off pack",
                description: "Simple pack: scenarios, results, defects, and approval notes.",
                keywords: "template uat checklist sign-off pack",
                link: "#",
                icon: "fa-download",
                btnText: "Download"
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
    ]
};
