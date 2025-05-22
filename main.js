document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navbar links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });
    
    // Initialize carousel
    const portfolioCarousel = new bootstrap.Carousel(document.getElementById('portfolioCarousel'), {
        interval: 5000,
        wrap: true,
        pause: 'hover'
    });
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    // Theme toggle click event
    themeToggle.addEventListener('click', function() {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    });
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.setAttribute('data-theme', 'dark');
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            } else {
                document.body.removeAttribute('data-theme');
                themeIcon.classList.replace('fa-sun', 'fa-moon');
            }
        }
    });

    // Initialize particles.js for hero section
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#ffffff"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }

    // Animate progress bars when skills section comes into view
    const animateProgressBars = () => {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    };

    // Use Intersection Observer to trigger progress bar animation
    const skillsSection = document.querySelector('.skills');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // WhatsApp Form Submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name || !email || !message) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Format the message for WhatsApp
        const whatsappMessage = `New Contact Form Submission:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || 'No Subject'}\nMessage: ${message}`;
        
        // Encode the message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // WhatsApp number
        const whatsappNumber = '919581509255'; // Removed spaces and + for URL
        
        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');
        
        // Reset the form after submission
        this.reset();
        
        // Show success message
        alert('Message prepared for WhatsApp! Please complete the sending process in the WhatsApp window that opened.');
    });

    // Back to top button visibility
    window.addEventListener('scroll', function() {
        const backToTopBtn = document.querySelector('.back-top-btn');
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
});

// Custom Cursor
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Hover effects
document.querySelectorAll('a, button, .hover-effect').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-grow'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-grow'));
});

// Floating Labels
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('focus', () => {
        input.previousElementSibling?.classList.add('active');
    });
    input.addEventListener('blur', () => {
        if (!input.value) input.previousElementSibling?.classList.remove('active');
    });
});

// ======================
// STARFIELD BACKGROUND (Dark Mode Only)
// ======================
function initStarfield() {
    if (document.body.getAttribute('data-theme') !== 'dark') return;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create stars
    const stars = [];
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            speed: Math.random() * 0.5,
            alpha: Math.random()
        });
    }

    // Animation loop
    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';

        stars.forEach(star => {
            ctx.globalAlpha = star.alpha;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();

            // Move stars (parallax effect)
            star.y += star.speed;
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(animateStars);
    }

    animateStars();

    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize when dark mode is active
initStarfield();

// Re-init if theme changes
document.getElementById('themeToggle').addEventListener('click', () => {
    setTimeout(initStarfield, 300); // Wait for theme transition
});

// ======================
// SCROLL-TRIGGERED CONFETTI
// ======================
let confettiFired = false;

window.addEventListener('scroll', () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;

    // Trigger when 80% scrolled (and only once)
    if (scrolled > scrollableHeight * 0.8 && !confettiFired) {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6']
        });
        confettiFired = true;
    }
});

// Mini-Game: Dodge Asteroids
function initAsteroidGame() {
  const footer = document.querySelector('footer');
  if (!footer) return;
  
  const gameCanvas = document.createElement('canvas');
  gameCanvas.width = footer.offsetWidth;
  gameCanvas.height = 100;
  gameCanvas.style.position = 'absolute';
  gameCanvas.style.top = '-100px';
  gameCanvas.style.left = '0';
  gameCanvas.style.pointerEvents = 'none';
  footer.prepend(gameCanvas);
  
  const ctx = gameCanvas.getContext('2d');
  const asteroids = [];
  let score = 0;
  
  // Player (cursor)
  let player = { x: 0, y: gameCanvas.height - 20, size: 20 };
  
  // Create asteroids
  function createAsteroid() {
    asteroids.push({
      x: Math.random() * gameCanvas.width,
      y: 0,
      size: Math.random() * 20 + 10,
      speed: Math.random() * 3 + 2
    });
  }
  
  // Game loop
  function gameLoop() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    
    // Draw player (as a ship)
    ctx.fillStyle = 'var(--primary-color)';
    ctx.beginPath();
    ctx.moveTo(player.x, player.y);
    ctx.lineTo(player.x - 15, player.y + 30);
    ctx.lineTo(player.x + 15, player.y + 30);
    ctx.closePath();
    ctx.fill();
    
    // Draw asteroids
    ctx.fillStyle = 'var(--accent-color)';
    asteroids.forEach((asteroid, index) => {
      ctx.beginPath();
      ctx.arc(asteroid.x, asteroid.y, asteroid.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Move asteroid
      asteroid.y += asteroid.speed;
      
      // Collision detection
      const dx = player.x - asteroid.x;
      const dy = player.y - asteroid.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < asteroid.size + 15) {
        asteroids.splice(index, 1);
        score++;
      }
      
      // Remove if out of screen
      if (asteroid.y > gameCanvas.height) {
        asteroids.splice(index, 1);
      }
    });
    
    // Add new asteroid randomly
    if (Math.random() < 0.02) {
      createAsteroid();
    }
    
    requestAnimationFrame(gameLoop);
  }
  
  // Track cursor
  gameCanvas.addEventListener('mousemove', (e) => {
    player.x = e.clientX - footer.offsetLeft;
  });
  
  // Start game
  gameLoop();
}

// Initialize when footer is in view
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    initAsteroidGame();
    observer.disconnect();
  }
}, { threshold: 0.1 });

observer.observe(document.querySelector('footer'));

// Avengers-Style Name Animation
function animateName() {
  const name = document.querySelector('.navbar-brand');
  if (!name) return;
  
  const letters = name.textContent.split('');
  name.innerHTML = '';
  
  letters.forEach((letter, i) => {
    const span = document.createElement('span');
    span.textContent = letter;
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.style.transform = 'translateY(50px)';
    span.style.transition = `all 0.5s ease ${i * 0.1}s`;
    name.appendChild(span);
    
    setTimeout(() => {
      span.style.opacity = '1';
      span.style.transform = 'translateY(0)';
    }, 1000);
  });
}

// Trigger on page load
animateName();
