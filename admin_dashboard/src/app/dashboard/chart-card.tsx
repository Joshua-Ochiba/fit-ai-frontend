import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChartCardProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
}

export function ChartCard({ title, description, children, className }: ChartCardProps) {
    return (
        <Card className={`bg-slate-900/50 border-slate-800 shadow-xl 
        ${className}`}>
            <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-white">
                    {title}
                </CardTitle>

                {description && (
                    <CardDescription className="text-slate-500">
                        {description}
                    </CardDescription>
                )}
            </CardHeader>

            <CardContent>
                {children}
            </CardContent>

        </Card>
    )
}