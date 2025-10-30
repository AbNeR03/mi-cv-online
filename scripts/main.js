// Toggle tema oscuro/claro
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        document.body.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    }
});

// Cargar tema guardado
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
    }
});

// Smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observar elementos para animación
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.skill-category, .project-card, .about-text, .contact-item');
    elementsToAnimate.forEach(el => observer.observe(el));
});

// Efecto de escritura en el título
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Iniciar efecto de escritura cuando la página cargue
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        typeWriter(heroTitle, text, 80);
    }
});

// Efectos adicionales para la foto de perfil
document.addEventListener('DOMContentLoaded', function() {
    const profileContainer = document.querySelector('.profile-img-container');
    const profilePhoto = document.querySelector('.profile-photo');
    
    // Efecto de carga suave para la imagen
    if (profilePhoto) {
        profilePhoto.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Precarga con opacidad 0
        profilePhoto.style.opacity = '0';
        profilePhoto.style.transition = 'opacity 0.5s ease';
    }
    
    // Efecto de click para la foto
    if (profileContainer) {
        profileContainer.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.08)';
            }, 150);
        });
    }
});
// Función para descargar PDF
function setupPdfDownload() {
    const downloadBtn = document.getElementById('downloadPdf');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Crear un enlace temporal para descargar
            const link = document.createElement('a');
            link.href = 'assets/docs/cv-abner-navez.pdf'; // Ruta de tu PDF
            link.download = 'CV-Abner-Navez.pdf';
            link.target = '_blank';
            
            // Simular click
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Opcional: Mostrar mensaje de confirmación
            showDownloadMessage();
        });
    }
}

// Mensaje de confirmación
function showDownloadMessage() {
    const message = document.createElement('div');
    message.textContent = '✅ Descargando CV...';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #00B4B3;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        font-weight: 500;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        document.body.removeChild(message);
    }, 3000);
}

// Llamar la función cuando cargue la página
document.addEventListener('DOMContentLoaded', function() {
    setupPdfDownload();
});

class ProjectModals {
    constructor() {
        this.modals = {};
        this.init();
    }
    
    init() {
        this.setupModalTriggers();
        this.setupSkillsModals(); // <- NUEVA FUNCIÓN AGREGADA
        this.setupModalEvents();
    }
    
    setupModalTriggers() {
        // Agrega botones de "Ver más" a las tarjetas de proyectos
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach((card) => {
            // Identificar el proyecto por su título
            const projectTitle = card.querySelector('h3').textContent.toLowerCase();
            
            let modalId = '';
            
            // Asignar modal según el título del proyecto
            if (projectTitle.includes('sindi')) {
                modalId = 'modal-sindi';
            } else if (projectTitle.includes('análisis') || projectTitle.includes('riesgo') || projectTitle.includes('académico')) {
                modalId = 'modal-analisis';
            } else if (projectTitle.includes('robot') || projectTitle.includes('competitivo')) {
                modalId = 'modal-robots';
            }
            
            if (modalId) {
                // Crear botón de ver más
                const viewMoreBtn = document.createElement('button');
                viewMoreBtn.className = 'view-more-btn';
                viewMoreBtn.innerHTML = '<i class="fas fa-expand"></i> Ver Detalles';
                viewMoreBtn.style.cssText = `
                    background: var(--primary);
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                    margin-top: 1rem;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                `;
                
                viewMoreBtn.addEventListener('mouseenter', function() {
                    this.style.background = 'var(--primary-dark)';
                    this.style.transform = 'translateY(-2px)';
                });
                
                viewMoreBtn.addEventListener('mouseleave', function() {
                    this.style.background = 'var(--primary)';
                    this.style.transform = 'translateY(0)';
                });
                
                viewMoreBtn.addEventListener('click', () => {
                    this.openModal(modalId);
                });
                
                card.appendChild(viewMoreBtn);
            }
        });
    }

