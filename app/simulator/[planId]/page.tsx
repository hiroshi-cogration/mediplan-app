'use client';

import { useParams } from 'next/navigation';

export default function SimulatorPage() {
  const params = useParams();
  const { planId } = params;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">手術シミュレーター</h1>
      <p className="mt-4">
        現在の計画ID: {planId}
      </p>
      <div className="mt-8 border-2 border-dashed border-gray-400 h-96 flex items-center justify-center">
        <p className="text-gray-500">ここに3Dビューアが実装されます。</p>
      </div>
    </div>
  );
}