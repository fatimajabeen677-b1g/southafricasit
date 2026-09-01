document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // 1. Mobile Menu
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('mainNav');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('open');
        });
    }

    // ==========================================
    // 2. Mobile Dropdown Fix - IMPORTANT!
    // ==========================================
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        if (link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdowns.forEach(d => {
                        if (d !== dropdown) d.classList.remove('open');
                    });
                    dropdown.classList.toggle('open');
                }
            });
        }
    });

    // ==========================================
    // 3. Close dropdown when clicking elsewhere
    // ==========================================
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            const isDropdown = e.target.closest('.dropdown');
            if (!isDropdown) {
                dropdowns.forEach(d => d.classList.remove('open'));
            }
        }
    });

    // ==========================================
    // 4. Close mobile menu when clicking a link
    // ==========================================
    document.querySelectorAll('.nav__link, .dropdown-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && !this.closest('.dropdown')) {
                hamburger.classList.remove('active');
                nav.classList.remove('open');
            }
        });
    });

    // ==========================================
    // 5. Active Nav Link
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link:not(.dropdown > a)');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // 6. Counter Animation for 30,000+
    // ==========================================
    const counters = document.querySelectorAll('.stat-item .number[data-count]');

    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000;
        const start = performance.now();

        const update = (time) => {
            const elapsed = time - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);

            let display = current.toLocaleString();
            if (target === 30000) display = current.toLocaleString() + '+';

            el.textContent = display;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                let final = target.toLocaleString();
                if (target === 30000) final = target.toLocaleString() + '+';
                el.textContent = final;
            }
        };

        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));

    // ==========================================
    // 7. FAQ Accordion
    // ==========================================
    const faqQuestions = document.querySelectorAll('.faq__question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const isOpen = this.getAttribute('aria-expanded') === 'true';

            faqQuestions.forEach(q => {
                if (q !== this) {
                    q.setAttribute('aria-expanded', 'false');
                    q.nextElementSibling.classList.remove('open');
                }
            });

            this.setAttribute('aria-expanded', !isOpen);
            this.nextElementSibling.classList.toggle('open');
        });
    });

    // ==========================================
    // 8. Header Shadow
    // ==========================================
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

});
