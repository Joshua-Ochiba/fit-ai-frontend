import { AlertCircle, RefreshCcw } from "lucide-react";

interface ErrorStateProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
}

export function ErrorState({
    title = "Something went wrong",
    message = "We couldn't load the data. Please check your connection and try again.",
    onRetry
}: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-in zoom-in-95 duration-300">
            <div className="h-16 w-16 rounded-full bg-rose-500/10 flex items-center justify-center mb-6">
                <AlertCircle className="h-8 w-8 text-rose-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-slate-400 max-w-xs mx-auto mb-8">{message}</p>


            {onRetry && (
                <button
                    onClick={onRetry}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all font-medium border border-slate-700 hover:border-slate-600"
                >
                    <RefreshCcw className="h-4 w-4" />
                    Try Again
                </button>
            )}
        </div>
    )
}