    // ===== NUEVAS FUNCIONES PARA HABILIDADES TÉCNICAS =====
    setupSkillsModals() {
        // Agrega interactividad a las categorías de habilidades
        const skillCategories = document.querySelectorAll('.skill-category');
        
        skillCategories.forEach((category) => {
            // Hacer toda la categoría clickeable
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
            
            // Asignar modal según la categoría
            const categoryTitle = category.querySelector('h3').textContent.toLowerCase();
            let modalId = '';
            
            if (categoryTitle.includes('backend') || categoryTitle.includes('desarrollo')) {
                modalId = 'modal-backend';
            } else if (categoryTitle.includes('análisis') || categoryTitle.includes('datos')) {
                modalId = 'modal-datos';
            } else if (categoryTitle.includes('herramientas')) {
                modalId = 'modal-herramientas';
            }
            
            if (modalId) {
                category.addEventListener('click', (e) => {
                    // Evitar abrir modal si se hace click en una barra de habilidad
                    if (!e.target.classList.contains('skill-bar') && 
                        !e.target.classList.contains('skill-progress')) {
                        this.openModal(modalId);
                    }
                });
                
                // Agregar indicador visual de que es clickeable
                const title = category.querySelector('h3');
                title.innerHTML += ' <i class="fas fa-expand-alt" style="font-size: 0.8em; opacity: 0.7; margin-left: 0.5rem;"></i>';
            }
        });
        
        // También hacer las barras de habilidades individuales clickeables
        this.setupSkillBars();
    }

