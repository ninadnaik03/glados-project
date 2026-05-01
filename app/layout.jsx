import './globals.css';

export const metadata = {
  title: 'Talk With GLaDOS, Hire Ninad — Aperture Science',
  description: 'Enter Aperture Science\'s interactive testing chamber and engage in a real-time conversation with GLaDOS.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-aperture-bg text-aperture-white font-ui antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
