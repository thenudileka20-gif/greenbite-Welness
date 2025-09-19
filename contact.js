document.addEventListener('DOMContentLoaded', function() {
    // ===== Mobile Hamburger Menu =====
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            this.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.textContent = '☰';
            }
        });
    }

    // ===== Newsletter Subscription =====
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('emailInput').value.trim();
            const messageEl = document.getElementById('message');
            
            if (validateEmail(email)) {
                localStorage.setItem('newsletterEmail', email);
                showMessage(messageEl, 'Thank you for subscribing!', 'success');
                this.reset();
            } else {
                showMessage(messageEl, 'Please enter a valid email.', 'error');
            }
        });
    }

    // ===== Contact Form Handling =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('nameInput').value.trim();
            const email = document.getElementById('contactEmailInput').value.trim();
            const message = document.getElementById('messageInput').value.trim();
            const formMessage = document.getElementById('formMessage');
            
            // Validate all fields
            if (!name || !email || !message) {
                showMessage(formMessage, 'Please fill in all fields', 'error');
                return;
            }
            
            // Validate email format
            if (!validateEmail(email)) {
                showMessage(formMessage, 'Please enter a valid email address', 'error');
                return;
            }
            
            // Store feedback
            saveFeedback({ name, email, message });
            showMessage(formMessage, 'Thank you for your feedback!', 'success');
            this.reset();
        });
    }

    // ===== FAQ Accordion =====
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            
            if (this.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // Open first FAQ by default
    if (faqQuestions.length > 0) {
        faqQuestions[0].classList.add('active');
        faqQuestions[0].nextElementSibling.style.maxHeight = 
            faqQuestions[0].nextElementSibling.scrollHeight + 'px';
    }

    // ===== Helper Functions =====
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showMessage(element, text, type) {
        if (!element) return;
        
        element.textContent = text;
        element.style.color = type === 'success' ? '#5E8C61' : '#E74C3C';
        
        if (type === 'success') {
            setTimeout(() => {
                element.textContent = '';
            }, 3000);
        }
    }

    function saveFeedback(feedback) {
        feedback.date = new Date().toISOString();
        let savedFeedback = JSON.parse(localStorage.getItem('feedback')) || [];
        savedFeedback.push(feedback);
        localStorage.setItem('feedback', JSON.stringify(savedFeedback));
    }
});