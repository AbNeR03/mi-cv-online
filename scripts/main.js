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

    // Animación suave del giro del ícono
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

    // Cargar preferencia guardada
    if (localStorage.getItem('theme') === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        if(themeIcon) themeIcon.className = 'fas fa-sun';
    } else {
        if(themeIcon) themeIcon.className = 'fas fa-moon';
    }

    // Escuchar clic en el botón
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
    // 2. NAVEGACIÓN Y ANIMACIONES FRONTEND
    // ==========================================
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Efecto TypeWriter (Máquina de escribir)
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
        setTimeout(type, 300); // Pequeño retraso al iniciar
    }

    // Fade-in al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('fade-in');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.skill-category, .project-card, .about-text, .contact-item').forEach(el => observer.observe(el));

    // Efecto clic en la Foto de Perfil
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
        t.style.cssText = `position:fixed; bottom:20px; left:50%; transform:translateX(-50%); background:${type==='error'?'#FF6B6B':'#00B4B3'}; color:white; padding:12px 24px; border-radius:8px; z-index:10000; font-weight:bold; font-family:sans-serif; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: opacity 0.5s ease; opacity: 1;`;
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
    // 4. INICIALIZAR MODALES Y GRÁFICAS
    // ==========================================
    new ProjectModals();
    new MetricsDashboard();
});

// ==========================================
// CLASES GLOBALES
// ==========================================
class ProjectModals {
    constructor() {
        this.setupSkillsModals();
        this.setupModalEvents();
        this.setupImageGallery();
    }
    
    setupSkillsModals() {
        document.querySelectorAll('.skill-category').forEach((category) => {
            category.style.cursor = 'pointer';
            category.style.transition = 'all 0.3s ease';
            category.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 30px rgba(0, 180, 179, 0.2)';
            });
            category.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'var(--shadow)';
            });
        });
    }

    setupModalEvents() {
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => this.closeModal(e.target.closest('.modal')));
        });
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => { if (e.target === modal) this.closeModal(modal); });
        });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.closeAllModals(); });
    }
    
    closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
            modal.classList.remove('active');
            modal.classList.remove('show');
        }
    }
    
    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => this.closeModal(modal));
    }
    // ==========================================
    // NUEVAS FUNCIONES DE GALERÍA (LIGHTBOX)
    // ==========================================
    setupImageGallery() {
        // Busca todas las imágenes dentro de las galerías de los modales
        document.querySelectorAll('.modal-gallery img').forEach(img => {
            img.style.cursor = 'pointer'; // Cambia el cursor para indicar que es clickeable
            img.addEventListener('click', (e) => {
                this.openLightbox(e.target.src, e.target.alt);
            });
        });
    }

    openLightbox(src, alt) {
        // Crear el contenedor oscuro del lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        
        // Estructura HTML de la imagen grande
        lightbox.innerHTML = `
            <div class="lightbox-content" style="position: relative; max-width: 90%; max-height: 90vh;">
                <span class="lightbox-close" style="position: absolute; top: -40px; right: 0; color: white; font-size: 35px; cursor: pointer; font-weight: bold;">&times;</span>
                <img src="${src}" alt="${alt}" style="max-width: 100%; max-height: 80vh; object-fit: contain; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                <div class="lightbox-caption" style="color: white; text-align: center; margin-top: 15px; font-family: sans-serif; font-size: 16px;">${alt}</div>
            </div>
        `;
        
        // Estilos para que cubra toda la pantalla
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 200000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(lightbox);
        
        // Efecto Fade-in
        setTimeout(() => lightbox.style.opacity = '1', 10);
        
        // Función para cerrar suavemente
        const closeFn = () => {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(lightbox)) document.body.removeChild(lightbox);
            }, 300);
        };

        // Eventos para cerrar (clic en la X, clic en el fondo oscuro, o tecla ESC)
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', closeFn);
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeFn();
        });
        
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
            if (existingChart) {
                existingChart.destroy();
            }
            new Chart(canvas.getContext('2d'), config);
        };

        initSafeChart('skillsRadarChart', {
            type: 'radar',
            data: {
                labels: ['Desarrollo Backend', 'Bases de Datos', 'Análisis de Datos', 'Prog. Móvil', 'Infraestructura'],
                datasets: [{
                    label: 'Nivel Actual', data: [85, 90, 75, 80, 85],
                    backgroundColor: 'rgba(0, 180, 179, 0.2)', borderColor: '#00B4B3', borderWidth: 2
                }]
            },
            options: { scales: { r: { beginAtZero: true, max: 100 } } }
        });

        initSafeChart('skillsBarChart', {
            type: 'bar',
            data: {
                labels: ['Laravel', 'PostgreSQL', 'Flutter', 'Python', 'Ubuntu VPS'],
                datasets: [{
                    label: 'Nivel (%)', data: [85, 90, 80, 75, 85],
                    backgroundColor: ['#00B4B3','#FF6B6B','#3498DB','#9B59B6','#F1C40F']
                }]
            },
            options: { indexAxis: 'y', scales: { x: { beginAtZero: true, max: 100 } }, plugins: { legend: { display: false } } }
        });

        initSafeChart('projectsPieChart', {
            type: 'doughnut',
            data: {
                labels: ['App Móvil', 'Backend', 'Infraestructura', 'Análisis de Datos'],
                datasets: [{ data: [35, 25, 25, 15], backgroundColor: ['#00B4B3','#FF6B6B','#3498DB','#9B59B6'] }]
            }
        });
    }
}