import type { Metadata } from "next";
import "./globals.css"; // ← GPTが指摘する、必須のインポート

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
      {/* <body> にダークテーマ用のTailwindクラスを適用 */}
      <body className="bg-gray-900 text-gray-200">{children}</body>
    </html>
  );
}