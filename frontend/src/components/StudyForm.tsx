'use client';

import { useState } from 'react';
import { Loader2, Sparkles, BookOpen, Clock, BarChart } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface StudyFormProps {
    onSubmit: (data: { topic: string; level: string; time: string }) => void;
    isLoading: boolean;
}

export function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

export default function StudyForm({ onSubmit, isLoading }: StudyFormProps) {
    const [topic, setTopic] = useState('');
    const [level, setLevel] = useState('Beginner');
    const [time, setTime] = useState('1 week');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (topic.trim()) {
            onSubmit({ topic, level, time });
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl">
            <div className="flex items-center gap-2 mb-6 text-indigo-400">
                <Sparkles className="w-5 h-5" />
                <h2 className="text-lg font-semibold text-white">Design Your Path</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm text-gray-400 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" /> Topic
                    </label>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g. Advanced Python, Roman History"
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 flex items-center gap-2">
                            <BarChart className="w-4 h-4" /> Level
                        </label>
                        <select
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 flex items-center gap-2">
                            <Clock className="w-4 h-4" /> Time
                        </label>
                        <select
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                        >
                            <option value="1 day">1 Day</option>
                            <option value="3 days">3 Days</option>
                            <option value="1 week">1 Week</option>
                            <option value="2 weeks">2 Weeks</option>
                            <option value="1 month">1 Month</option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading || !topic.trim()}
                    className={cn(
                        "w-full mt-6 py-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-all duration-300",
                        isLoading || !topic.trim()
                            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-500 text-white hover:scale-[1.02] shadow-lg shadow-indigo-500/25"
                    )}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Generatiang Plan...
                        </>
                    ) : (
                        'Generate Study Plan'
                    )}
                </button>
            </form>
        </div>
    );
}
