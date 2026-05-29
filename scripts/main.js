// ==========================================
// SCRIPT PRINCIPAL UNIFICADO Y LIMPIO
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================
    // 1. TEMA DINÁMICO (MODO OSCURO/CLARO)
    // ==========================================
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    const animateIconChange = (isDark) => {
        if (!themeIcon) return;
        themeIcon.style.transform = 'rotate(-90deg) scale(0)';
        themeIcon.style.opacity = '0';
        setTimeout(() => {
            themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
            themeIcon.style.transform = 'rotate(0deg) scale(1)';
            themeIcon.style.opacity = '1';
        }, 150);
    };

    if (localStorage.getItem('theme') === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        if(themeIcon) themeIcon.className = 'fas fa-sun';
    } else {
        if(themeIcon) themeIcon.className = 'fas fa-moon';
    }

    if (themeToggle && themeIcon) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                animateIconChange(false);
            } else {
                document.body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                animateIconChange(true);
            }
        });
    }

    // ==========================================
    // 2. NAVEGACIÓN Y ANIMACIONES
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.innerHTML = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 80);
            }
        }
        setTimeout(type, 300);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('fade-in');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.skill-category, .project-card, .about-text, .contact-item').forEach(el => observer.observe(el));

    const profileContainer = document.querySelector('.profile-img-container');
    if (profileContainer) {
        profileContainer.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => this.style.transform = 'scale(1.08)', 150);
        });
    }

    // ==========================================
    // 3. TOASTS Y DESCARGA DE PDF ESTÁTICO
    // ==========================================
    window.showToast = function(msg, type) {
        const existingToasts = document.querySelectorAll('.pdf-toast');
        existingToasts.forEach(t => t.remove());

        const t = document.createElement('div');
        t.className = 'pdf-toast';
        t.textContent = msg;
        t.style.cssText = `position:fixed; bottom:20px; left:50%; transform:translateX(-50%); background:${type==='error'?'#FF6B6B':'#00B4B3'}; color:white; padding:12px 24px; border-radius:8px; z-index:100000; font-weight:bold; font-family:sans-serif; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: opacity 0.5s ease; opacity: 1;`;
        document.body.appendChild(t);
        
        setTimeout(() => {
            t.style.opacity = '0';
            setTimeout(() => t.remove(), 500);
        }, 2500);
    };

    const downloadBtn = document.getElementById('downloadPdf');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            window.showToast('📄 Abriendo Currículum...', 'success');
        });
    }

    // ==========================================
    // 4. FUNCIONES GLOBALES DE MODALES (MIGRADO DE HTML)
    // ==========================================
    window.abrirModal = function(idModal) {
        const modal = document.getElementById(idModal);
        if (modal) {
            modal.style.display = 'flex'; 
            setTimeout(() => modal.classList.add('show'), 10);
            document.body.style.overflow = 'hidden'; // Evita que el fondo haga scroll
        }
    };

    window.cerrarModal = function(idModal) {
        const modal = document.getElementById(idModal);
        if (modal) {
            modal.style.display = 'none';
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    };

    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
            event.target.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // ==========================================
    // 5. INICIALIZAR CLASES
    // ==========================================
    new ProjectGallery();
    new MetricsDashboard();
});

// ==========================================
// CLASES GLOBALES
// ==========================================
class ProjectGallery {
    constructor() {
        this.setupImageGallery();
    }

    setupImageGallery() {
        // Busca todas las imágenes dentro de las galerías de los modales
        document.querySelectorAll('.modal-gallery img').forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', (e) => {
                this.openLightbox(e.target.src, e.target.alt);
            });
        });
    }

    openLightbox(src, alt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        
        lightbox.innerHTML = `
            <div style="position: relative; max-width: 90%; max-height: 90vh; text-align: center;">
                <span class="lightbox-close" style="position: absolute; top: -40px; right: 0; color: white; font-size: 35px; cursor: pointer; font-weight: bold;">&times;</span>
                <img src="${src}" alt="${alt}" style="max-width: 100%; max-height: 80vh; object-fit: contain; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                <div style="color: white; margin-top: 15px; font-family: sans-serif; font-size: 16px;">${alt}</div>
            </div>
        `;
        
        lightbox.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.9); display: flex; align-items: center; justify-content: center;
            z-index: 200000; opacity: 0; transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(lightbox);
        setTimeout(() => lightbox.style.opacity = '1', 10);
        
        const closeFn = () => {
            lightbox.style.opacity = '0';
            setTimeout(() => { if (document.body.contains(lightbox)) document.body.removeChild(lightbox); }, 300);
        };

        lightbox.querySelector('.lightbox-close').addEventListener('click', closeFn);
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeFn(); });
        
        const closeHandler = (e) => {
            if (e.key === 'Escape') {
                closeFn();
                document.removeEventListener('keydown', closeHandler);
            }
        };
        document.addEventListener('keydown', closeHandler);
    }
}

class MetricsDashboard {
    constructor() {
        this.setupCounterAnimation();
        this.setupCharts();
    }
    
    setupCounterAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        document.querySelectorAll('.metric-number').forEach(c => observer.observe(c));
    }
    
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const step = target / (2000 / 16);
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target >= 1000 ? (target/1000).toFixed(1)+'k' : target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    setupCharts() {
        if(typeof Chart === 'undefined') return;

        const initSafeChart = (canvasId, config) => {
            const canvas = document.getElementById(canvasId);
            if (!canvas) return;
            const existingChart = Chart.getChart(canvas);
            if (existingChart) existingChart.destroy();
            new Chart(canvas.getContext('2d'), config);
        };

        // Radar: Dominio Conceptual (Escala 1 a 5)
        initSafeChart('skillsRadarChart', {
            type: 'radar',
            data: {
                labels: ['Ciencias de la Computación', 'Backend (Laravel)', 'Hardware & Soporte', 'Data Science (AI)', 'Móvil (Flutter)', 'Admin. Servidores'],
                datasets: [{
                    label: 'Nivel Conceptual (1-5)', 
                    data: [5, 4, 5, 4, 3.5, 3.5], // Escala basada en tus respuestas
                    backgroundColor: 'rgba(0, 180, 179, 0.2)', borderColor: '#00B4B3', borderWidth: 2
                }]
            },
            options: { 
                scales: { 
                    r: { beginAtZero: true, max: 5, ticks: { stepSize: 1 } } 
                } 
            }
        });

        // Barras: Años de Experiencia Reales
        initSafeChart('skillsBarChart', {
            type: 'bar',
            data: {
                labels: ['Hardware', 'Python/ML', 'Laravel', 'Bases de Datos', 'Flutter', 'Ubuntu VPS'],
                datasets: [{
                    label: 'Años de Experiencia', 
                    data: [4, 3, 2, 1.5, 1, 1], // Tus datos reales
                    backgroundColor: ['#00B4B3','#FF6B6B','#3498DB','#9B59B6','#F1C40F', '#E67E22']
                }]
            },
            options: { 
                indexAxis: 'y', 
                scales: { x: { beginAtZero: true, max: 4.5, ticks: { stepSize: 1 } } }, 
                plugins: { legend: { display: false } } 
            }
        });

        initSafeChart('projectsPieChart', {
            type: 'doughnut',
            data: {
                labels: ['SaaS & Apps', 'Sistemas Backend', 'IoT & Infraestructura', 'Análisis de Datos'],
                datasets: [{ data: [40, 30, 15, 15], backgroundColor: ['#00B4B3','#FF6B6B','#3498DB','#9B59B6'] }]
            }
        });
    }
}