// Navigation toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('active'));
    });
}

// Smooth scroll for internal anchors
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener('click', event => {
        const targetId = anchor.getAttribute('href');
        if (targetId.length > 1) {
            event.preventDefault();
            document.querySelector(targetId)?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// FAQ accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question?.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach(other => {
            other.classList.remove('active');
            other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
            item.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
        }
    });
});

// Intersection observer for subtle reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.menu-card, .gallery figure, .review-card, .automation-grid article, .solutions-list li').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// Chatbot
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotMessages = document.getElementById('chatbotMessages');

const chatbotResponses = {
    flavour: 'We brew Masala, Kulhad, Ginger, Elaichi, Chocolate, Cold Tea and Iced Tea daily. Specials rotate weekly!',
    flavor: 'We brew Masala, Kulhad, Ginger, Elaichi, Chocolate, Cold Tea and Iced Tea daily. Specials rotate weekly!',
    deliver: 'Yes! WhatsApp +91 87364 77462 for delivery or takeaway. We send ready-for-pickup alerts automatically.',
    delivery: 'Yes! WhatsApp +91 87364 77462 for delivery or takeaway. We send ready-for-pickup alerts automatically.',
    menu: 'Menu highlights: Masala/Kulhad/Ginger/Elaichi (\u20B9125), Chocolate (\u20B9135), Cold/Iced Tea (\u20B9130), Snacks \u20B9115-150.',
    price: 'Menu highlights: Masala/Kulhad/Ginger/Elaichi (\u20B9125), Chocolate (\u20B9135), Cold/Iced Tea (\u20B9130), Snacks \u20B9115-150.',
    timing: 'We are open every day from 7:00 AM to 10:00 PM.',
    hours: 'We are open every day from 7:00 AM to 10:00 PM.',
    open: 'We are open every day from 7:00 AM to 10:00 PM.',
    location: 'Find us in North India. Tap the Google Maps link in the Contact section for directions.',
    address: 'Find us in North India. Tap the Google Maps link in the Contact section for directions.',
    contact: 'You can WhatsApp/call +91 87364 77462 or email info@chaiaffairs.com. We reply fast!',
    whatsapp: 'Message us at https://wa.me/918736477462 for daily specials or takeaway orders.',
    special: 'We drop daily specials each morning on WhatsApp. Ask to be added to the list!',
    snack: 'Snacks include biscuits, bun maska, Maggi bowls, and toasted sandwiches (\u20B9115-150).',
    feedback: 'Our AI feedback flow sends you a quick form and summarises reviews for the team.',
    inventory: 'Inventory and sales dashboards let us prep for peak hours and kulhad restocks. No more stock-outs!'
};

function addMessage(text, isUser = false) {
    const wrapper = document.createElement('div');
    wrapper.className = `chatbot-message ${isUser ? 'user-message' : 'bot-message'}`;
    wrapper.innerHTML = `<p>${text}</p>`;
    chatbotMessages?.appendChild(wrapper);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getResponse(message) {
    const lower = message.toLowerCase();
    for (const [keyword, reply] of Object.entries(chatbotResponses)) {
        if (lower.includes(keyword)) {
            return reply;
        }
    }
    return 'Thanks for reaching out! Ask about flavours, pricing, delivery, automation, or timings and I will help.';
}

function sendMessage() {
    if (!chatbotInput) return;
    const message = chatbotInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    chatbotInput.value = '';

    setTimeout(() => {
        addMessage(getResponse(message));
    }, 450);
}

chatbotToggle?.addEventListener('click', () => chatbotWindow?.classList.toggle('active'));
chatbotClose?.addEventListener('click', () => chatbotWindow?.classList.remove('active'));
chatbotSend?.addEventListener('click', sendMessage);
chatbotInput?.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});
