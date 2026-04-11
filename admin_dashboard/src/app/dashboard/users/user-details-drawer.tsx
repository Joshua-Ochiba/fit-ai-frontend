"use client";
import { User } from "@/types/user";
import { X, Dumbbell, MessageSquare, Trophy, Calendar, Mail, Zap, TrendingUp } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { use } from "react";


interface UserDetailsDrawerProps {
    user: User | null;
    onClose: () => void;
}

export function UserDetailsDrawer({ user, onClose }: UserDetailsDrawerProps) {
    if (!user) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/60 
            backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="w-full relative max-w-md bg-slate-900 border-l border-slate-800
            shadow-2xl h-full flex flex-col animate-in slide-in-from-right
            duration-300">

                {/* Header */}
                <div className="p-6 border-b border-slate-800 flex items-center justify-between
                bg-slate-900/50">
                    <h2 className="text-lg font-semibold text-white">
                        Profile
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-800 rounded-lg text-slate-500
                        hover:text-white transition-all"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/*Basic Info */}
                    <div className="text-center">
                        <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600
                                      flex items-center justify-center text-white text-3xl
                                       font-bold mx-auto mb-4 shadow-lg shadow-blue-500/20">
                            {user.name.charAt(0)}
                        </div>

                        <h3 className="text-xl font-bold text-white">
                            {user.name}
                        </h3>

                        <div className="flex items-center justify-center gap-2 mt-2">
                            <StatusBadge status={user.status} />
                            <span className="text-slate-500 mr-2 ml-2">•</span>
                            <span className="text-sm text-slate-400 font-medium">{user.fitnessLevel}</span>
                        </div>
                    </div>

                    {/*AI Coaching Insight*/}
                    <div className="bg-blue-500/5 border border-blue-500/10 
                    rounded-2xl p-5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-3 opacity-10">
                            <Zap className="h-12 w-12 text-blue-400" />
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                            <Zap className="h-4 w-4 text-blue-400" />


                            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Latest Insights</span>
                        </div>

                        <p className="text-sm text-slate-300 leading-relaxed italic">
                            "{user.lastInsight}"
                        </p>
                    </div>


                    {/*Core Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800/30 border border-slate-800 rounded-xl p-4">
                            <div className="text-slate-500 text-[10px] uppercase
                             font-bold tracking-wider mb-1">
                                Workouts
                            </div>

                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold text-white">{user.workoutsLogged}</span>

                                <TrendingUp className="w-4 h-4 text-emerald-500 mb-1.5" />
                            </div>
                        </div>

                        <div className="bg-slate-800/30 border border-slate-800 rounded-xl p-4">
                            <div className="text-slate-500 text-[10px] uppercase
                             font-bold tracking-wider mb-1">
                                AI CHATS
                            </div>

                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold text-white">
                                    {user.aiInteractions}
                                </span>
                                <MessageSquare className="h-4 w-4 text-blue-500 mb-1.5" />
                            </div>
                        </div>
                    </div>

                    {/*Details List*/}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between
                         text-sm py-2 border-b border-slate-800/50">
                            <span className="text-slate-500 flex items-start gap-2">
                                <Mail className="h-4 w-4" /> Email
                            </span>

                            <span className="text-slate-300 font-medium">
                                {user.email}
                            </span>
                        </div>

                        <div className="flex items-center justify-between
                         text-sm py-2 border-b border-slate-800/50">
                            <span className="text-slate-500 flex items-start gap-2">
                                <Trophy className="h-4 w-4" /> Top Excercise
                            </span>
                            <span className="text-slate-300 font-medium">
                                {user.topExercise}
                            </span>
                        </div>

                        <div className="flex items-center justify-between
                         text-sm py-2 border-b border-slate-800/50">
                            <span className="text-slate-500 flex items-start gap-2"><Calendar className="h-4 w-4" /> Join Date </span>
                            <span className="text-slate-500 flex items-start gap-2">
                                {user.joinDate}
                            </span>
                        </div>
                    </div>

                    {/*Footer Actions */}
                    <div className="p-6 border-t border-slate-800 bg-slate-900/50 space-y-3">
                        <button className="w-full bg-blue-600 hover:bg-blue-500
                          text-white text-sm font-semibold py-3 
                          rounded-xl transition-all shadow-lg 
                          shadow-blue-600/20">
                            View Full History
                        </button>

                        <button className="w-full bg-blue-600
                          hover:bg-blue-500 text-white text-sm 
                          font-semibold py-3 rounded-xl 
                         transition-all shadow-lg shadow-blue-600/20">
                            Reset AI Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}