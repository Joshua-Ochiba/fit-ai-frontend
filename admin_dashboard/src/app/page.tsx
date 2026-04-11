"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';

export default function RootPage() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Redirect based on auth status
        if (isAuthenticated) {
            router.push('/dashboard');
        } else {
            router.push('/admin/login');
        }
    }, [isAuthenticated, router]);

    // Simple loading state while redirecting
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <div className="animate-pulse h-8 w-8 bg-blue-600 rounded-full" />
        </div>
    );
}
