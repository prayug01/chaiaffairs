// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Smooth Scrolling for Anchor Links
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

// Chatbot Functionality
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotMessages = document.getElementById('chatbotMessages');

// Chatbot responses
const chatbotResponses = {
    'flavours': 'We have a variety of chai flavours including Masala Chai, Kulhad Chai, Ginger Chai, Elaichi Chai, and Chocolate Chai. We also serve Cold Tea and Iced Tea!',
    'flavor': 'We have a variety of chai flavours including Masala Chai, Kulhad Chai, Ginger Chai, Elaichi Chai, and Chocolate Chai. We also serve Cold Tea and Iced Tea!',
    'deliver': 'Yes, we do deliver! You can place an order through WhatsApp or call us at +91 8736477462. We also offer takeaway options.',
    'delivery': 'Yes, we do deliver! You can place an order through WhatsApp or call us at +91 8736477462. We also offer takeaway options.',
    'menu': 'Our menu includes various chai options (Masala, Kulhad, Ginger, Elaichi, Chocolate) starting from ₹25, Cold Tea (₹30), and snacks like Biscuits (₹15), Bun Maska (₹30), Maggi (₹40), and Sandwiches (₹50).',
    'price': 'Our chai prices start from ₹25. Masala, Ginger, and Elaichi Chai are ₹25, Kulhad Chai is ₹30, Chocolate Chai is ₹35, and Cold Tea is ₹30. Snacks range from ₹15 to ₹50.',
    'pricing': 'Our chai prices start from ₹25. Masala, Ginger, and Elaichi Chai are ₹25, Kulhad Chai is ₹30, Chocolate Chai is ₹35, and Cold Tea is ₹30. Snacks range from ₹15 to ₹50.',
    'hours': 'We are open Monday through Sunday from 7:00 AM to 10:00 PM.',
    'timing': 'We are open Monday through Sunday from 7:00 AM to 10:00 PM.',
    'open': 'We are open Monday through Sunday from 7:00 AM to 10:00 PM.',
    'location': 'We are located in North India. You can find us on Google Maps or contact us at +91 8736477462 for directions.',
    'address': 'We are located in North India. You can find us on Google Maps or contact us at +91 8736477462 for directions.',
    'contact': 'You can reach us at +91 8736477462 or email us at info@chaiaffairs.com. You can also chat with us on WhatsApp!',
    'phone': 'You can call us at +91 8736477462 or reach us on WhatsApp.',
    'whatsapp': 'You can contact us on WhatsApp at +91 8736477462. Just click the WhatsApp button on our website!',
    'special': 'We have daily specials! Follow us on social media or contact us on WhatsApp to know about today\'s special chai and snacks.',
    'snacks': 'We serve Biscuits (₹15), Bun Maska (₹30), Maggi (₹40), and Sandwiches (₹50). Perfect companions for your chai!',
    'hello': 'Hello! Welcome to Chai Affairs! How can I help you today?',
    'hi': 'Hi there! Welcome to Chai Affairs! How can I assist you?',
    'help': 'I can help you with information about our menu, flavours, pricing, delivery, opening hours, and location. What would you like to know?'
};

// Function to get chatbot response
function getChatbotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Check for keywords
    for (const [keyword, response] of Object.entries(chatbotResponses)) {
        if (message.includes(keyword)) {
            return response;
        }
    }
    
    // Default response
    return 'Thank you for your message! For more specific information, please call us at +91 8736477462 or message us on WhatsApp. We\'d be happy to help!';
}

// Function to add message to chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Toggle chatbot window
if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
    });
}

if (chatbotClose) {
    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });
}

// Send message function
function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatbotInput.value = '';
        
        // Simulate bot thinking
        setTimeout(() => {
            const response = getChatbotResponse(message);
            addMessage(response, false);
        }, 500);
    }
}

// Send message on button click
if (chatbotSend) {
    chatbotSend.addEventListener('click', sendMessage);
}

// Send message on Enter key
if (chatbotInput) {
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    }
    
    lastScroll = currentScroll;
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe menu items, gallery items, and review cards
document.querySelectorAll('.menu-item, .gallery-item, .review-card, .feature-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// FAQ accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const item = question.closest('.faq-item');
        const expanded = question.getAttribute('aria-expanded') === 'true';

        // close all items
        document.querySelectorAll('.faq-item').forEach(faqItem => {
            if (faqItem !== item) {
                faqItem.classList.remove('active');
                const btn = faqItem.querySelector('.faq-question');
                if (btn) {
                    btn.setAttribute('aria-expanded', 'false');
                }
            }
        });

        item.classList.toggle('active', !expanded);
        question.setAttribute('aria-expanded', String(!expanded));
    });
});

