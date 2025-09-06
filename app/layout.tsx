import type { Metadata } from "next";
import "./globals.css"; // ← Next.js標準のCSSインポートを復活させる

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
      {/* <body> に直接ダークテーマのクラスを適用 */}
      <body className="bg-gray-900 text-gray-200">{children}</body>
    </html>
  );
}