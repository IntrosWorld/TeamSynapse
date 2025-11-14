// Self-Attention Matrix Animation
class AttentionMatrix {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.resize();
        this.cells = [];
        this.gridSize = 16;
        this.time = 0;
        this.init();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        for (let i = 0; i < this.gridSize; i++) {
            this.cells[i] = [];
            for (let j = 0; j < this.gridSize; j++) {
                this.cells[i][j] = {
                    value: Math.random(),
                    phase: Math.random() * Math.PI * 2
                };
            }
        }
    }

    update() {
        this.time += 0.01;

        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                const cell = this.cells[i][j];
                const wave1 = Math.sin(this.time + cell.phase);
                const wave2 = Math.cos(this.time * 0.5 + i * 0.1);
                const wave3 = Math.sin(this.time * 0.3 + j * 0.1);

                cell.value = (wave1 + wave2 + wave3) / 3 * 0.5 + 0.5;
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const cellWidth = this.canvas.width / this.gridSize;
        const cellHeight = this.canvas.height / this.gridSize;

        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                const cell = this.cells[i][j];
                const x = i * cellWidth;
                const y = j * cellHeight;

                // Create gradient based on attention value
                const alpha = cell.value * 0.3;

                // Color interpolation between blue, purple, and cyan
                let r, g, b;
                if (cell.value < 0.5) {
                    // Blue to Purple
                    const t = cell.value * 2;
                    r = Math.floor(0 + (139 - 0) * t);
                    g = Math.floor(212 + (92 - 212) * t);
                    b = Math.floor(255 + (246 - 255) * t);
                } else {
                    // Purple to Cyan
                    const t = (cell.value - 0.5) * 2;
                    r = Math.floor(139 + (6 - 139) * t);
                    g = Math.floor(92 + (182 - 92) * t);
                    b = Math.floor(246 + (212 - 246) * t);
                }

                this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                this.ctx.fillRect(x, y, cellWidth, cellHeight);

                // Add glow effect for high attention values
                if (cell.value > 0.7) {
                    const gradient = this.ctx.createRadialGradient(
                        x + cellWidth / 2, y + cellHeight / 2, 0,
                        x + cellWidth / 2, y + cellHeight / 2, cellWidth
                    );
                    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.8})`);
                    gradient.addColorStop(1, 'transparent');
                    this.ctx.fillStyle = gradient;
                    this.ctx.fillRect(x - cellWidth / 2, y - cellHeight / 2, cellWidth * 2, cellHeight * 2);
                }
            }
        }

        // Draw grid lines
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        this.ctx.lineWidth = 1;

        for (let i = 0; i <= this.gridSize; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * cellWidth, 0);
            this.ctx.lineTo(i * cellWidth, this.canvas.height);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(0, i * cellHeight);
            this.ctx.lineTo(this.canvas.width, i * cellHeight);
            this.ctx.stroke();
        }
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize Attention Matrix Animation
const canvas = document.getElementById('attention-matrix');
if (canvas) {
    const attentionMatrix = new AttentionMatrix(canvas);
    attentionMatrix.animate();
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animatable elements
const animateOnScroll = document.querySelectorAll('.feature-item, .project-card, .team-card, .about-visual');
animateOnScroll.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Project Card Interactions
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Learn More Button Ripple Effect
const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
learnMoreButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple-animation 0.6s ease-out';

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Team Card Hover Effects
const teamCards = document.querySelectorAll('.team-card');
teamCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Create success message
        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(0, 212, 255, 0.9), rgba(139, 92, 246, 0.9));
            padding: 2rem 3rem;
            border-radius: 15px;
            color: white;
            font-size: 1.2rem;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
            animation: slideIn 0.5s ease;
        `;
        successMsg.textContent = 'Message sent successfully! We\'ll get back to you soon.';
        document.body.appendChild(successMsg);

        // Clear form
        this.reset();

        // Remove success message after 3 seconds
        setTimeout(() => {
            successMsg.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => {
                successMsg.remove();
            }, 500);
        }, 3000);

        console.log('Form submitted:', { name, email, message });
    });
}

// Add slide in/out animations
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translate(-50%, -60%);
            opacity: 0;
        }
        to {
            transform: translate(-50%, -50%);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translate(-50%, -50%);
            opacity: 1;
        }
        to {
            transform: translate(-50%, -40%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(animationStyle);

// Parallax Effect on Hero Section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');

        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
        }
    });
}

// Animated Gradient Blobs
function createGradientBlobs() {
    const blobContainer = document.createElement('div');
    blobContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;

    for (let i = 0; i < 3; i++) {
        const blob = document.createElement('div');
        const size = Math.random() * 400 + 200;
        const colors = [
            'rgba(139, 92, 246, 0.1)',
            'rgba(6, 182, 212, 0.1)',
            'rgba(0, 212, 255, 0.1)'
        ];

        blob.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${colors[i]};
            border-radius: 50%;
            filter: blur(80px);
            animation: float-blob ${15 + i * 5}s ease-in-out infinite;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
        `;

        blobContainer.appendChild(blob);
    }

    document.body.appendChild(blobContainer);
}

// Add blob float animation
const blobStyle = document.createElement('style');
blobStyle.textContent = `
    @keyframes float-blob {
        0%, 100% {
            transform: translate(0, 0) scale(1);
        }
        33% {
            transform: translate(30px, -50px) scale(1.1);
        }
        66% {
            transform: translate(-20px, 20px) scale(0.9);
        }
    }
`;
document.head.appendChild(blobStyle);

createGradientBlobs();

// Cursor Glow Effect
const cursor = document.createElement('div');
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 212, 255, 0.5), transparent);
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    display: none;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.display = 'block';
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

// Enhanced cursor on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .team-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.background = 'radial-gradient(circle, rgba(139, 92, 246, 0.5), transparent)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.background = 'radial-gradient(circle, rgba(0, 212, 255, 0.5), transparent)';
    });
});

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Console Easter Egg
console.log('%c🚀 TeamSynapse', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #00d4ff, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cEmpowering rural communities through AI technology', 'font-size: 14px; color: #06b6d4;');
console.log('%cInterested in joining our team? Reach out to us!', 'font-size: 12px; color: #a0a0b0;');
