# 🔬 Talk With GLaDOS, Hire Ninad
### An Aperture Science Testing Initiative

> *"She was built to test. You were built to hire."*

A cinematic browser-based conversational AI web app where users enter a live video-call style Aperture Science testing chamber and speak with GLaDOS in real time.

---

## 🚀 Quick Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure API keys
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in your keys:

```env
ANTHROPIC_API_KEY=your_key_here
ELEVENLABS_API_KEY=your_key_here
ELEVENLABS_VOICE_ID=your_glados_voice_id_here
```

### 3. Add your GLaDOS video
Place your Portal cutscene clip at:
```
public/video.mp4
```

Recommended: any Portal or Portal 2 scene featuring GLaDOS (idle or speaking).
The video plays in the background with ~18% opacity on the hero, and at ~85% opacity in the call chamber.

### 4. Run development server
```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 🎙️ API Keys Setup

### Anthropic (GLaDOS Brain)
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create an API key
3. Add to `.env.local` as `ANTHROPIC_API_KEY`

### ElevenLabs (GLaDOS Voice)
1. Go to [elevenlabs.io](https://elevenlabs.io)
2. Search the Voice Library for **"GLaDOS"**
3. Click "Add to My Voices"
4. Copy the Voice ID from your Voice Lab
5. Add both your API key and voice ID to `.env.local`

> **No API keys?** The app still works in demo mode with fallback responses and browser TTS.

---

## 📁 Project Structure

```
/
├── app/
│   ├── page.jsx                   ← Main app (all logic here)
│   ├── layout.jsx                 ← Root layout + fonts
│   ├── globals.css                ← All custom CSS
│   └── api/
│       ├── chat/route.js          ← Claude LLM endpoint
│       ├── text-to-speech/route.js ← ElevenLabs TTS endpoint
│       └── conversation-loop/route.js ← Master orchestrator
│
├── components/
│   ├── HeroPanel.jsx              ← Landing page hero
│   ├── FeatureStrip.jsx           ← Feature highlights bar
│   ├── TestChamber.jsx            ← GLaDOS video call panel
│   ├── ConversationPanel.jsx      ← Live transcript
│   ├── ResultsPanel.jsx           ← Test results + HIRE NINAD
│   ├── ControlDock.jsx            ← Call controls (mute/end/etc)
│   ├── FooterInfo.jsx             ← Footer
│   ├── SystemStatusCard.jsx       ← Status overlay on hero
│   ├── ApertureIcon.jsx           ← Aperture SVG logo
│   └── ScanlineOverlay.jsx        ← Scanline + noise effect
│
├── lib/
│   ├── gladosPrompt.js            ← GLaDOS system prompt + demo responses
│   └── constants.js               ← UI copy, eval categories, features
│
└── public/
    └── video.mp4                  ← DROP YOUR GLADOS VIDEO HERE
```

---

## 🎬 Video Tips

For best results, use a Portal 2 clip where GLaDOS is stationary and centered.
Good scenes:
- Any chamber introduction
- GLaDOS monologues
- The final confrontation

The app will show the animated GLaDOS eye as fallback if no video is present.

---

## 📱 Responsive Design

| Screen | Layout |
|--------|--------|
| Mobile (<700px) | Video call full width + floating transcript button |
| Tablet (700-1080px) | Video call + transcript panel |
| Desktop (>1080px) | Video call + transcript + results panel |

---

## 🧠 How the Conversation Works

```
User speaks into mic
       ↓
Web Speech API transcribes
       ↓
POST /api/conversation-loop
       ↓
Claude generates GLaDOS response
       ↓
ElevenLabs synthesizes voice
       ↓
Audio plays in browser
       ↓
Waveform + eye animation react
       ↓
Mic restarts automatically
```

---

## 🔧 Customization

**Change the persona:** Edit `lib/gladosPrompt.js`

**Change Ninad easter eggs:** Edit the `NINAD EASTER EGG RULES` section in the system prompt

**Change colors:** Edit CSS variables in `app/globals.css`

**Change eval categories:** Edit `lib/constants.js`

---

## 🚢 Deploy

```bash
npm run build
npm start
```

Or deploy to Vercel (recommended):
```bash
npx vercel
```

Set all env variables in the Vercel dashboard.

---

*© 2025 Aperture Science Enrichment Center. We do what we must because we can.*
