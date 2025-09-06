'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, User } from 'firebase/auth';
import { auth } from '@/firebase/config';
// FIX: インポートパスに 'app' を追加
import {
  getProcedureTemplates,
  createSurgicalPlan,
  ProcedureTemplate,
} from '@/app/services/planService';

export default function DashboardPage() {
  const router = useRouter();
  const [user] = useState<User | null>(auth.currentUser);
  const [templates, setTemplates] = useState<ProcedureTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const fetchedTemplates = await getProcedureTemplates();
        setTemplates(fetchedTemplates);
      } catch (err) {
        setError('術式テンプレートの読み込みに失敗しました。');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleCreatePlan = async (template: ProcedureTemplate) => {
    const planName = prompt(`新しい計画名を入力してください：`, `${template.name} - ${new Date().toLocaleDateString()}`);

    if (planName) {
      try {
        const newPlanId = await createSurgicalPlan(template, planName);
        router.push(`/simulator/${newPlanId}`);
      } catch (err) {
        setError('計画の作成に失敗しました。');
        console.error(err);
      }
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/auth');
  };

  if (loading) {
    return <div className="text-center p-10">読み込み中...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 bg-red-500">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">MediPlan ダッシュボード</h1>
        <div>
          <span className="mr-4">{user?.email}</span>
          <button
            onClick={handleSignOut}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            ログアウト
          </button>
        </div>
      </header>
      
      <main>
        <h2 className="text-2xl font-semibold mb-6">手術計画を開始</h2>
        <p className="text-gray-400 mb-6">以下の術式テンプレートから新規計画を作成してください。</p>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => handleCreatePlan(template)}
            >
              <h3 className="text-xl font-bold text-teal-400">{template.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{template.category}</p>
              <p className="text-gray-300">{template.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}