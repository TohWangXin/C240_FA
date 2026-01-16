/**
 * Flowise Chatbot Embed Configuration
 * This file contains the configuration for embedding the Flowise chatbot
 */

// Option 1: Full Page Chatbot Embed
function embedFlowiseChatbot() {
    const script = document.createElement('script');
    script.type = 'module';
    script.innerHTML = `
        import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js"
        Chatbot.init({
            chatflowid: "6a5712e1-6ff9-48e7-baee-c7b9c64866b4",
            apiHost: "https://flowise-production-ad0b.up.railway.app",
            theme: {
                button: {
                    backgroundColor: "#2563EB",
                    right: 20,
                    bottom: 20,
                    size: "medium",
                    iconColor: "white",
                    customIconSrc: "https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg",
                },
                chatWindow: {
                    welcomeMessage: "Hi! I'm your AI Scholarship Assistant. Ask me anything about scholarships, eligibility, or financial aid!",
                    backgroundColor: "#ffffff",
                    height: 600,
                    width: 400,
                    fontSize: 16,
                    poweredByTextColor: "#64748B",
                    botMessage: {
                        backgroundColor: "#F1F5F9",
                        textColor: "#1E293B",
                        showAvatar: true,
                        avatarSrc: "🎓",
                    },
                    userMessage: {
                        backgroundColor: "#2563EB",
                        textColor: "#ffffff",
                        showAvatar: true,
                        avatarSrc: "👤",
                    },
                    textInput: {
                        placeholder: "Type your question here...",
                        backgroundColor: "#ffffff",
                        textColor: "#1E293B",
                        sendButtonColor: "#2563EB",
                    }
                }
            }
        })
    `;
    document.body.appendChild(script);
}

// Option 2: Full Page Chatbot (Replaces entire page)
function loadFullPageChatbot() {
    window.location.href = `https://flowise-production-ad0b.up.railway.app/api/v1/prediction/34b40b8f-961d-443b-82a1-0415865368dd`;
}

// Option 3: Iframe Embed (Can be placed anywhere on page)
function createChatbotIframe() {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://flowise-production-ad0b.up.railway.app/api/v1/prediction/34b40b8f-961d-443b-82a1-0415865368dd';
    iframe.style.width = '100%';
    iframe.style.height = '600px';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '12px';
    iframe.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    return iframe;
}

// Export functions for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        embedFlowiseChatbot,
        loadFullPageChatbot,
        createChatbotIframe
    };
}
