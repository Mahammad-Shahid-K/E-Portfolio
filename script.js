document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================
       Dark / Light Mode Toggle
       ========================================== */
    const themeToggleBtn = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn.querySelector("i");

    // Check system preferences or saved local storage
    const savedTheme = localStorage.getItem("theme");
    const systemThemeDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme) {
        htmlElement.setAttribute("data-theme", savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        const defaultTheme = systemThemeDark ? "dark" : "light";
        htmlElement.setAttribute("data-theme", defaultTheme);
        updateThemeIcon(defaultTheme);
    }

    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = htmlElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        
        htmlElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === "dark") {
            themeIcon.className = "fa-solid fa-sun";
        } else {
            themeIcon.className = "fa-solid fa-moon";
        }
    }

    /* ==========================================
       Mobile Navigation Menu Toggle
       ========================================== */
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const navMenu = document.getElementById("navmenu");
    const mobileMenuIcon = mobileMenuBtn.querySelector("i");
    const navLinks = document.querySelectorAll(".navlink");

    mobileMenuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        const isOpen = navMenu.classList.contains("open");
        mobileMenuIcon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            mobileMenuIcon.className = "fa-solid fa-bars";
        });
    });

    /* ==========================================
       Header Shrink on Scroll
       ========================================== */
    const header = document.getElementById("header");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("shrink");
        } else {
            header.classList.remove("shrink");
        }
    });

    /* ==========================================
       Hero Section Typing Animation
       ========================================== */
    const typingSpan = document.getElementById("typing-text");
    const words = ["Engineering Student", "Programmer", "Tech Enthusiast"];
    const typingSpeed = 100;
    const erasingSpeed = 60;
    const newWordDelay = 2000; // Delay between words
    let wordIdx = 0;
    let charIdx = 0;

    function type() {
        if (charIdx < words[wordIdx].length) {
            typingSpan.textContent += words[wordIdx].charAt(charIdx);
            charIdx++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, newWordDelay);
        }
    }

    function erase() {
        if (charIdx > 0) {
            typingSpan.textContent = words[wordIdx].substring(0, charIdx - 1);
            charIdx--;
            setTimeout(erase, erasingSpeed);
        } else {
            wordIdx = (wordIdx + 1) % words.length;
            setTimeout(type, typingSpeed + 50);
        }
    }

    // Start typing animation
    if (words.length) setTimeout(type, 1000);

    /* ==========================================
       Intersection Observer: Scroll Reveal
       ========================================== */
    const revealElements = document.querySelectorAll("[data-reveal]");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Read delay metadata if present
                const delay = entry.target.getAttribute("data-delay") || 0;
                setTimeout(() => {
                    entry.target.classList.add("active");
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* ==========================================
       Intersection Observer: Statistics Counter
       ========================================== */
    const statNumbers = document.querySelectorAll(".stat-number");

    const statObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetEl = entry.target;
                const targetNum = parseInt(targetEl.getAttribute("data-target"), 10);
                animateCounter(targetEl, targetNum);
                observer.unobserve(targetEl);
            }
        });
    }, {
        threshold: 0.5
    });

    statNumbers.forEach(stat => {
        statObserver.observe(stat);
    });

    function animateCounter(element, target) {
        let current = 0;
        const duration = 2000; // 2 seconds
        const stepTime = Math.max(Math.floor(duration / target), 15);
        
        const counter = setInterval(() => {
            if (target >= 1000) {
                // Faster stepping for large numbers
                current += Math.ceil(target / 100);
            } else {
                current += 1;
            }

            if (current >= target) {
                element.textContent = target + "+";
                clearInterval(counter);
            } else {
                element.textContent = current + "+";
            }
        }, stepTime);
    }

    /* ==========================================
       Active Navigation Links on Scroll
       ========================================== */
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        const scrollPos = window.scrollY + 120; // offset header height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    /* ==========================================
       Scroll-to-Top Button
       ========================================== */
    const scrollToTopBtn = document.getElementById("scroll-to-top");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            scrollToTopBtn.classList.add("visible");
        } else {
            scrollToTopBtn.classList.remove("visible");
        }
    });

    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    /* ==========================================
       Contact Form Submission Handler
       ========================================== */
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    const submitBtn = document.getElementById("submit-btn");
    const submitBtnText = submitBtn.querySelector(".btn-text");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Disable submit button and show loading state
        submitBtn.disabled = true;
        submitBtnText.textContent = "Sending...";
        formStatus.className = "form-status";
        formStatus.textContent = "";

        // Simulate mail delivery API (Mockup success)
        setTimeout(() => {
            formStatus.className = "form-status success";
            formStatus.textContent = "Thank you, Mahammad Shahid K will respond to you soon!";
            
            // Clear inputs
            contactForm.reset();
            
            // Restore button
            submitBtn.disabled = false;
            submitBtnText.textContent = "Send Message";
        }, 1200);
    });

    /* ==========================================
       Resume Download Action Logger
       ========================================== */
    const downloadResumeBtn = document.getElementById("download-resume-btn");
    downloadResumeBtn.addEventListener("click", (e) => {
        // Log the download event for tracking purposes
        console.log("Resume download initiated.");
    });
});
