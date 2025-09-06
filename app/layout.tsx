import type { Metadata } from "next";
// import "./globals.css"; ← この行は削除、またはコメントアウト

export const metadata: Metadata = {
  title: "MediPlan",
  description: "3D Surgical Simulation App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* 事前にビルドされたCSSファイルを直接読み込む */}
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}