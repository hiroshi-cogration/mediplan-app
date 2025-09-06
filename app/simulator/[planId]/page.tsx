'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getSurgicalPlan, SurgicalPlan } from '@/app/services/planService';

export default function SimulatorPage() {
  const params = useParams();
  const planId = params.planId as string; // planIdをstringとして取得

  const [plan, setPlan] = useState<SurgicalPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!planId) return;

    const fetchPlanData = async () => {
      try {
        setLoading(true);
        const planData = await getSurgicalPlan(planId);
        if (planData) {
          setPlan(planData);
        } else {
          setError('指定された計画が見つかりませんでした。');
        }
      } catch (err) {
        setError('計画の読み込み中にエラーが発生しました。');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanData();
  }, [planId]); // planIdが変更された場合に再実行

  if (loading) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">計画を読み込み中...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        <h1 className="text-2xl font-bold">{error}</h1>
      </div>
    );
  }

  if (!plan) {
    return null; // データがない場合は何も表示しない
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">手術シミュレーター: {plan.planName}</h1>
      <p className="mt-4 text-gray-400">
        現在の計画ID: {plan.id}
      </p>
      <div className="mt-8 border-2 border-dashed border-gray-400 h-96 flex items-center justify-center">
        <p className="text-gray-500">ここに3Dビューアが実装されます。</p>
      </div>
    </div>
  );
}