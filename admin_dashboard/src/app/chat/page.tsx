"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useSettings } from '@/context/settings-context';
import { useRouter } from 'next/navigation';
import { Send, User, Bot, ArrowLeft, Activity, Info, AlertTriangle, MessageSquare, Settings, History, Sparkles, Sparkle } from 'lucide-react';
import Image from 'next/image';
import fitAiLogo from '@/assets/fitai.png';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export default function ChatPage() {
    const { settings } = useSettings();
    const router = useRouter();

    //UI Mode
    const [mode, setMode] = useState<'hero' | 'chat'>('hero');
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [messagesSent, setMessagesSent] = useState(0);




    const messagesEndRef = useRef<HTMLDivElement>(null);/******/

    const promptChips = [
        "Create a Fat Loss plan",
        "How do I gain muscle?",
        "Consistent gym habits",
        "Best post-workout meals"
    ];

    const handleSend = async (textOverride?: string) => {
        const messageText = textOverride || input;

        if (!messageText.trim() || isTyping) return;
        if (messagesSent >= settings.dailyMessageLimit) return;

        //triggering transition
        if (mode === 'hero') {
            setMode('chat');
        }

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: messageText.trim(),
            timestamp: new Date()
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        //Mock AI Logic
        setTimeout(() => {
            const aiMessage: Message = {
                id: Date.now().toString(),
                role: 'assistant',
                content: `That's a vital goal. For "${messageText}", the key
                 is tracking volume and ensuring 
                your macros are aligned. Would you like to deep-dive into 
                a specific split?`,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, 2400);

        setMessagesSent(prev => prev + 1);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }

    if (!settings.publicChatbotEnabled) {
        return (
            <div className='min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center'>
                <div>
                    <AlertTriangle className='h-10 w-10 text-blue-500' />
                </div>
            </div>
        );
    }

    return (
        <div className='flex h-screen overflow-hidden bg-slate-950 text-slate-50 font-sans'>
            {/*sidebar*/}
            <aside className='w-16 md:w-20 border-r border-white/5 bg-slate-950 transition-all duration-700
            flex flex-col items-center py-8 gap-8'>
                <div className='flex flex-1 flex-col gap-6 pt-10'>
                    <button className='p-3 bg-blue-600/10 rounded-2xl border border-blue-500/20'>
                        <MessageSquare className='h-5 w-5' />
                    </button>
                    <button className="p-3 text-slate-600 hover:text-slate-300 transition-all">
                        <History className='h-5 w-5' />
                    </button>
                    <button className="p-3 text-slate-600 hover:text-slate-300 transition-all">
                        <Sparkles className='h-5 w-5' />
                    </button>
                </div>

                <button className="p-3 text-slate-600 hover:text-slate-300 transition-all">
                    <Settings className='h-5 w-5' />
                </button>
            </aside>

            {/*Main Content*/}
            <div className='flex flex-1 flex-col'>
                {/*Topbar visible in chat mode */}
                <header className={`h-20 border-b border-white/5 bg-slate-900/40 backdrop-blur-md px-8 flex items-center
                    justify-between top-0 z-50 transition-all duration-700
                    ${mode === 'hero' ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'}`}>
                    <div className='flex items-center gap-4'>
                        <Image src={fitAiLogo} alt='Fit.AI' width={80} height={40} className='brightness-200' />
                        <span className='h-4 w-px bg-white/10 mx-2' />
                        <span className='text-[10px] font-bold text-slate-500 uppercase tracking-widest'>
                            Public Coach Active
                        </span>
                    </div>

                    <div className='flex items-center gap-3 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full'>
                        <div className='w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping' />
                        <span className='text-[9px] font-bold text-blue-400 uppercase tracking-widest'>
                            Online
                        </span>
                    </div>
                </header>

                <main className='flex flex-col items-center overflow-hidden flex-1 relative'>
                    {/*Hero View*/}
                    <div className={`absolute inset-0 flex flex-col items-center justify-center p-6
                    transition-all duration-1000 ease-out z-10 pointer-events-none
                    ${mode === 'chat' ? 'opacity-0 scale-90 translate-y-[20%]'
                            : 'opacity-100 scale-100'}
                    `}>
                        <Image src={fitAiLogo} alt='Fit.AI' width={180} height={90}
                            className='brightness-200 mb-8 animate-pulse'
                        />
                        <h1 className='text-4xl font-bold text-center mb-12 tracking-tight'>
                            How can <span className="text-blue-500">Fit.AI help?</span>
                        </h1>

                        {/**Prompt cards*/}
                        <div className="flex justify-center gap-3 max-w-xl animate-in 
                        fade-in slide-in-from-bottom-4 duration-1000">
                            {promptChips.map((chip, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSend(chip)}
                                    className='px-5 py-2.5 rounded-full bg-slate-900 border border-slate-800 text-xs
                                    font-medium text-slate-400 hover:border-blue-500/50 hover:text-white duration-300
                                    hover:bg-slate-800 transition-all hover:scale-110 pointer-events-auto'
                                >
                                    {chip}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/*Conversation View*/}
                    <div className={`flex-1 max-w-5xl overflow-y-auto w-full py-12 px-6 space-y-8 scroll-smooth scrollbar-hide transition-all duration-700
                        ${mode === 'hero' ? 'opacity-0 translate-y-20 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex gap-5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div
                                    className={`h-10 w-10 min-w-[40px] rounded-xl flex items-center justify-center border
                                        ${msg.role === 'assistant' ? 'bg-blue-600 border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.25)]'
                                            :
                                            'bg-slate-800 border-slate-700'}`}
                                >
                                    {msg.role === 'assistant' ? <Sparkle className="h-5 w-5" /> : <User className="h-5 w-5" />}
                                </div>

                                <div className={`p-4 rounded-xl border text-sm leading-relaxed max-w-[75%]
                                ${msg.role === 'assistant' ? 'bg-slate-950 border-white/5 text-slate-300 rounded-tl-none mt-5' : ''}
                                `}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className='flex gap-5 animate-pulse'>
                                <div className='h-10 w-10 bg-blue-600/20 rounded-xl 
                            flex items-center justify-center border-blue-500/20'>
                                    <Sparkles className='h-4 w-4 text-blue-500' />
                                </div>

                                {/*Dots*/}
                                <div className='p-4 bg-slate-950 border border-white/5 rounded-3xl rounded-tl-none flex
                                gap-1 h-12 items-center'>
                                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100" />
                                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200" />
                                </div>
                            </div>

                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </main>

                {/*Input Bar (universally visible)*/}
                <footer className={`px-6 py-10 transition-all duration-1000 flex flex-col items-center gap-4 relative z-[100]
                ${mode === 'hero' ? 'bg-transparent' : 'border-t border-white/5 bg-slate-950/50 backdrop-blur-xl'}`}>
                    <div className={`w-full max-w-2xl transition-all duration-700
                        ${mode === 'hero' ? 'scale-110 translate-y-[-10%]' : 'translate-y-0 scale-100'}`}>
                        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                            className='group relative'
                        >
                            <div className='absolute -inset-0.5 bg-blue-500 opacity-0 group-focus-within:opacity-10
                            rounded-3xl blur transition-all duration-500 pointer-events-none'/>
                            <textarea

                                rows={1}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={messagesSent >= (settings.dailyMessageLimit || 50)}
                                onKeyDown={handleKeyDown}
                                placeholder={(messagesSent >= (settings.dailyMessageLimit || 50)) ? "Daily Limit Reached" : "Message Fit.AI"}
                                className={`w-full bg-slate-900 border border-slate-800 rounded-3xl px-6 py-3
                                text-sm focus:outline-none focus:border-blue-500/50 transition-all
                                 placeholder:text-slate-600 group-hover:border-slate-700  overflow-y-auto scrollbar-hide
                                 ${messagesSent >= (settings.dailyMessageLimit || 50) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            />

                            <button
                                type='submit'
                                disabled={!input.trim()}
                                className='absolute right-4 top-1 p-2.5 bg-blue-600 hover:bg-blue-500
                                text-white rounded-2xl transition-all disabled:opacity-10 
                                shadow-xl active:scale-85 hover:scale-105'
                            >
                                <Send className='h-4 w-4' />
                            </button>
                        </form>
                    </div>

                    {mode === 'chat' && (
                        <div className='flex flex-col items-center'>
                            <p className="text-[9px] font-bold text-slate-700 uppercase tracking-[4px]">
                                Please double check responses.
                            </p>
                        </div>

                    )}
                </footer>
            </div>
        </div>
    )
}