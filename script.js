document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    // Khởi tạo AOS
    AOS.init({
        duration: 800,
        once: false,
        offset: 120,
        easing: 'ease-in-out-quad'
    });

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);

    // Load theme từ localStorage
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }

    // Khởi tạo carousel
    initCarousel();

    // Thêm smooth scroll
    initSmoothScroll();

    // Hiển thị nút scroll-to-top khi cuộn xuống
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    // Cuộn lên đầu trang khi bấm nút scroll-to-top
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// ================ CAROUSEL LOGIC ================
const projects = [
    {
        title: "Game Android",
        description: "Game chạy trên thành phố, vượt tránh các chướng ngại vật, thu thập xu và ghi điểm",
        tech: ["unity"],
        source: "https://github.com/danhlecoder/RunningGame-Unity"
    },
    {
        title: "Web Profile",
        description: "Trang web cá nhân giới thiệu bản thân và kỹ năng của bạn.",
        tech: ["html", "css", "javascript"],
        source: "https://github.com/yourusername/ecommerce-platform"
    },
    {
        title: "Ứng dụng quản lý đặt món",
        description: "Một ứng dụng quản lý nhà hàng, cho phép nhân viên đặt bàn, quản lý thực đơn và báo cáo doanh thu.",
        tech: ["java"],
        source: "https://github.com/danhlecoder/QuanLyNhaHang"
    },
    {
        title: "Title",
        description: "description",
        tech: ["angular", "nestjs", "mysql"],
        source: "https://github.com/"
    },
    {
        title: "Title",
        description: "description",
        tech: ["angular", "nestjs", "mysql"],
        source: "https://github.com/"
    },
    {
        title: "Title",
        description: "description",
        tech: ["angular", "nestjs", "mysql"],
        source: "https://github.com/"
    },
    {
        title: "Title",
        description: "description",
        tech: ["angular", "nestjs", "mysql"],
        source: "https://github.com/"
    }
];

let currentPage = 0;
const projectsPerPage = 3;

function initCarousel() {
    const container = document.querySelector('.carousel-container');
    const dotsContainer = document.querySelector('.dots-container');

    // Tạo project items
    projects.forEach((project, index) => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.innerHTML = `
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-stack">
                    ${project.tech.map(t => `<img src="https://skillicons.dev/icons?i=${t}" alt="${t}" height="35">`).join('')}
                </div>
                <button class="source-code-btn">
                    <i class="fab fa-github"></i>
                    Source Code
                </button>
            </div>
        `;
        container.appendChild(projectItem);

        // Thêm sự kiện click cho thẻ project-item
        projectItem.addEventListener('click', () => {
            console.log(`Clicked on project: ${project.title}, Source: ${project.source}`);
            if (project.source && project.source !== "#") {
                window.open(project.source, '_blank');
            } else {
                alert('Source code link is not available.');
            }
        });
    });

    // Tạo dots
    const totalPages = Math.ceil(projects.length / projectsPerPage);
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToPage(i));
        dotsContainer.appendChild(dot);
    }

    updateCarousel();
}

function updateCarousel() {
    const container = document.querySelector('.carousel-container');
    const projectItems = Array.from(container.children);
    const totalPages = Math.ceil(projectItems.length / projectsPerPage);

    // Tính toán vị trí cuộn
    const scrollPosition = currentPage * container.clientWidth;

    // Cuộn đến vị trí mới
    container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });

    // Cập nhật dots
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentPage);
    });
}

function goToPage(page) {
    currentPage = page;
    updateCarousel();
}

// ================ THEME TOGGLE ================
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// ================ SMOOTH SCROLL ================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'center' // Thay đổi từ 'start' thành 'center'
            });
        });
    });
}

// ================ NAVIGATION CONTROLS ================
document.querySelector('.prev-btn').addEventListener('click', () => {
    currentPage = (currentPage - 1 + Math.ceil(projects.length / projectsPerPage)) % Math.ceil(projects.length / projectsPerPage);
    updateCarousel();
});

document.querySelector('.next-btn').addEventListener('click', () => {
    currentPage = (currentPage + 1) % Math.ceil(projects.length / projectsPerPage);
    updateCarousel();
});