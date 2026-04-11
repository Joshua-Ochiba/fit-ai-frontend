"use client";
import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { ChevronRight, MessageSquare, Activity, User, Lock, Mail } from 'lucide-react';
import fitAiLogo from "@/assets/fitai.png";
import Image from 'next/image';
import placeholderImage from "@/assets/placeholder.png"

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [view, setView] = useState<'admin' | 'public'>('admin');

    //Auth States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleAdminLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const success = await login(email, password);
        if (success) {
            router.push('/dashboard');
        }
        else {
            setError('Invalid Credentials');
            setLoading(false);
        };
    };

    return (
        <div className='fixed inset-0 z-[150] bg-slate-950 flex items-center 
        justify-center p-6 md:p-12 overflow-hidden'>
            {/*Background blurs*/}
            <div className='absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 
            rounded-full blur-[120px]' />
            <div className='absolute top-1/4 -right-20 w-96 h-96 bg-indigo-600/10 
            rounded-full blur-[120px]' />

            {/*Split Container*/}
            <div className='relative w-full  max-w-[1000px] h-[570px]
            bg-slate-900/20 backdrop-blur-3xl shadow-2xl rounded-none md:rounded-[32px] border
            border-slate-800/50 overflow-hidden flex flex-col md:flex-row'>

                {/*Sliding Branding Overlay(Desktop Only)*/}
                <div
                    className={`absolute hidden md:block top-0 bottom-0 w-1/2 z-50 transition-all
                        duration-700 ease-in-out transform 
                        ${view === 'admin' ? 'translate-x-full' : 'translate-x-0'}`}
                >
                    <div className=' w-full h-full overflow-hidden'>
                        <Image src={placeholderImage}
                            className='w-full h-full object-cover grayscale brightness-[0.3]'
                        />
                        <div className='absolute inset-0 bg-gradient-to-br from-blue-600/40 to-transparent' />
                        <div
                            className='absolute inset-0 p-12 flex flex-col justify-end'
                        >

                            <div className='h-32 relative'>
                                <div className={`absolute inset-0 transition-all duration-700 ease-in-out
                                   ${view === 'admin' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                                `}
                                >
                                    <h2 className='text-3xl  font-bold leading-tight text-white tracking-tight mb-2'>
                                        Fit.AI Control Core

                                    </h2>
                                    <p className="text-blue-200 text-sm opacity-80">
                                        System access for monitoring, analytics, and platform operations.
                                    </p>
                                </div>

                                <div className={`absolute inset-0 transition-all duration-700 ease-in-out
                                    ${view === 'public' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                                    `}>
                                    <h2 className="text-3xl font-bold text-white mb-2">Your AI Personal Coach</h2>
                                    <p className="text-blue-200 text-sm opacity-80">Public Platform Experience</p>
                                </div>

                            </div>

                            <button
                                onClick={() => setView(view === 'admin' ? 'public' : 'admin')}
                                className='mt-8 px-8 py-3 w-fit bg-white text-slate-900 rounded-2xl
                            font-bold text-xs uppercase tracking-widest hover:scale-105 
                            active:scale-95 transition-all shadow-xl shadow-white/10 flex 
                            items-center justify-center gap-2'>

                                {view === 'admin' ? "Go to Public Chat" : "Return to Login"}
                                <ChevronRight className='h-4 w-4' />
                            </button>
                        </div>
                    </div>

                </div>

                {/*Left Side(Login Form) */}
                <div className={`w-full md:w-1/2 h-full flex flex-col p-10
                    md:p-12 transition-all duration-700
                    ${view === 'admin' ? 'opacity-100' :
                        'opacity-0 pointer-events-none translate-x-[-20px]'}
                `}>
                    <div className='flex justify-between items-center mb-8'>
                        <Image src={fitAiLogo} width={85} height={40} className='brightness-200 contrat-200 animate-pulse' />

                        <span className='px-3 py-1 bg-blue-500/10 border border-blue-500/20
                    rounded-full text-[10px] font-bold text-blue-400 uppercase tracking-widest'>
                            v2.4.0(placeholder)
                        </span>
                    </div>

                    <div className='mb-6'>
                        <p className='text-blue-400 text-sm font-bold
                     uppercase tracking-widest mb-2'>
                            Internal Access
                        </p>

                        <h1 className="text-4xl font-bold text-white tracking-tight">
                            Admin Console
                        </h1>
                    </div>

                    <form onSubmit={handleAdminLogin} className='space-y-6 max-w-sm'>
                        {error && (
                            <div className='p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl
                         text-rose-500 text-xs font-medium text-center'>
                                {error}
                            </div>
                        )}

                        <div className='space-y-1 border-b border-slate-800 py-3 
                        focus-within:border-blue-500 transition-all'>
                            <label className='text-[10px] font-bold text-slate-500 uppercase tracking-widest
                            flex items-center gap-2'>
                                <Mail className='h-3 w-3' /> Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='w-full bg-transparent text-white focus:outline-none focus:animate-pulse
                            py-1 text-sm font-medium placeholder:text-slate-700'
                                placeholder="name@fit-ai.com"
                            />
                        </div>

                        <div className='space-y-1 border-b border-slate-800 py-3 
                        focus-within:border-blue-500 transition-all'>
                            <label className='text-[10px] font-bold text-slate-500 uppercase tracking-widest
                            flex items-center gap-2'>
                                <Lock className='h-3 w-3' /> Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='w-full bg-transparent text-white focus:outline-none focus:animate-pulse
                            py-1 text-sm font-medium placeholder:text-slate-700'
                                placeholder="••••••••••••"
                            />
                        </div>

                        <button

                            className="w-full bg-blue-600 hover:bg-blue-500 text-white
                             font-bold py-4 rounded-2xl shadow-2xl shadow-blue-600/20 
                             active:scale-[0.98] transition-all uppercase text-xs
                              tracking-widest flex items-center justify-center gap-2 hover:animate-pulse
                              "
                        >
                            Initialize Session <ChevronRight className='h-4 w-4' />
                        </button>
                    </form>
                </div>

                {/*Right Side*/}
                <div className={`w-full md:w-1/2 h-full flex flex-col p-12 
                    md:p-20 transition-all duration-700
                    ${view === 'public' ? 'opacity-100' :
                        'opacity-0 pointer-events-none translate-x-[40px]'}
                `}>
                    <div className="flex justify-between items-center mb-20">
                        <Image src={fitAiLogo} alt="Fit.AI" width={85} height={40} className="brightness-200 contrast-200" />
                    </div>

                    <div className='mb-6'>
                        <p className='text-blue-400 text-sm font-bold
                     uppercase tracking-widest mb-2'>
                            Public Access
                        </p>

                        <h1 className="text-4xl font-bold text-white tracking-tight">
                            AI Chat Assistant
                        </h1>
                    </div>

                    <div className='flex flex-col justify-center max-w-sm flex-1'>
                        <div className='p-6 bg-slate-950/40 border border-slate-800 
                        rounded-3xl mb-6'>
                            <p className='text-slate-400 text-sm leading-relaxed mb-4'>
                                Chat with Fit.AI for workout feedback, nutrition tips, and fitness guidance.
                                No account required for limited daily sessions.
                            </p>
                            <div className='flex items-center gap-2 text-[10px] font-bold text-blue-500
                            uppercase tracking-widest'>
                                <Activity className='h-4 w-4 text-blue-500' />
                                Status: Online
                            </div>
                        </div>

                        <button
                            onClick={() => router.push('/chat')}
                            className='w-full bg-white hover:bg-slate-100 hover:animate-pulse
                        text-slate-900 font-bold py-4 rounded-2xl flex items-center justify-center gap-3
                        active:scale-[0.98] transition-all uppercase text-xs tracking-widest'
                        >
                            <MessageSquare className='h-4 w-4' /> Start Chat
                        </button>
                    </div>


                </div>
            </div>
        </div>
    )
}