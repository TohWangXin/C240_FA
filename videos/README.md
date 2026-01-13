# 🎬 Videos Folder - Quick Setup Guide

## ✅ What You Need to Do:

1. **Add Your Video Here**
   - Name it: `agent-demo.mp4`
   - Drop it in this folder (`FA/videos/`)

2. **Optional: Add a Thumbnail**
   - Name it: `agent-demo-thumbnail.jpg`
   - Size: 1280x720 pixels
   - This shows before video plays

---

## 📁 Expected File Structure:

```
FA/
├── videos/
│   ├── agent-demo.mp4          ← Your video goes here (REQUIRED)
│   └── agent-demo-thumbnail.jpg ← Optional thumbnail image
```

---

## 📋 Video Requirements:

### Format:
- **Recommended**: MP4 (H.264 codec)
- **Alternative**: WebM (optional fallback)

### Size:
- **Ideal**: 20-50 MB
- **Maximum**: 100 MB (for good loading speed)

### Resolution:
- **Recommended**: 1920x1080 (Full HD)
- **Minimum**: 1280x720 (HD)
- **Maximum**: 1920x1080 (higher = slower loading)

### Length:
- **Recommended**: 45-90 seconds
- **Maximum**: 3 minutes

---

## 🎥 How to Record Your Agent Demo:

### What to Show:

1. **Introduction (5 sec)**
   - "Watch our AI agent find scholarships"

2. **Form Filling (10 sec)**
   - Show entering student data
   - GPA: 3.5, Income: Low, Course: Computer Science

3. **AI Processing (15 sec)**
   - Click "Find My Scholarships"
   - Show loading state
   - Highlight the chatbot if visible

4. **Results Display (20 sec)**
   - Show eligible scholarships
   - Point out simple English explanations
   - Show requirements clearly

5. **Call to Action (5 sec)**
   - "Try it yourself!"

---

## 🛠️ Recording Tools:

### Free Options:
- **OBS Studio** - https://obsproject.com/ (Best quality)
- **Windows Game Bar** - Press `Win + G` (Built-in)
- **Loom** - https://www.loom.com/ (Easy, 5min free)
- **ShareX** - https://getsharex.com/ (Powerful)

### Paid Options:
- **Camtasia** - Professional editing
- **ScreenFlow** (Mac only)

---

## 🎨 Create Thumbnail (Optional):

### Tools:
- **Canva** - https://www.canva.com/ (Free, easy)
- **Photoshop** - Professional
- **GIMP** - Free Photoshop alternative

### Thumbnail Tips:
- Size: 1280x720 pixels
- Add text: "AI Agent Demo" or "Watch How It Works"
- Use bright colors
- Show screenshot from video

---

## 🗜️ Compress Large Videos:

If your video is too large (>50MB), compress it:

### Tools:
1. **HandBrake** (Best) - https://handbrake.fr/
   - Settings: H.264, RF 23, 1080p
   
2. **CloudConvert** - https://cloudconvert.com/
   - Online, no install needed
   
3. **FFmpeg** (Advanced):
   ```bash
   ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k agent-demo.mp4
   ```

### Target Settings:
- Bitrate: 2-3 Mbps
- Audio: 128 kbps
- Format: MP4 (H.264)

---

## ✅ Checklist:

- [ ] Video recorded (showing agent in action)
- [ ] Video saved as `agent-demo.mp4`
- [ ] Video placed in `FA/videos/` folder
- [ ] Video size under 50 MB (compressed if needed)
- [ ] Optional: Thumbnail created (`agent-demo-thumbnail.jpg`)
- [ ] Website refreshed to test

---

## 🔍 Test Your Video:

1. Make sure file is in `FA/videos/agent-demo.mp4`
2. Refresh your Live Server
3. Scroll to "How It Works" section
4. Video should appear with play controls

---

## 🆘 Troubleshooting:

### Video not showing?
✅ Check filename exactly matches: `agent-demo.mp4`  
✅ Check it's in the `videos/` folder  
✅ Refresh browser (Ctrl + F5)  
✅ Check browser console (F12) for errors

### Video won't play?
✅ Ensure it's MP4 format (H.264 codec)  
✅ Try different browser  
✅ Re-export video with compatible settings

### Video too large/slow?
✅ Compress using HandBrake  
✅ Lower resolution to 1280x720  
✅ Reduce bitrate to 2 Mbps

---

## 📊 Current Setup:

Your website is configured to use:
- **Video**: `videos/agent-demo.mp4`
- **Thumbnail**: `videos/agent-demo-thumbnail.jpg` (optional)
- **Location**: "How It Works" section

Just add your video file and refresh! 🚀
