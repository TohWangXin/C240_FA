# 🎥 Video Upload Guide for Your AI Agent Demo

Your video section is now ready in the "How It Works" section! Here's how to upload and embed your video.

---

## 🚀 Method 1: YouTube (RECOMMENDED ⭐)

### Why YouTube?
- ✅ Free unlimited hosting
- ✅ Fast loading (CDN)
- ✅ Mobile-friendly
- ✅ Auto quality adjustment
- ✅ No bandwidth costs

### Steps:

1. **Upload to YouTube**
   - Go to [YouTube Studio](https://studio.youtube.com)
   - Click "Create" → "Upload videos"
   - Drag your agent demo video
   - Fill in details:
     - **Title**: "AI Scholarship Agent Demo - How It Works"
     - **Description**: "Watch how our AI agent finds scholarships..."
     - **Visibility**: Public or Unlisted (Unlisted = only people with link can view)

2. **Get Video ID**
   - After upload, go to your video
   - Look at the URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - Copy the part after `v=` → `dQw4w9WgXcQ` ← This is your VIDEO_ID

3. **Update Your Website**
   - Open [index.html](index.html)
   - Find line 189: `src="https://www.youtube.com/embed/YOUR_VIDEO_ID"`
   - Replace `YOUR_VIDEO_ID` with your actual ID
   - Example: `src="https://www.youtube.com/embed/dQw4w9WgXcQ"`

4. **Save and Refresh!** 🎉

---

## 💻 Method 2: Local Video File (Best for Offline)

### When to Use:
- Video is small (<50MB)
- Don't want to use YouTube
- Need offline access

### Steps:

1. **Create Videos Folder**
   ```
   FA/
   ├── videos/              ← Create this folder
   │   ├── agent-demo.mp4  ← Put video here
   │   └── agent-demo-thumbnail.jpg  ← Optional thumbnail
   ```

2. **Prepare Your Video**
   - Recommended format: MP4 (H.264)
   - Recommended size: Under 50MB
   - Recommended resolution: 1920x1080 or 1280x720

3. **Convert Video (Optional but recommended)**
   - Use [HandBrake](https://handbrake.fr/) to compress
   - Or use online converter: [CloudConvert](https://cloudconvert.com/mp4-converter)
   - Target: ~20-30MB for best performance

4. **Update index.html**
   - Go to line 199 in [index.html](index.html)
   - **Comment out** the YouTube iframe (lines 185-194):
     ```html
     <!-- 
     <iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID"...></iframe>
     -->
     ```
   
   - **Uncomment** the local video section (lines 196-206):
     Remove the `<!--` and `-->` around the `<video>` tag

5. **Your code should look like:**
   ```html
   <video 
       id="agent-video"
       style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
       controls 
       poster="videos/agent-demo-thumbnail.jpg">
       <source src="videos/agent-demo.mp4" type="video/mp4">
       Your browser does not support the video tag.
   </video>
   ```

6. **Test It**
   - Refresh your Live Server
   - Video should appear with controls

---

## ☁️ Method 3: Google Drive (Easy Sharing)

### When to Use:
- Already have video on Google Drive
- Want easy updates
- Don't want YouTube branding

### Steps:

1. **Upload to Google Drive**
   - Go to [Google Drive](https://drive.google.com)
   - Click "New" → "File Upload"
   - Upload your agent demo video

2. **Get Shareable Link**
   - Right-click your video → "Share"
   - Click "Change to anyone with the link"
   - Set to "Viewer"
   - Copy the link: `https://drive.google.com/file/d/1abc123XYZ.../view`

3. **Extract File ID**
   - From: `https://drive.google.com/file/d/1abc123XYZ/view`
   - Copy: `1abc123XYZ` ← This is your FILE_ID

4. **Update index.html**
   - Go to line 208 in [index.html](index.html)
   - **Comment out** YouTube iframe (lines 185-194)
   - **Uncomment** Google Drive iframe (lines 208-215)
   - Replace `YOUR_FILE_ID` with your actual file ID

5. **Final code:**
   ```html
   <iframe 
       id="agent-video"
       style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
       src="https://drive.google.com/file/d/1abc123XYZ/preview" 
       allowfullscreen>
   </iframe>
   ```

---

## 🎬 Video Recording Tips

### What to Show in Your Agent Demo:

1. **Intro (5 seconds)**
   - "Watch our AI agent find scholarships in real-time"

2. **Show the Form (10 seconds)**
   - Enter sample student data
   - GPA: 3.5, Income: Low, Course: Computer Science

3. **Agent in Action (15 seconds)**
   - Click "Find My Scholarships"
   - Show loading animation
   - Highlight the AI processing

4. **Results (20 seconds)**
   - Show eligible scholarships
   - Point out clear explanations
   - Show requirements in simple English

5. **Call to Action (5 seconds)**
   - "Try it yourself below!"

**Total: 45-60 seconds** (Sweet spot for engagement!)

### Recording Tools:

- **Free Options:**
  - [OBS Studio](https://obsproject.com/) - Best for desktop recording
  - [Loom](https://www.loom.com/) - Easy browser recording (free 5min)
  - Windows Game Bar (Win + G) - Built into Windows
  
- **Paid Options:**
  - Camtasia - Professional editing
  - ScreenFlow (Mac) - Easy to use

---

## 📊 Quick Comparison

| Method | Pros | Cons | Best For |
|--------|------|------|----------|
| **YouTube** | Free, Fast, Reliable | Needs YouTube account | Most people ⭐ |
| **Local File** | Full control, Offline | Large file size, slow loading | Small videos |
| **Google Drive** | Easy to update | Can be slow | Quick testing |

---

## 🔧 After Uploading - Final Steps

1. **Create a Thumbnail (Optional but recommended)**
   - Size: 1280x720 pixels
   - Tools: [Canva](https://www.canva.com/) (free)
   - Add text: "AI Agent Demo" or "Watch How It Works"

2. **Test on Mobile**
   - Check if video plays on phone
   - Verify controls work

3. **Optimize Loading**
   - For YouTube: Add `?rel=0` to hide related videos
   - Example: `embed/VIDEO_ID?rel=0`

4. **Add Analytics (Optional)**
   - YouTube: Built-in analytics
   - Local: Add Google Analytics events

---

## 🆘 Troubleshooting

### Video not showing?
- Check file path is correct
- Verify video uploaded successfully
- Check browser console (F12) for errors

### Video too large?
- Compress using HandBrake
- Target bitrate: 2-3 Mbps
- Resolution: 1280x720 max

### Slow loading?
- Use YouTube (best performance)
- Or compress video more
- Add loading indicator

---

## ✅ Checklist

- [ ] Video recorded (45-60 seconds recommended)
- [ ] Video uploaded to YouTube/Drive/Local
- [ ] Video ID/path copied
- [ ] index.html updated with correct ID/path
- [ ] Commented out unused video options
- [ ] Tested on desktop browser
- [ ] Tested on mobile device
- [ ] Thumbnail created (optional)
- [ ] Page saved and refreshed

---

## 📞 Need Help?

**Common Issues:**
- Video not playing → Check the src URL is correct
- Poor quality → Re-export at higher bitrate
- Slow loading → Use YouTube or compress more

**Your current setup in [index.html](index.html):**
- Line 189: YouTube embed (ACTIVE by default)
- Line 199: Local video (commented out)
- Line 210: Google Drive (commented out)

Just pick ONE method and update the corresponding line!

---

**Ready to add your video?** Choose your method and follow the steps above! 🚀
