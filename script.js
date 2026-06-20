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

    /* ==========================================
       AI Chatbot Widget Functionality
       ========================================== */
    const chatbotWidget = document.getElementById("chatbot-widget");
    const chatbotToggleBtn = document.getElementById("chatbot-toggle-btn");
    const chatbotWindow = document.getElementById("chatbot-window");
    const chatbotClosePanelBtn = document.getElementById("chatbot-close-panel");
    const chatbotClearBtn = document.getElementById("chatbot-clear-btn");
    const chatbotMessages = document.getElementById("chatbot-messages");
    const chatbotForm = document.getElementById("chatbot-form");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotVoiceBtn = document.getElementById("chatbot-voice-btn");
    const chatbotBadge = document.getElementById("chatbot-badge");
    const chatbotWelcomePopup = document.getElementById("chatbot-welcome-popup");
    const chatbotPopupClose = document.getElementById("chatbot-popup-close");

    // Welcome popup & notification badge status
    if (!localStorage.getItem("chatbot_visited")) {
        setTimeout(() => {
            if (!chatbotWindow.classList.contains("open")) {
                if (chatbotWelcomePopup) chatbotWelcomePopup.style.display = "block";
                if (chatbotBadge) chatbotBadge.style.display = "flex";
            }
        }, 3000);
    } else {
        if (chatbotBadge) chatbotBadge.style.display = "none";
        if (chatbotWelcomePopup) chatbotWelcomePopup.style.display = "none";
    }

    if (chatbotPopupClose) {
        chatbotPopupClose.addEventListener("click", (e) => {
            e.stopPropagation();
            if (chatbotWelcomePopup) {
                chatbotWelcomePopup.style.opacity = "0";
                chatbotWelcomePopup.style.transform = "translateY(15px) scale(0.95)";
                setTimeout(() => chatbotWelcomePopup.style.display = "none", 300);
            }
        });
    }

    // Toggle Chat Panel visibility
    chatbotToggleBtn.addEventListener("click", () => {
        const isOpen = chatbotWindow.classList.contains("open");
        if (isOpen) {
            closeChatbot();
        } else {
            openChatbot();
        }
    });

    chatbotClosePanelBtn.addEventListener("click", closeChatbot);

    function openChatbot() {
        chatbotWindow.classList.add("open");
        chatbotToggleBtn.querySelector(".chatbot-open-icon").style.display = "none";
        chatbotToggleBtn.querySelector(".chatbot-close-icon").style.display = "block";
        
        // Hide welcome alerts
        if (chatbotWelcomePopup) {
            chatbotWelcomePopup.style.display = "none";
        }
        if (chatbotBadge) {
            chatbotBadge.style.display = "none";
        }
        localStorage.setItem("chatbot_visited", "true");
        
        scrollToBottom();
        // Focus text input on desktop
        if (window.innerWidth > 768) {
            setTimeout(() => chatbotInput.focus(), 300);
        }
    }

    function closeChatbot() {
        chatbotWindow.classList.remove("open");
        chatbotToggleBtn.querySelector(".chatbot-open-icon").style.display = "block";
        chatbotToggleBtn.querySelector(".chatbot-close-icon").style.display = "none";
    }

    // Scroll to bottom helper
    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Smooth scroll helper for page navigation
    function smoothScrollToSection(sectionId) {
        const target = document.getElementById(sectionId);
        if (target) {
            // Close chat widget on mobile so they can see the scrolled content
            if (window.innerWidth <= 480) {
                closeChatbot();
            }
            target.scrollIntoView({ behavior: "smooth" });
        }
    }

    // Append standard messages helper
    function appendMessage(text, isUser = false, isHtml = false) {
        const msgDiv = document.createElement("div");
        msgDiv.className = `chat-message ${isUser ? 'user-msg' : 'bot-msg'}`;
        
        const avatarHtml = isUser 
            ? `<div class="msg-avatar"><i class="fa-solid fa-user"></i></div>`
            : `<div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>`;
            
        const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        msgDiv.innerHTML = `
            ${avatarHtml}
            <div class="msg-bubble-container">
                <div class="msg-bubble">${isHtml ? text : escapeHtml(text)}</div>
                <span class="msg-timestamp">${timeString}</span>
            </div>
        `;
        
        // Add to messages area before suggested questions if any
        const suggestedContainer = chatbotMessages.querySelector(".chat-suggested-container");
        if (suggestedContainer) {
            chatbotMessages.insertBefore(msgDiv, suggestedContainer);
        } else {
            chatbotMessages.appendChild(msgDiv);
        }
        
        scrollToBottom();
        return msgDiv;
    }

    function escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    // Typing dots indicator loader
    function showTypingIndicator() {
        const indicatorDiv = document.createElement("div");
        indicatorDiv.className = "chat-message bot-msg typing-indicator-msg";
        indicatorDiv.innerHTML = `
            <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
            <div class="msg-bubble-container">
                <div class="msg-bubble">
                    <div class="chatbot-typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        `;
        const suggestedContainer = chatbotMessages.querySelector(".chat-suggested-container");
        if (suggestedContainer) {
            chatbotMessages.insertBefore(indicatorDiv, suggestedContainer);
        } else {
            chatbotMessages.appendChild(indicatorDiv);
        }
        scrollToBottom();
        return indicatorDiv;
    }

    // Process user inputs and trigger bot responses
    function handleUserSubmission(messageText) {
        if (!messageText.trim()) return;

        // Display user query
        appendMessage(messageText, true);

        // Display typing dots
        const typingIndicator = showTypingIndicator();

        // Simulate AI thinking and print delay
        setTimeout(() => {
            typingIndicator.remove();
            const botResponse = getBotResponse(messageText);
            appendMessage(botResponse, false, true);
        }, 1000);
    }

    // Form submission action
    chatbotForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = chatbotInput.value;
        chatbotInput.value = "";
        handleUserSubmission(text);
    });

    // Clear history action
    chatbotClearBtn.addEventListener("click", () => {
        // Clear all except welcome messages
        chatbotMessages.innerHTML = `
            <div class="chat-message bot-msg">
                <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
                <div class="msg-bubble-container">
                    <div class="msg-bubble">
                        Hi 👋, I'm your AI Portfolio Assistant. Ask me about skills, projects, experience, education, certifications, or contact details.
                    </div>
                    <span class="msg-timestamp">Just now</span>
                </div>
            </div>
            <div class="chat-suggested-container">
                <span class="suggested-title">Suggested questions:</span>
                <div class="chat-suggested-links">
                    <button class="suggested-chip" data-question="Tell me about your projects">Tell me about your projects</button>
                    <button class="suggested-chip" data-question="What technologies do you use?">What technologies do you use?</button>
                    <button class="suggested-chip" data-question="Show your resume">Show your resume</button>
                    <button class="suggested-chip" data-question="Contact information">Contact information</button>
                    <button class="suggested-chip" data-question="Skills & certifications">Skills & certifications</button>
                </div>
            </div>
        `;
        // Re-bind suggested chip event listeners
        bindSuggestedChips();
        scrollToBottom();
    });

    // Suggested questions click handler
    function bindSuggestedChips() {
        const chips = chatbotMessages.querySelectorAll(".suggested-chip");
        chips.forEach(chip => {
            // Remove any existing clone listeners if re-bound
            chip.replaceWith(chip.cloneNode(true));
        });
        
        // Re-select and bind
        const newChips = chatbotMessages.querySelectorAll(".suggested-chip");
        newChips.forEach(chip => {
            chip.addEventListener("click", () => {
                const questionText = chip.getAttribute("data-question");
                handleUserSubmission(questionText);
            });
        });
    }

    bindSuggestedChips();

    // Voice recognition integrations
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        chatbotVoiceBtn.addEventListener("click", () => {
            if (chatbotVoiceBtn.classList.contains("recording")) {
                recognition.stop();
            } else {
                try {
                    recognition.start();
                } catch (err) {
                    console.error("Speech recognition start failed:", err);
                }
            }
        });

        recognition.onstart = () => {
            chatbotVoiceBtn.classList.add("recording");
            chatbotInput.placeholder = "Listening...";
        };

        recognition.onspeechend = () => {
            recognition.stop();
        };

        recognition.onend = () => {
            chatbotVoiceBtn.classList.remove("recording");
            chatbotInput.placeholder = "Type a message or speak...";
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            chatbotInput.value = transcript;
            // Submit form
            handleUserSubmission(transcript);
            chatbotInput.value = "";
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            chatbotVoiceBtn.classList.remove("recording");
            chatbotInput.placeholder = "Type a message or speak...";
        };
    } else {
        chatbotVoiceBtn.addEventListener("click", () => {
            alert("Voice recognition is not supported in this browser. Please use Google Chrome, Edge, or Safari.");
        });
    }

    // AI Response Engine dictionary mapping
    function getBotResponse(input) {
        const text = input.toLowerCase().trim();
        
        // Help menu
        if (text === 'help' || text === 'options') {
            return `Here are the topics you can ask me about:
            <br>• 📁 <strong>Projects:</strong> Type "projects" or ask about "Study Assistant", "Blog", "Inventory", or "Movie catalog".
            <br>• 🛠️ <strong>Skills:</strong> Type "skills" or "tech stack" to see programming languages and percentages.
            <br>• 🎓 <strong>Education:</strong> Ask about university or PU college details.
            <br>• 🏆 <strong>Achievements:</strong> Ask about hackathons or global contest ranks.
            <br>• 📄 <strong>Resume:</strong> Type "resume" or "cv" to get the download file.
            <br>• 📞 <strong>Contact:</strong> Ask for LinkedIn, GitHub, email, or contact forms.
            <br>• 🧭 <strong>Page Navigation:</strong> Ask me to "show projects" or "go to contact" to scroll the page automatically!
            <br>• 💡 <strong>Recommendations:</strong> Type "recommend a project" to find a match based on your tech interest.`;
        }

        // Section scrolling commands
        if (text.includes("show projects") || text.includes("go to projects") || text.includes("scroll to projects") || text.includes("view projects")) {
            smoothScrollToSection("projects");
            return `Sure! I have scrolled you to the <strong>Featured Projects</strong> section. Let me know if you would like details on any of the projects listed!`;
        }
        if (text.includes("show skills") || text.includes("go to skills") || text.includes("scroll to skills") || text.includes("view skills")) {
            smoothScrollToSection("skills");
            return `Done! I have scrolled you to the <strong>Technical Skills</strong> section. I specialize in Python and C programming, as well as AI/ML systems.`;
        }
        if (text.includes("show contact") || text.includes("go to contact") || text.includes("scroll to contact") || text.includes("view contact") || text.includes("write message")) {
            smoothScrollToSection("contact");
            return `Absolutely! I have scrolled you to the <strong>Contact Me</strong> section where you can fill out the form or find my direct socials.`;
        }
        if (text.includes("show education") || text.includes("go to education") || text.includes("scroll to education") || text.includes("view education")) {
            smoothScrollToSection("education");
            return `No problem! I have scrolled you to the <strong>Education</strong> timeline section.`;
        }
        if (text.includes("show certifications") || text.includes("go to certifications") || text.includes("scroll to certifications") || text.includes("view certifications")) {
            smoothScrollToSection("certifications");
            return `Certainly! I've scrolled you to the <strong>Certifications</strong> section.`;
        }
        if (text.includes("show achievements") || text.includes("go to achievements") || text.includes("scroll to achievements") || text.includes("view achievements")) {
            smoothScrollToSection("achievements");
            return `Sure thing! Scrolling you to my <strong>Achievements</strong> section.`;
        }
        if (text.includes("show blog") || text.includes("go to blog") || text.includes("scroll to blog") || text.includes("view blog")) {
            smoothScrollToSection("blog");
            return `Certainly! Scrolled you to the <strong>Latest Blog Articles</strong> section.`;
        }

        // Greetings
        if (text.match(/\b(hi|hello|hey|greetings|hola|hey there|morning|evening|afternoon)\b/)) {
            return `Hello! 👋 It's great to connect. I am Mahammad Shahid's AI Portfolio Assistant.
            <br><br>I can help you explore his technical background, projects, achievements, and credentials. What would you like to know?`;
        }

        // Resume request
        if (text.includes("resume") || text.includes("cv") || text.includes("biodata") || text.includes("download resume")) {
            return `Here is Mahammad Shahid's official resume for download:
            <div class="chatbot-rich-card">
                <span class="rich-card-title">📄 Mahammad Shahid K - Resume</span>
                <span class="rich-card-desc">B.Tech Computer Science (AI & ML) student with background in Python, Java, C, Web Dev, and deep learning architectures.</span>
                <div class="rich-card-actions">
                    <a href="assets/resume.pdf" download="Mahammad_Shahid_K_Resume.pdf" class="rich-card-btn rich-card-btn-primary">
                        <i class="fa-solid fa-file-arrow-down"></i> Download PDF
                    </a>
                </div>
            </div>`;
        }

        // Contact and Socials requests
        if (text.includes("contact") || text.includes("socials") || text.includes("linkedin") || text.includes("github") || text.includes("email") || text.includes("phone") || text.includes("address") || text.includes("location") || text.includes("mail")) {
            return `Here are Mahammad Shahid's professional socials and email:
            <div class="chatbot-rich-card">
                <span class="rich-card-title">📞 Get in Touch</span>
                <span class="rich-card-desc">
                    📧 <strong>Email:</strong> <a href="mailto:shahid.tech.7259@gmail.com">shahid.tech.7259@gmail.com</a>
                    <br>📍 <strong>Location:</strong> Karnataka, India
                </span>
                <div class="rich-card-actions">
                    <a href="https://www.linkedin.com/in/mahammad-shahid-k-06892a370?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" class="rich-card-btn rich-card-btn-primary">
                        <i class="fa-brands fa-linkedin-in"></i> LinkedIn
                    </a>
                    <a href="https://github.com/Mahammad-Shahid-K" target="_blank" rel="noopener noreferrer" class="rich-card-btn rich-card-btn-secondary">
                        <i class="fa-brands fa-github"></i> GitHub
                    </a>
                    <button type="button" class="rich-card-btn rich-card-btn-secondary" onclick="document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })">
                        <i class="fa-solid fa-envelope"></i> Message Form
                    </button>
                </div>
            </div>`;
        }

        // Skills & Technologies requests
        if (text.includes("skills") || text.includes("technologies") || text.includes("tech") || text.includes("languages") || text.includes("stack") || text.includes("programming") || text.includes("python") || text.includes("c language")) {
            return `Mahammad Shahid K has strong foundations in several core languages:
            <div class="chatbot-rich-card">
                <span class="rich-card-title">🛠️ Technical Skillset</span>
                <span class="rich-card-desc">
                    🐍 <strong>Python:</strong> Expert (90%) - Used for AI/ML neural networks, automation scripts.
                    <br>💻 <strong>C Programming:</strong> Advanced (85%) - Focused on data structures, memory layouts.
                    <br>🌐 <strong>Web Development:</strong> Clean responsive coding with HTML5, CSS3, JavaScript.
                    <br>⚙️ <strong>AI Specialization:</strong> Deep Learning frameworks, neural architectures, LLM prompts.
                </span>
                <div class="rich-card-actions">
                    <button type="button" class="rich-card-btn rich-card-btn-primary" onclick="document.getElementById('skills').scrollIntoView({ behavior: 'smooth' })">
                        View Skills Section
                    </button>
                </div>
            </div>`;
        }

        // Projects requests
        if (text.includes("project") || text.includes("assistant") || text.includes("blog") || text.includes("inventory") || text.includes("movie") || text.includes("built") || text.includes("code")) {
            if (text.includes("assistant") || text.includes("ai")) {
                return `Here details on the <strong>AI-Powered Study Assistant</strong>:
                <div class="chatbot-rich-card">
                    <span class="rich-card-title">🤖 AI Study Assistant</span>
                    <span class="rich-card-desc">An intelligent desktop assistant that reads uploaded PDFs, generates concise summaries, and builds practice quiz cards using OpenAI APIs.</span>
                    <div class="rich-card-tags">
                        <span class="rich-card-tag">Python</span>
                        <span class="rich-card-tag">OpenAI API</span>
                        <span class="rich-card-tag">Tkinter</span>
                        <span class="rich-card-tag">PyPDF2</span>
                    </div>
                </div>`;
            }
            if (text.includes("blog") || text.includes("website")) {
                return `Here details on the <strong>Personal Blog Website</strong>:
                <div class="chatbot-rich-card">
                    <span class="rich-card-title">📰 Personal Blog Website</span>
                    <span class="rich-card-desc">A highly responsive, custom-styled blogging platform featuring category filters, search capabilities, read-times, and complete theme support.</span>
                    <div class="rich-card-tags">
                        <span class="rich-card-tag">HTML5</span>
                        <span class="rich-card-tag">CSS3</span>
                        <span class="rich-card-tag">JavaScript</span>
                        <span class="rich-card-tag">Vercel</span>
                    </div>
                </div>`;
            }
            if (text.includes("inventory") || text.includes("java")) {
                return `Here details on the <strong>Inventory Management System</strong>:
                <div class="chatbot-rich-card">
                    <span class="rich-card-title">📦 Inventory Management System</span>
                    <span class="rich-card-desc">A professional desktop database application supporting secure intake, stock updates, analytics, and automated monthly invoice generation.</span>
                    <div class="rich-card-tags">
                        <span class="rich-card-tag">Java</span>
                        <span class="rich-card-tag">Swing</span>
                        <span class="rich-card-tag">MySQL</span>
                        <span class="rich-card-tag">JDBC</span>
                    </div>
                </div>`;
            }
            if (text.includes("movie") || text.includes("c code")) {
                return `Here details on the <strong>Movie Management System</strong>:
                <div class="chatbot-rich-card">
                    <span class="rich-card-title">🎬 Movie Management System</span>
                    <span class="rich-card-desc">A modular terminal application in C leveraging linked list data structures and binary file streaming APIs to catalog and query cinema records.</span>
                    <div class="rich-card-tags">
                        <span class="rich-card-tag">C</span>
                        <span class="rich-card-tag">Data Structures</span>
                        <span class="rich-card-tag">File Systems</span>
                    </div>
                </div>`;
            }

            return `Here are some of the key projects Mahammad Shahid K has built:
            <br>1. 🤖 <strong>AI Study Assistant:</strong> Python application generating study guides and quiz cards via OpenAI APIs.
            <br>2. 📰 <strong>Personal Blog Website:</strong> Responsive blogging site with visual filters and themes.
            <br>3. 📦 <strong>Inventory Management:</strong> Desktop Java database system with automated invoices.
            <br>4. 🎬 <strong>Movie Management System:</strong> Modular terminal catalog application built in C.
            <br><br>Which of these would you like to hear more about? (Or type "recommend a project" to find the best match for you!)`;
        }

        // Project recommendations based on interest
        if (text.includes("recommend") || text.includes("suggestion") || text.includes("interested")) {
            if (text.includes("ai") || text.includes("machine learning") || text.includes("ml") || text.includes("data science")) {
                return `Based on your interest in <strong>AI/ML</strong>, I highly recommend looking at:
                <div class="chatbot-rich-card">
                    <span class="rich-card-title">🤖 AI-Powered Study Assistant</span>
                    <span class="rich-card-desc">It summarizes uploaded PDFs, builds flashcards, and runs mock-testing interactively. Built fully in Python leveraging OpenAI API models.</span>
                    <div class="rich-card-actions">
                        <button type="button" class="rich-card-btn rich-card-btn-primary" onclick="document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })">
                            View Projects Section
                        </button>
                    </div>
                </div>`;
            }
            if (text.includes("web") || text.includes("front") || text.includes("full") || text.includes("design")) {
                return `Based on your interest in <strong>Web Development</strong>, I recommend:
                <div class="chatbot-rich-card">
                    <span class="rich-card-title">📰 Personal Blog Website</span>
                    <span class="rich-card-desc">A highly responsive, custom-styled website using pure HTML, CSS, and JS. It implements category filtering, search systems, and complete dark/light mode toggles.</span>
                    <div class="rich-card-actions">
                        <button type="button" class="rich-card-btn rich-card-btn-primary" onclick="document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })">
                            View Projects Section
                        </button>
                    </div>
                </div>`;
            }
            if (text.includes("core") || text.includes("database") || text.includes("systems") || text.includes("backend")) {
                return `Based on your interest in <strong>Core Software Systems</strong>, I recommend:
                <div class="chatbot-rich-card">
                    <span class="rich-card-title">📦 Inventory Management System</span>
                    <span class="rich-card-desc">A complete desktop business utility built in Java using SQL databases for asset control and invoicing.
                    <br>Or checkout the C-based terminal <strong>Movie Management System</strong>.</span>
                    <div class="rich-card-actions">
                        <button type="button" class="rich-card-btn rich-card-btn-primary" onclick="document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })">
                            View Projects Section
                        </button>
                    </div>
                </div>`;
            }

            return `I can recommend a project based on your field of interest! 
            <br><br>Are you interested in:
            <br>• 🤖 <strong>AI & Machine Learning</strong>
            <br>• 🌐 <strong>Web Development</strong>
            <br>• 💾 <strong>Core Software Systems</strong>
            <br><br>Tell me what you focus on, and I'll find the best project match!`;
        }

        // Education timeline
        if (text.includes("education") || text.includes("university") || text.includes("college") || text.includes("school") || text.includes("degree") || text.includes("study") || text.includes("course") || text.includes("reva") || text.includes("b.tech")) {
            return `Here is Mahammad Shahid K's academic timeline:
            <div class="chatbot-rich-card">
                <span class="rich-card-title">🎓 Education Details</span>
                <span class="rich-card-desc">
                    🏫 <strong>B.Tech in Computer Science (AI & ML)</strong>
                    <br>Reva University, Bengaluru (2025 - 2029)
                    <br><em>Focus: Deep Learning, Intelligent Systems Engineering, Neural Networks.</em>
                    <br><br>🏫 <strong>Pre-University Education (Class XII)</strong>
                    <br>Nandi PU College, Ballari (2023 - 2025)
                    <br><em>Completed with solid foundations in Science and Mathematics.</em>
                </span>
                <div class="rich-card-actions">
                    <button type="button" class="rich-card-btn rich-card-btn-primary" onclick="document.getElementById('education').scrollIntoView({ behavior: 'smooth' })">
                        Scroll to Education
                    </button>
                </div>
            </div>`;
        }

        // Achievements details
        if (text.includes("achievements") || text.includes("hackathon") || text.includes("trophy") || text.includes("contest") || text.includes("competition") || text.includes("first") || text.includes("winner") || text.includes("rank") || text.includes("lead")) {
            return `Mahammad Shahid K has achieved several milestones:
            <div class="chatbot-rich-card">
                <span class="rich-card-title">🏆 Key Achievements</span>
                <span class="rich-card-desc">
                    🥇 <strong>Smart City Hackathon - 1st Place:</strong> Led a team to build an AI/IoT ambient power regulation grid system.
                    <br>🎯 <strong>HackerRank Top 5% Rank:</strong> High global score resolving complex data structures under timed rounds.
                    <br>👥 <strong>Technical Lead (Coding Club):</strong> Mentors 60+ junior college programmers in algorithms and data structures.
                </span>
                <div class="rich-card-actions">
                    <button type="button" class="rich-card-btn rich-card-btn-primary" onclick="document.getElementById('achievements').scrollIntoView({ behavior: 'smooth' })">
                        Scroll to Achievements
                    </button>
                </div>
            </div>`;
        }

        // Certifications
        if (text.includes("certifications") || text.includes("certificates") || text.includes("ibm") || text.includes("anthropic")) {
            return `Here are my professional certifications:
            <div class="chatbot-rich-card">
                <span class="rich-card-title">📜 Verified Certifications</span>
                <span class="rich-card-desc">
                    🛡️ <strong>Python for Data Science</strong> - Issued by IBM
                    <br><em>Covers Object-Oriented models, scientific libraries, and API structure.</em>
                    <br><br>🛡️ <strong>AI Fluency for Students</strong> - Anthropic / UCC / HEA
                    <br><em>Covers large language models, prompt engineering, and agent systems.</em>
                </span>
                <div class="rich-card-actions">
                    <button type="button" class="rich-card-btn rich-card-btn-primary" onclick="document.getElementById('certifications').scrollIntoView({ behavior: 'smooth' })">
                        Scroll to Certifications
                    </button>
                </div>
            </div>`;
        }

        // Help fallback
        return `I'm here to help, but I didn't quite catch that.
        <br><br>Try typing <strong>"projects"</strong>, <strong>"skills"</strong>, <strong>"resume"</strong>, <strong>"contact"</strong>, or type <strong>"help"</strong> to see all options!`;
    }
});