    setupSkillBars() {
        // Hacer cada skill item clickeable para mostrar más detalles
        document.querySelectorAll('.skill-item').forEach((item) => {
            const skillName = item.querySelector('span').textContent.toLowerCase();
            
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                this.showSkillDetail(skillName);
            });
        });
    }

    showSkillDetail(skillName) {
        // Mensaje temporal - puedes expandir esta función
        const messages = {
            'laravel': 'Framework PHP para desarrollo web elegante y moderno',
            'bases de datos': 'Diseño, implementación y optimización de bases de datos relacionales',
            'xampp': 'Entorno de desarrollo local para aplicaciones web',
            'análisis exploratorio': 'Proceso de investigar datasets para resumir sus características principales',
            'clasificación de datos': 'Técnicas para categorizar y organizar información',
            'microsoft office': 'Suite ofimática con dominio avanzado en Excel y PowerPoint',
            'arduino/amd vivand': 'Programación de microcontroladores para proyectos de robótica',
            'inglés avanzado': 'Comprensión y comunicación técnica en inglés'
        };
        
        const message = messages[skillName] || `Detalles sobre ${skillName}`;
        
        this.showToast(message, 'info');
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'info' ? 'var(--primary)' : '#FF6B6B'};
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            font-weight: 500;
            animation: slideUp 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if (document.body.contains(toast)) {
                toast.style.animation = 'slideDown 0.3s ease';
                setTimeout(() => {
                    if (document.body.contains(toast)) {
                        document.body.removeChild(toast);
                    }
                }, 300);
            }
        }, 3000);
    }
    // ===== FIN DE NUEVAS FUNCIONES =====

    setupModalEvents() {
        // Cerrar modal con X
        document.querySelectorAll('.modal-close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                this.closeModal(e.target.closest('.modal'));
            });
        });
        
        // Cerrar modal haciendo click fuera
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });
        
        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
        
        // Galería de imágenes - lightbox
        this.setupImageGallery();
    }
    
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Previene scroll
            modal.classList.add('active');
        }
    }
    
    closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restaura scroll
            modal.classList.remove('active');
        }
    }
    
    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            this.closeModal(modal);
        });
    }
    
    setupImageGallery() {
        // Lightbox para imágenes de la galería
        document.querySelectorAll('.modal-gallery img').forEach(img => {
            img.addEventListener('click', (e) => {
                this.openLightbox(e.target.src, e.target.alt);
            });
        });
    }
    
    openLightbox(src, alt) {
        // Crear lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${src}" alt="${alt}">
                <div class="lightbox-caption">${alt}</div>
            </div>
        `;
        
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
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        `;
        
        document.body.appendChild(lightbox);
        
        // Cerrar lightbox
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                document.body.removeChild(lightbox);
            }
        });
        
        // Cerrar con ESC
        const closeHandler = (e) => {
            if (e.key === 'Escape') {
                document.body.removeChild(lightbox);
                document.removeEventListener('keydown', closeHandler);
            }
        };
        document.addEventListener('keydown', closeHandler);
    }
}
// Sistema de Métricas y Dashboard
class MetricsDashboard {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupCounterAnimation();
        this.setupCharts();
        this.setupScrollAnimations();
    }
    
    // Animación de contadores para métricas
    setupCounterAnimation() {
        const counters = document.querySelectorAll('.metric-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = this.formatNumber(target);
                clearInterval(timer);
            } else {
                element.textContent = this.formatNumber(Math.floor(current));
            }
        }, 16);
    }
    
    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    }
    
    // Configuración de gráficos
    setupCharts() {
        this.createRadarChart();
        this.createBarChart();
        this.createPieChart();
    }
    
    createRadarChart() {
        const ctx = document.getElementById('skillsRadarChart').getContext('2d');
        
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [
                    'Desarrollo Backend',
                    'Bases de Datos', 
                    'Análisis de Datos',
                    'Programación Móvil',
                    'Robótica & IoT',
                    'Gestión de Proyectos'
                ],
                datasets: [{
                    label: 'Nivel Actual',
                    data: [85, 90, 75, 70, 80, 65],
                    backgroundColor: 'rgba(0, 180, 179, 0.2)',
                    borderColor: '#00B4B3',
                    borderWidth: 2,
                    pointBackgroundColor: '#00B4B3',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#00B4B3'
                }]
            },
            options: {
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20,
                            backdropColor: 'transparent'
                        },
                        grid: {
                            color: 'rgba(0, 180, 179, 0.1)'
                        },
                        angleLines: {
                            color: 'rgba(0, 180, 179, 0.1)'
                        },
                        pointLabels: {
                            font: {
                                size: 11,
                                family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                            },
                            color: 'var(--text-primary)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 12,
                                family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                            },
                            color: 'var(--text-primary)'
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
    
    createBarChart() {
        const ctx = document.getElementById('skillsBarChart').getContext('2d');
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Laravel', 'MySQL', 'Python', 'Arduino', 'JavaScript', 'Git'],
                datasets: [{
                    label: 'Nivel de Competencia (%)',
                    data: [85, 90, 75, 80, 70, 65],
                    backgroundColor: [
                        'rgba(0, 180, 179, 0.8)',
                        'rgba(255, 107, 107, 0.8)',
                        'rgba(52, 152, 219, 0.8)',
                        'rgba(155, 89, 182, 0.8)',
                        'rgba(241, 196, 15, 0.8)',
                        'rgba(46, 204, 113, 0.8)'
                    ],
                    borderColor: [
                        '#00B4B3',
                        '#FF6B6B',
                        '#3498DB',
                        '#9B59B6',
                        '#F1C40F',
                        '#2ECC71'
                    ],
                    borderWidth: 1,
                    borderRadius: 5
                }]
            },
            options: {
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(0, 180, 179, 0.1)'
                        },
                        ticks: {
                            color: 'var(--text-secondary)'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(0, 180, 179, 0.1)'
                        },
                        ticks: {
                            color: 'var(--text-primary)',
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'var(--surface)',
                        titleColor: 'var(--text-primary)',
                        bodyColor: 'var(--text-secondary)',
                        borderColor: 'var(--primary)',
                        borderWidth: 1
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
    
    createPieChart() {
        const ctx = document.getElementById('projectsPieChart').getContext('2d');
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Aplicaciones Móviles', 'Análisis de Datos', 'Robótica', 'Web Development', 'Investigación'],
                datasets: [{
                    data: [30, 25, 20, 15, 10],
                    backgroundColor: [
                        'rgba(0, 180, 179, 0.8)',
                        'rgba(255, 107, 107, 0.8)',
                        'rgba(52, 152, 219, 0.8)',
                        'rgba(155, 89, 182, 0.8)',
                        'rgba(241, 196, 15, 0.8)'
                    ],
                    borderColor: 'var(--surface)',
                    borderWidth: 3,
                    hoverOffset: 15
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            color: 'var(--text-primary)',
                            font: {
                                size: 11
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'var(--surface)',
                        titleColor: 'var(--text-primary)',
                        bodyColor: 'var(--text-secondary)',
                        borderColor: 'var(--primary)',
                        borderWidth: 1
                    }
                },
                cutout: '60%',
                animation: {
                    animateScale: true,
                    animateRotate: true,
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
    
    setupScrollAnimations() {
        // Animación para elementos del dashboard al hacer scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.dashboard-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    }
}
// Sistema de PDF con debug completo
class PdfGenerator {
    constructor() {
        this.init();
    }
    
    init() {
        console.log('🔄 Inicializando PdfGenerator...');
        this.setupPdfDownload();
    }
    
    setupPdfDownload() {
        const downloadBtn = document.getElementById('downloadPdf');
        
        if (downloadBtn) {
            console.log('✅ Botón de descarga encontrado');
            downloadBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handlePdfGeneration();
            });
        } else {
            console.error('❌ Botón de descarga NO encontrado');
        }
    }
    
    async handlePdfGeneration() {
        const downloadBtn = document.getElementById('downloadPdf');
        const originalHTML = downloadBtn.innerHTML;
        
        try {
            console.log('🚀 Iniciando generación de PDF...');
            
            // Mostrar estado de carga
            downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generando PDF...';
            downloadBtn.disabled = true;
            
            // Verificar que html2pdf esté disponible
            if (typeof html2pdf === 'undefined') {
                throw new Error('html2pdf no está cargado');
            }
            
            // Verificar que el contenido PDF exista
            const pdfElement = document.getElementById('pdf-content');
            if (!pdfElement) {
                throw new Error('Elemento pdf-content no encontrado');
            }
            
            console.log('📄 Elemento PDF encontrado:', pdfElement);
            
            // Mostrar temporalmente el contenido para debug
            pdfElement.style.display = 'block';
            
            // Configuración optimizada
            const opt = {
                margin: [15, 15, 15, 15],
                filename: `CV_Abner_Navez_Ingeniero_${new Date().getFullYear()}.pdf`,
                image: { 
                    type: 'jpeg', 
                    quality: 0.98 
                },
                html2canvas: { 
                    scale: 2,
                    useCORS: true,
                    logging: true, // Activar logging para debug
                    scrollX: 0,
                    scrollY: 0,
                    windowWidth: pdfElement.scrollWidth,
                    windowHeight: pdfElement.scrollHeight
                },
                jsPDF: { 
                    unit: 'mm', 
                    format: 'a4', 
                    orientation: 'portrait' 
                },
                pagebreak: { 
                    mode: ['avoid-all', 'css', 'legacy']
                }
            };
            
            console.log('⚙️ Configuración:', opt);
            
            // Generar PDF
            await html2pdf().set(opt).from(pdfElement).save();
            
            console.log('✅ PDF generado exitosamente');
            this.showToast('✅ CV PDF generado correctamente', 'success');
            
        } catch (error) {
            console.error('❌ Error generando PDF:', error);
            this.showToast(`❌ Error: ${error.message}`, 'error');
            
            // Fallback: descargar versión simple
            await this.downloadFallbackPDF();
        } finally {
            // Ocultar contenido PDF nuevamente
            const pdfElement = document.getElementById('pdf-content');
            if (pdfElement) {
                pdfElement.style.display = 'none';
            }
            
            // Restaurar botón
            setTimeout(() => {
                downloadBtn.innerHTML = originalHTML;
                downloadBtn.disabled = false;
            }, 3000);
        }
    }
    
    async downloadFallbackPDF() {
        try {
            console.log('🔄 Intentando descarga fallback...');
            
            // Crear un PDF simple como fallback
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Contenido básico del CV
            doc.setFontSize(20);
            doc.setTextColor(0, 180, 179);
            doc.text('ABNER UZIEL NAVEZ FLORES', 20, 30);
            
            doc.setFontSize(14);
            doc.setTextColor(100, 100, 100);
            doc.text('Ingeniero en Ciencias de la Computación', 20, 40);
            
            // Información de contacto
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            doc.text('📧 abner.navez@alumno.buap.mx | 📱 +52 221 762 8997 | 📍 Puebla, México', 20, 50);
            
            // Línea separadora
            doc.setDrawColor(0, 180, 179);
            doc.line(20, 55, 190, 55);
            
            // Perfil profesional
            doc.setFontSize(12);
            doc.setTextColor(0, 180, 179);
            doc.text('PERFIL PROFESIONAL', 20, 70);
            
            doc.setFontSize(9);
            doc.setTextColor(0, 0, 0);
            const profileText = 'Estudiante de Ingeniería en Ciencias de la Computación en la BUAP con especialización en desarrollo backend, análisis de datos y soluciones tecnológicas con impacto social.';
            doc.text(profileText, 20, 80, { maxWidth: 170 });
            
            // Habilidades
            doc.setFontSize(12);
            doc.setTextColor(0, 180, 179);
            doc.text('HABILIDADES TÉCNICAS', 20, 100);
            
            doc.setFontSize(9);
            doc.setTextColor(0, 0, 0);
            doc.text('• Desarrollo Backend: Laravel, PHP, MySQL, APIs REST', 20, 110);
            doc.text('• Análisis de Datos: Python, Pandas, Scikit-learn', 20, 117);
            doc.text('• Herramientas: Microsoft Office, Arduino, Git', 20, 124);
            doc.text('• Idiomas: Español (Nativo), Inglés (Avanzado)', 20, 131);
            
            // Proyectos
            doc.setFontSize(12);
            doc.setTextColor(0, 180, 179);
            doc.text('PROYECTOS DESTACADOS', 20, 145);
            
            doc.setFontSize(9);
            doc.setTextColor(0, 0, 0);
            doc.text('• Estudiantes SinDi - App de gestión financiera estudiantil', 20, 155);
            doc.text('• Análisis de Riesgo Académico - Sistema predictivo', 20, 162);
            doc.text('• Robots Competitivos - Programación de sistemas embebidos', 20, 169);
            
            // Guardar PDF
            doc.save(`CV_Abner_Navez_${new Date().getFullYear()}.pdf`);
            
            this.showToast('✅ CV básico generado como fallback', 'success');
            
        } catch (fallbackError) {
            console.error('❌ Error en fallback:', fallbackError);
            this.showToast('❌ No se pudo generar el PDF', 'error');
        }
    }
    
    showToast(message, type) {
        // Eliminar toasts anteriores
        const existingToasts = document.querySelectorAll('.pdf-toast');
        existingToasts.forEach(toast => toast.remove());
        
        const toast = document.createElement('div');
        toast.className = 'pdf-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? '#00B4B3' : '#FF6B6B'};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            z-index: 10000;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
            font-weight: 600;
            font-size: 14px;
            animation: slideUp 0.3s ease;
            max-width: 90%;
            text-align: center;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if (document.body.contains(toast)) {
                toast.style.animation = 'slideDown 0.3s ease';
                setTimeout(() => {
                    if (document.body.contains(toast)) {
                        document.body.removeChild(toast);
                    }
                }, 300);
            }
        }, 4000);
    }
}

// Inicializar cuando la página cargue
document.addEventListener('DOMContentLoaded', () => {
    new PdfGenerator();
});

// También inicializar cuando window esté completamente cargado
window.addEventListener('load', () => {
    console.log('🏁 Página completamente cargada, PDF generator listo');
});



// Inicializar cuando cargue la página
document.addEventListener('DOMContentLoaded', () => {
    new MetricsDashboard();
});
// Inicializar modals cuando cargue la página
document.addEventListener('DOMContentLoaded', () => {
    new ProjectModals();
});