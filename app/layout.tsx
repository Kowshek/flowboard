import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:  "FlowBoard — SaaS Analytics Dashboard",
    template: "%s | FlowBoard",
  },
  description:
    "Real-time SaaS analytics dashboard with customer management, revenue tracking, and team insights.",
  metadataBase: new URL("https://launchflow.app"),
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "FlowBoard — SaaS Analytics Dashboard",
    description:
      "Real-time SaaS analytics dashboard with customer management, revenue tracking, and team insights.",
    url: "https://launchflow.app",
    siteName: "FlowBoard",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FlowBoard — SaaS Analytics Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowBoard — SaaS Analytics Dashboard",
    description:
      "Real-time SaaS analytics dashboard with customer management, revenue tracking, and team insights.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Inline script runs before React hydrates to prevent flash of wrong theme.
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark') document.documentElement.classList.add('dark');
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jakarta.variable} h-full`}>
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
