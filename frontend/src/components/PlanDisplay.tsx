'use client';

import { CheckCircle, Calendar, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface Resource {
    title: string;
    type: string;
    url?: string;
    description?: string;
}

interface DayPlan {
    day_label: string;
    tasks: string[];
    resources: Resource[];
}

interface WeekPlan {
    week_label: string;
    goal: string;
    days: DayPlan[];
}

interface StudyPlan {
    title: string;
    weeks: WeekPlan[];
}

export default function PlanDisplay({ plan }: { plan: StudyPlan }) {
    if (!plan) return null;

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                    {plan.title}
                </h2>
                <p className="text-gray-400">Your personalized curriculum is ready.</p>
            </div>

            <div className="space-y-6">
                {plan.weeks.map((week, weekIdx) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: weekIdx * 0.1 }}
                        key={weekIdx}
                        className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm"
                    >
                        <div className="p-6 border-b border-white/5 bg-white/5">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold text-white">{week.week_label}</h3>
                                <span className="text-indigo-300 text-sm font-medium px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20">
                                    Goal: {week.goal}
                                </span>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            {week.days.map((day, dayIdx) => (
                                <div key={dayIdx} className="relative pl-8 border-l border-white/10 ml-2">
                                    <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-black" />

                                    <div className="space-y-3">
                                        <h4 className="text-white font-medium flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            {day.day_label}
                                        </h4>

                                        <div className="space-y-2">
                                            {day.tasks.map((task, i) => (
                                                <div key={i} className="flex items-start gap-3 text-gray-300 text-sm group">
                                                    <CheckCircle className="w-4 h-4 text-green-500/50 mt-0.5 group-hover:text-green-400 transition-colors" />
                                                    <span>{task}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {day.resources.length > 0 && (
                                            <div className="mt-4 bg-black/20 rounded-lg p-4 space-y-2">
                                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Resources</p>
                                                <div className="grid gap-2">
                                                    {day.resources.map((res, i) => (
                                                        <a
                                                            key={i}
                                                            href={res.url || '#'}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center justify-between p-2 rounded-md hover:bg-white/5 transition-colors group"
                                                        >
                                                            <div className="flex items-center gap-2 overflow-hidden">
                                                                <LinkIcon className="w-3 h-3 text-indigo-400 flex-shrink-0" />
                                                                <span className="text-sm text-indigo-300 truncate group-hover:text-indigo-200">
                                                                    {res.title}
                                                                </span>
                                                                <span className="text-xs text-gray-600 border border-gray-700 px-1.5 rounded">
                                                                    {res.type}
                                                                </span>
                                                            </div>
                                                            {res.url && <ExternalLink className="w-3 h-3 text-gray-600 group-hover:text-white transition-colors" />}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-center pt-8">
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 text-sm text-gray-400 hover:text-white transition-colors border border-transparent hover:border-white/10 rounded-full"
                >
                    Start New Plan
                </button>
            </div>
        </div>
    );
}
