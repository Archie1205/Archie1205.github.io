// ===== 當頁面載入完成後執行 =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 網站已載入完成！');
    
    // 初始化所有功能
    initNavigation();
    initScrollEffects();
    initSkillCards();
    initProjectCards();
    initContactForm();
});

// ===== 導航列功能 =====
function initNavigation() {
    // 取得當前頁面的檔名
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // 為當前頁面的導航連結加上 active 類別
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // 平滑滾動效果
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 如果是錨點連結
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ===== 滾動效果 =====
function initScrollEffects() {
    // 當滾動時，為導航列加上陰影
    let lastScroll = 0;
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
        } else {
            nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    // 滾動時淡入元素
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 觀察所有 section
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// ===== 技能卡片互動 =====
function initSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        // 點擊時的效果
        card.addEventListener('click', function() {
            this.style.animation = 'pulse 0.5s ease';
            
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
        
        // 滑鼠移入時的效果
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(360deg)';
                icon.style.transition = 'transform 0.6s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
}

// ===== 專案卡片互動 =====
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = '#764ba2';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = '#667eea';
        });
    });
}

// ===== 聯絡表單（如果有的話）=====
function initContactForm() {
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 顯示提交訊息
            alert('感謝您的訊息！我會盡快回覆您。');
            
            // 清空表單
            this.reset();
        });
    }
}

// ===== 動態時間顯示 =====
function updateTime() {
    const footer = document.querySelector('footer p');
    if (footer) {
        const now = new Date();
        const year = now.getFullYear();
        footer.innerHTML = `&copy; ${year} Archie. Made with ❤️ using GitHub Pages`;
    }
}

// 執行時間更新
updateTime();

// ===== 彩蛋：Konami Code =====
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear infinite';
    alert('🎉 你發現了彩蛋！');
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

// ===== 添加彩虹動畫 =====
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);
