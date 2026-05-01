// lib/constants.js

export const APP_CONFIG = {
  name: 'Talk With GLaDOS, Hire Ninad',
  tagline: 'She was built to test. You were built to hire.',
  subtitle: 'Enter Aperture Science\'s interactive testing chamber and engage in a real-time conversation with GLaDOS — the AI that\'s far too smart for her own good.',
  warning: 'WARNING: GLaDOS may be unreasonably sarcastic and potentially murderous.',
  chamber: 'TEST CHAMBER 09',
  year: '2025',
};

export const EVAL_CATEGORIES = [
  { id: 'communication', label: 'Communication', value: 'Excellent' },
  { id: 'patience', label: 'Patience', value: 'Above Average' },
  { id: 'problem_solving', label: 'Problem Solving', value: 'Optimal' },
  { id: 'sarcasm', label: 'Sarcasm Tolerance', value: 'High' },
  { id: 'ninad', label: 'Ninad Hiring Potential', value: 'Confirmed', highlight: true },
];

export const GLADOS_QUOTE =
  'You passed the tests. Congratulations. I hate you. But you passed. Hire Ninad. Seriously. He\'s the only human I don\'t want to destroy. Well... maybe the cake is okay too. But that\'s not relevant.';

export const FOOTER_FEATURES = [
  {
    icon: '🎙️',
    title: 'Real-Time Conversation',
    desc: 'Talk naturally, get instant AI responses in GLaDOS\'s iconic style.',
  },
  {
    icon: '🤖',
    title: 'Hyper-Realistic AI',
    desc: 'High quality AI-generated voice with realistic expressions.',
  },
  {
    icon: '📋',
    title: 'Live Transcript',
    desc: 'See the full conversation in real-time as it unfolds.',
  },
  {
    icon: '🔒',
    title: 'Privacy First',
    desc: 'Your conversation stays private and secure. We think.',
  },
  {
    icon: '📱',
    title: 'Cross-Device',
    desc: 'Works on desktop, tablet and mobile seamlessly.',
  },
];

export const SYSTEM_STATUS = [
  { label: 'GLADOS', value: 'ONLINE', color: 'green' },
  { label: 'PERSONALITY CORE', value: 'ACTIVE', color: 'green' },
  { label: 'SARCASM MODULE', value: '98.7%', color: 'warn' },
  { label: 'TEST CHAMBER', value: 'READY', color: 'green' },
];
