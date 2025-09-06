'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getSurgicalPlan, SurgicalPlan } from '@/app/services/planService';
import Scene from '@/app/components/Scene';
import ControlPanel from '@/app/components/ControlPanel'; // NEW: ControlPanelをインポート

export default function SimulatorPage() {
  const params = useParams();
  const planId = params.planId as string;

  const [plan, setPlan] = useState<SurgicalPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!planId) return;
    const fetchPlanData = async () => {
      try {
        setLoading(true);
        const planData = await getSurgicalPlan(planId);
        if (planData) setPlan(planData);
        else setError('指定された計画が見つかりませんでした。');
      } catch (err) {
        setError('計画の読み込み中にエラーが発生しました。');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanData();
  }, [planId]);

  if (loading) return <div className="p-8 text-center"><h1 className="text-2xl font-bold">計画を読み込み中...</h1></div>;
  if (error) return <div className="p-8 text-center text-red-500"><h1 className="text-2xl font-bold">{error}</h1></div>;
  if (!plan) return null;

  return (
    // FIX: 画面全体をコンテナとして利用
    <div className="w-screen h-screen">
      {/* ControlPanelを左上に絶対配置 */}
      <ControlPanel />
      {/* Sceneコンポーネントは全体に広がる */}
      <Scene />
    </div>
  );
}