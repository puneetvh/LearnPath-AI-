'use client';

import { useState } from 'react';
import StudyForm from '@/components/StudyForm';
import PlanDisplay from '@/components/PlanDisplay';

export default function Home() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (data: { topic: string; level: string; time: string }) => {
    setLoading(true);
    setError('');

    try {
      // In production, use env var. For now localhost
      const res = await fetch('http://localhost:8000/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: data.topic,
          current_level: data.level,
          time_commitment: data.time
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate plan. Please try again.');
      }

      const result = await res.json();
      setPlan(result);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-96 bg-indigo-500/10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 py-12 md:py-20">
        {!plan ? (
          <div className="space-y-12">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide uppercase">
                AI Powered Learning
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                Master any skill with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">
                  Structured Precision
                </span>
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed">
                Generate a personalized, week-by-week curriculum tailored to your goals.
                Focus on learning, not planning.
              </p>
            </div>

            <StudyForm onSubmit={handleGenerate} isLoading={loading} />

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-center max-w-md mx-auto">
                {error}
              </div>
            )}
          </div>
        ) : (
          <PlanDisplay plan={plan} />
        )}
      </div>
    </main>
  );
}
