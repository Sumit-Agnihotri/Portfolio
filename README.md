# Sumit Agnihotri — Portfolio

> Data Analyst & AI Engineer in Progress  
> Ranked **#1 in Programming** among Amity University Online learners on GeeksforGeeks

🔗 Live site: _(add your GitHub Pages URL here after deployment)_

---

## 📁 File Structure

```
portfolio/
├── index.html                  ← Main HTML (all sections)
├── style.css                   ← Full stylesheet (tokens, layout, components, animations)
├── main.js                     ← All JavaScript (cursor, particles, tabs, form, etc.)
├── Sumit_Agnihotri_Resume.pdf  ← Downloadable resume PDF
└── README.md                   ← This file
```

---

## 🚀 Deploying to GitHub Pages

### Step 1 — Create a GitHub Repository
1. Go to [github.com](https://github.com) and click **New repository**
2. Name it exactly: `yourusername.github.io`  
   _(e.g. `Sumit-Agnihotri.github.io` — this gives you a free custom URL)_
3. Set to **Public**, click **Create repository**

### Step 2 — Upload Files
**Option A — GitHub Web UI (easiest):**
1. Open your new repo
2. Click **Add file → Upload files**
3. Drag and drop all 4 files: `index.html`, `style.css`, `main.js`, `Sumit_Agnihotri_Resume.pdf`
4. Click **Commit changes**

**Option B — Git CLI:**
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/Sumit-Agnihotri/Sumit-Agnihotri.github.io.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Go to repo **Settings → Pages**
2. Under **Source**, select `main` branch and `/ (root)` folder
3. Click **Save**
4. Your site will be live at: `https://Sumit-Agnihotri.github.io` (takes ~1–2 min)

---

## ✨ Features

| Feature | Details |
|---|---|
| **Custom Cursor** | Smooth glow dot + trailing ring |
| **Particle Canvas** | 65 multi-color floating particles |
| **Typing Effect** | Loops through 5 phrases with delete animation |
| **Scroll Progress** | Gradient bar at top of page |
| **Stats Counters** | Animated number counters on scroll |
| **Reveal Animations** | Staggered IntersectionObserver fade-ins |
| **Resume Tabs** | Education / Skills / Certifications / Achievements |
| **Resume Download** | Direct PDF download link |
| **Contact Form** | Opens email client with pre-filled fields |
| **Active Nav** | Highlights current section in navigation |
| **Mobile Menu** | Smooth hamburger menu with keyboard support |
| **Parallax Orbs** | Background orbs shift on scroll |
| **Accessible** | Skip link, ARIA labels, keyboard nav, reduced-motion |
| **Responsive** | Mobile-first, works on all screen sizes |

---

## 🎨 Customization

### Change color palette
Edit CSS variables at the top of `style.css`:
```css
:root {
  --violet:   #a78bfa;   /* primary accent */
  --gold:     #f0c060;   /* highlight */
  --cyan:     #56d8f0;   /* secondary */
  --emerald:  #34d399;   /* success / badges */
  /* ... */
}
```

### Add a new project
Copy a `.proj-card` block in `index.html` and update the content.

### Add a profile photo
Replace the `.ring-inner` div content in `index.html`:
```html
<div class="ring-inner">
  <img src="your-photo.jpg" alt="Sumit Agnihotri" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />
</div>
```
Place your photo in the same folder as `index.html`.

---

## 📬 Contact

**Sumit Agnihotri**  
📧 sagnihotri9710@gmail.com  
📞 +91-7388575006  
🐙 [github.com/Sumit-Agnihotri](https://github.com/Sumit-Agnihotri)  
💼 [linkedin.com/in/sumit-agnihotri](https://linkedin.com/in/sumit-agnihotri)

---

*© 2026 Sumit Agnihotri. Built with purpose.*