import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Story QR - Sản phẩm thông minh',
  description: 'Story QR - Quản lý và giới thiệu sản phẩm bằng mã QR chuyên nghiệp.',
  icons: {
    icon: 'https://res.cloudinary.com/dlkrskgwq/image/upload/v1758866751/storyqrlogo_hx85zz.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
