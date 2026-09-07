/* ============================================================
   KISHNANDAN KUMAR — PORTFOLIO JAVASCRIPT
   Clean, robust Vanilla JS for portfolio interactivity.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // 1. DARK / LIGHT THEME TOGGLE & PERSISTENCE
    // ==========================================
    var themeToggle = document.getElementById('themeToggle');
    var htmlElement = document.documentElement;

    var savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            var currentTheme = htmlElement.getAttribute('data-theme');
            var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }


    // ==========================================
    // 2. MOBILE NAVIGATION MENU (HAMBURGER)
    // ==========================================
    var navToggle = document.getElementById('navToggle');
    var navLinks  = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close menu when clicking a nav link
        var navItems = navLinks.querySelectorAll('.nav-link');
        navItems.forEach(function (item) {
            item.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
            }
        });
    }


    // ==========================================
    // 3. NAVBAR STYLE CHANGE ON SCROLL
    // ==========================================
    var header = document.getElementById('header');

    function handleNavScroll() {
        if (!header) return;
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll();


    // ==========================================
    // 4. ACTIVE NAVBAR LINK ON SCROLL
    // ==========================================
    var sections = document.querySelectorAll('section[id]');
    var allNavLinks = document.querySelectorAll('.nav-link');

    if ('IntersectionObserver' in window && sections.length > 0) {
        var sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var currentId = entry.target.getAttribute('id');
                    allNavLinks.forEach(function (link) {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + currentId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            rootMargin: '-30% 0px -60% 0px'
        });

        sections.forEach(function (sec) {
            sectionObserver.observe(sec);
        });
    }


    // ==========================================
    // 5. SMOOTH SCROLLING WITH NAVBAR OFFSET
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                var headerOffset = header ? header.offsetHeight : 70;
                var elementPosition = targetElement.getBoundingClientRect().top;
                var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // ==========================================
    // 6. SCROLL REVEAL ANIMATIONS (SUBTLE)
    // ==========================================
    var reveals = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window && reveals.length > 0) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -30px 0px'
        });

        reveals.forEach(function (elem) {
            revealObserver.observe(elem);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        reveals.forEach(function (elem) {
            elem.classList.add('revealed');
        });
    }


    // ==========================================
    // 7. BACK TO TOP BUTTON
    // ==========================================
    var backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    // ==========================================
    // 8. CONTACT FORM FRONTEND VALIDATION
    // ==========================================
    var contactForm  = document.getElementById('contactForm');
    var nameInput    = document.getElementById('formName');
    var emailInput   = document.getElementById('formEmail');
    var messageInput = document.getElementById('formMessage');
    var nameError    = document.getElementById('nameError');
    var emailError   = document.getElementById('emailError');
    var messageError = document.getElementById('messageError');
    var formStatus   = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var isValid = true;
            if (nameError) nameError.textContent = '';
            if (emailError) emailError.textContent = '';
            if (messageError) messageError.textContent = '';
            if (formStatus) formStatus.textContent = '';

            // Name validation
            if (!nameInput || nameInput.value.trim() === '') {
                if (nameError) nameError.textContent = 'Please enter your name.';
                isValid = false;
            }

            // Email validation
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput || emailInput.value.trim() === '') {
                if (emailError) emailError.textContent = 'Please enter your email.';
                isValid = false;
            } else if (!emailPattern.test(emailInput.value.trim())) {
                if (emailError) emailError.textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            // Message validation
            if (!messageInput || messageInput.value.trim() === '') {
                if (messageError) messageError.textContent = 'Please enter a message.';
                isValid = false;
            }

            // Valid submission feedback
            if (isValid) {
                if (formStatus) {
                    formStatus.textContent = 'Thanks! Your message has been submitted.';
                }
                contactForm.reset();

                setTimeout(function () {
                    if (formStatus) formStatus.textContent = '';
                }, 6000);
            }
        });
    }

});