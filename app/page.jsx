'use client';

import { useState, useRef, useCallback } from 'react';

import ApertureIcon from '../components/ApertureIcon';
import ScanlineOverlay from '../components/ScanlineOverlay';
import HeroPanel from '../components/HeroPanel';
import FeatureStrip from '../components/FeatureStrip';
import TestChamber from '../components/TestChamber';
import ConversationPanel from '../components/ConversationPanel';
import ResultsPanel from '../components/ResultsPanel';
import FooterInfo from '../components/FooterInfo';

function getTime() {
const d = new Date();
return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

const INITIAL_MESSAGES = [
{
speaker: 'GLADOS',
text: "Oh good. You've entered the testing chamber. Press Join Call when you're ready. Or type if speaking is too difficult.",
time: '--:--',
},
];

export default function Home() {
const [showHero, setShowHero] = useState(true);
const [callActive, setCallActive] = useState(false);
const [micActive, setMicActive] = useState(false);
const [camActive, setCamActive] = useState(false);
const [isTalking, setIsTalking] = useState(false);
const [isTyping, setIsTyping] = useState(false);
const [micStatus, setMicStatus] = useState('OFF');
const [aiStatus, setAiStatus] = useState('IDLE');
const [messages, setMessages] = useState(INITIAL_MESSAGES);
const [mobileTranscriptOpen, setMobileTranscriptOpen] = useState(false);
const [testComplete, setTestComplete] = useState(false);
const [score, setScore] = useState(0);

const recognitionRef = useRef(null);
const userVideoRef = useRef(null);
const camStreamRef = useRef(null);

const addMessage = useCallback((speaker, text) => {
setMessages(prev => [...prev, { speaker, text, time: getTime() }]);
}, []);

const handleBeginTest = () => setShowHero(false);

const playBase64Audio = async (base64Audio) => {
return new Promise((resolve) => {
if (!base64Audio || typeof window === 'undefined') return resolve();

```
  const audio = new window.Audio(`data:audio/mp3;base64,${base64Audio}`);

  audio.onplay = () => {
    setIsTalking(true);
    setAiStatus('SPEAKING');
  };

  audio.onended = () => {
    setIsTalking(false);
    setAiStatus('IDLE');
    resolve();
  };

  audio.onerror = () => {
    setIsTalking(false);
    setAiStatus('IDLE');
    resolve();
  };

  audio.play().catch(() => resolve());
});
```

};

const sendTranscriptToAI = async (transcript) => {
if (!transcript || !transcript.trim()) return;

```
addMessage('SUBJECT', transcript);
setIsTyping(true);
setAiStatus('PROCESSING');

try {
  const res = await fetch('/api/conversation-loop', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transcript }),
  });

  const data = await res.json();

  setIsTyping(false);

  addMessage('GLADOS', data.reply || 'System response unavailable.');
  await playBase64Audio(data.audio);
} catch (err) {
  console.log(err);
  setIsTyping(false);
  setAiStatus('IDLE');
  addMessage('GLADOS', 'Aperture systems briefly failed. Continue.');
}
```

};

const startListening = () => {
if (typeof window === 'undefined') return;

```
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SR) {
  addMessage('GLADOS', 'Speech recognition unsupported. Type instead. How primitive.');
  return;
}

if (recognitionRef.current) {
  recognitionRef.current.stop();
  recognitionRef.current = null;
}

const recognition = new SR();
recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = 'en-US';

recognition.onstart = () => {
  setMicActive(true);
  setMicStatus('ACTIVE');
};

recognition.onerror = () => {
  setMicActive(false);
  setMicStatus('ERROR');
  addMessage('GLADOS', 'Microphone comprehension failure. Try again, but better.');
};

recognition.onend = () => {
  setMicActive(false);
  setMicStatus('OFF');
};

recognition.onresult = async (event) => {
  const transcript = event.results[0][0].transcript;
  await sendTranscriptToAI(transcript);
};

recognition.start();
recognitionRef.current = recognition;
```

};

const handleJoin = () => {
if (callActive) return;
setCallActive(true);
addMessage('GLADOS', 'Oh. You actually showed up. Press Unmute and speak, or type below.');
};

const handleToggleMic = () => {
if (!callActive) return;
startListening();
};

const handleToggleCam = async () => {
if (typeof navigator === 'undefined') return;

```
if (camActive) {
  camStreamRef.current?.getTracks().forEach(track => track.stop());
  if (userVideoRef.current) userVideoRef.current.srcObject = null;
  setCamActive(false);
} else {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    camStreamRef.current = stream;
    if (userVideoRef.current) userVideoRef.current.srcObject = stream;
    setCamActive(true);
  } catch (err) {
    console.log(err);
    addMessage('GLADOS', 'Camera activation denied. Probably for the best.');
  }
}
```

};

const handleEnd = () => {
recognitionRef.current?.stop();
setCallActive(false);
setMicActive(false);
setMicStatus('OFF');
setIsTalking(false);
setAiStatus('IDLE');
setTestComplete(true);
setScore(89 + Math.floor(Math.random() * 10));
addMessage('GLADOS', 'Test concluded. You were less useless than expected. Hire Ninad.');
};

const handleReset = () => {
recognitionRef.current?.stop();
camStreamRef.current?.getTracks().forEach(track => track.stop());
if (userVideoRef.current) userVideoRef.current.srcObject = null;

```
setCallActive(false);
setMicActive(false);
setCamActive(false);
setIsTalking(false);
setIsTyping(false);
setMicStatus('OFF');
setAiStatus('IDLE');
setMessages(INITIAL_MESSAGES);
setTestComplete(false);
setScore(0);
```

};

const handleFullscreen = () => {
if (typeof document === 'undefined') return;

```
if (!document.fullscreenElement) {
  document.documentElement.requestFullscreen?.();
} else {
  document.exitFullscreen?.();
}
```

};

return (
<> <ScanlineOverlay />

```
  <nav style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 20px',
    borderBottom: '1px solid var(--border)',
    background: 'rgba(10,11,13,0.95)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <ApertureIcon size={28} />
      <div style={{ fontFamily: 'Orbitron', fontSize: '11px', letterSpacing: '0.15em' }}>
        APERTURE LABORATORIES
      </div>
    </div>

    <div className="nav-links-desktop" style={{ display: 'flex', gap: '20px', fontSize: '11px', color: 'var(--white-dim)' }}>
      <span>TESTING INITIATIVE</span>
      <span>SUBJECT LOGIN</span>
    </div>

    <div className="nav-right-desktop" style={{ fontSize: '10px', color: 'var(--white-dim)' }}>
      WE DO WHAT WE MUST
    </div>
  </nav>

  {showHero ? (
    <>
      <HeroPanel onBeginTest={handleBeginTest} />
      <FeatureStrip />
      <FooterInfo />
    </>
  ) : (
    <>
      <div style={{ display: 'grid' }} className="call-layout-grid">
        <TestChamber
          isTalking={isTalking}
          callActive={callActive}
          micActive={micActive}
          camActive={camActive}
          micStatus={micStatus}
          aiStatus={aiStatus}
          onJoin={handleJoin}
          onToggleMic={handleToggleMic}
          onToggleCam={handleToggleCam}
          onEnd={handleEnd}
          onReset={handleReset}
          onFullscreen={handleFullscreen}
          userVideoRef={userVideoRef}
        />

        <div className="transcript-col">
          <ConversationPanel
            messages={messages}
            isTyping={isTyping}
            onClear={() => setMessages([])}
            onSendMessage={sendTranscriptToAI}
          />
        </div>

        <div className="results-col">
          <ResultsPanel complete={testComplete} score={score} onReset={handleReset} />
        </div>
      </div>

      <button onClick={() => setMobileTranscriptOpen(!mobileTranscriptOpen)} className="mobile-transcript-fab">
        💬
      </button>

      {mobileTranscriptOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'var(--panel)', zIndex: 200 }}>
          <ConversationPanel
            messages={messages}
            isTyping={isTyping}
            onClear={() => setMessages([])}
            onSendMessage={sendTranscriptToAI}
          />
        </div>
      )}

      <FooterInfo />
    </>
  )}
</>
```

);
}
