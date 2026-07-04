import "./globals.css";
import Header from "../components/Header";
import IntroManager from "../components/IntroManager";
import NoiseOverlay from "../components/NoiseOverlay";
import SmoothScroll from "../components/SmoothScroll";

export const metadata = {
  title: "Yug Patel — AI & Full Stack Engineer",
  description:
    "Portfolio of Yug Patel, Computer Science student at IIIT Surat specializing in AI, Full Stack Development, and competitive programming. B.Tech 2027.",
  keywords:
    "Yug Patel, portfolio, AI, full stack, machine learning, React, Next.js, FastAPI, IIIT Surat",
  openGraph: {
    title: "Yug Patel — AI & Full Stack Engineer",
    description:
      "CS student at IIIT Surat building AI-powered products and scalable full-stack applications.",
    type: "website",
  },
};

const themeScript = `
  (function() {
    try {
      var stored = localStorage.getItem('theme');
      if (stored) {
        document.documentElement.setAttribute('data-theme', stored);
      } else {
        var dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <NoiseOverlay />
        <IntroManager />
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <footer className="app-footer">
            <div className="container footer-inner">
              <p className="footer-copy">
                © {new Date().getFullYear()} Yug Patel — Crafted with care
              </p>
              <div className="footer-links">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-link">LinkedIn</a>
                <a href="https://leetcode.com" target="_blank" rel="noreferrer" className="footer-link">LeetCode</a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
                <a href="mailto:patelyug01234@gmail.com" className="footer-link">Email</a>
              </div>
            </div>
          </footer>
        </SmoothScroll>
      </body>
    </html>
  );
}
