'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // このページにアクセスしたら、すぐに認証ページにリダイレクトします
    router.push('/auth');
  }, [router]);

  // リダイレクト中に表示されるコンテンツ（通常は一瞬です）
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#111',
      color: 'white',
      fontFamily: 'sans-serif'
    }}>
      Loading...
    </div>
  );
}