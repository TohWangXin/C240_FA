# 🤖 Flowise API Integration Guide

Your Flowise API endpoint has been integrated into the AI Scholarship Finder in **THREE different ways**!

## 🔗 Your API Endpoint
```
https://flowise-production-ad0b.up.railway.app/api/v1/prediction/6a5712e1-6ff9-48e7-baee-c7b9c64866b4
```

---

## ✅ Integration Methods Implemented

### 1. 💬 **AI Chatbot Widget** (ACTIVE - Bottom Right Corner)
- **Location**: Appears as a floating chat button on your website
- **File**: [index.html](index.html) (lines 237-270)
- **What it does**: Students can ask questions directly to your AI
- **Features**:
  - Floating chat button (bottom-right)
  - Custom colors matching your brand (#2563EB)
  - Welcome message
  - Real-time AI responses

**Try it**: Reload your page and click the chat icon in the bottom-right corner! 💬

---

### 2. 🔍 **API-Powered Eligibility Checker** (Backend Integration)
- **Location**: Form submission in the eligibility checker
- **File**: [js/app.js](js/app.js) (lines 10-65)
- **What it does**: 
  - Sends student data to Flowise API
  - Gets AI-powered scholarship recommendations
  - Displays results in simple English
  - Falls back to mock data if API unavailable

**How it works**:
```javascript
const callFlowiseAPI = async (studentData) => {
    const response = await fetch(FLOWISE_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            question: `Student Profile: GPA: ${studentData.gpa}...`
        })
    });
    return await response.json();
};
```

---

### 3. 📋 **Additional Options** (In flowise-config.js)
- **File**: [flowise-config.js](flowise-config.js)

#### Option A: Full-Page Chatbot
```javascript
loadFullPageChatbot();
// Opens: https://flowise-production-ad0b.up.railway.app/chatbot/6a5712e1-6ff9-48e7-baee-c7b9c64866b4
```

#### Option B: Embedded Iframe
```javascript
const chatbotFrame = createChatbotIframe();
document.getElementById('container').appendChild(chatbotFrame);
```

---

## 🎯 Where Each Integration is Located

### In [index.html](index.html):
```html
<!-- Lines 237-270: Flowise Chatbot Widget -->
<script type="module">
    import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js"
    Chatbot.init({
        chatflowid: "6a5712e1-6ff9-48e7-baee-c7b9c64866b4",
        apiHost: "https://flowise-production-ad0b.up.railway.app",
        ...
    })
</script>
```

### In [js/app.js](js/app.js):
```javascript
// Lines 10-12: API Configuration
const FLOWISE_API_URL = 'https://flowise-production-ad0b.up.railway.app/api/v1/prediction/...';

// Lines 14-65: API Call Function
const callFlowiseAPI = async (studentData) => { ... }

// Lines 505-555: Form Submission with API Integration
const handleFormSubmit = async (event) => {
    const apiResponse = await callFlowiseAPI(studentData);
    // Process and display results
}
```

---

## 🚀 How to Test

### Test the Chatbot Widget:
1. Open your website in Live Server
2. Look for the chat button (bottom-right corner)
3. Click it and ask: "What scholarships are available?"
4. The AI will respond with scholarship information

### Test the API Integration:
1. Fill out the eligibility form:
   - GPA: 3.5
   - Income: Low
   - Course: Computer Science
   - Activities: Volunteering
2. Click "Find My Scholarships"
3. The system will:
   - Call Flowise API with your data
   - Get AI recommendations
   - Display results in simple English

---

## 🛠️ Customization Options

### Change Chatbot Colors:
Edit lines 244-246 in [index.html](index.html):
```javascript
button: {
    backgroundColor: "#YOUR_COLOR",  // Change this
    iconColor: "white",
}
```

### Change Welcome Message:
Edit line 251 in [index.html](index.html):
```javascript
welcomeMessage: "Your custom welcome message here!",
```

### Change API Prompt:
Edit lines 21-40 in [js/app.js](js/app.js) to customize what you ask the AI.

---

## 🔧 Troubleshooting

### Chatbot not appearing?
- Check browser console (F12) for errors
- Ensure you have internet connection
- Verify the chatflowid is correct

### API not working?
- Check Network tab in browser DevTools
- Verify API endpoint is accessible
- Check CORS settings on Railway

### Getting mock data instead of AI results?
- The app has fallback to mock data if API fails
- Check browser console for error messages
- Verify API response format matches expected structure

---

## 📊 What Data is Sent to the API?

When a student submits the form:
```json
{
  "question": "Student Profile:\n- GPA: 3.5\n- Household Income: low\n- Field of Study: Computer Science\n- Activities: Volunteering\n\nBased on this student profile, please identify scholarships..."
}
```

---

## 🎨 Visual Guide

```
Your Website
├── 💬 Chat Widget (Bottom-right) ← Flowise Embed
│   └── Students can ask questions
│
├── 📝 Eligibility Form
│   └── Submit → API Call → AI Response
│
└── 📋 Results Display
    └── Shows AI-recommended scholarships
```

---

## 🔐 Security Notes

- API endpoint is publicly accessible
- Consider adding rate limiting in production
- Student data is sent to Flowise for processing
- Add privacy policy if collecting personal data

---

## 📚 Additional Resources

- [Flowise Documentation](https://docs.flowiseai.com/)
- [Flowise Embed Guide](https://docs.flowiseai.com/using-flowise/embed)
- [API Documentation](https://docs.flowiseai.com/api-reference)

---

**Need help?** Check the browser console (F12) for detailed error messages!
