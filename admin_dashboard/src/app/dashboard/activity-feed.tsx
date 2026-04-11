import { ActivityItem } from "@/types/activity";
import { UserPlus, Dumbbell, AlertCircle, RefreshCw } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const iconMap = {
    signup: { icon: UserPlus, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    workout: { icon: Dumbbell, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    alert: { icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    update: { icon: RefreshCw, color: 'text-amber-500', bg: 'bg-amber-500/10' }
};

interface ActivityFeedProps {
    activities: ActivityItem[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
    return (
        <div className="space-y-6 relative before:absolute
         before:inset-0 before:ml-5 before:-translate-x-px
          before:h-full before:w-0.5 before:bg-gradient-to-b 
          before:from-slate-800 
         before:via-slate-800 before:to-transparent
        ">
            {activities.map((item, index) => {
                const IconConfig = iconMap[item.type];
                return (
                    <div key={item.id} className="relative flex items-start gap-4 group">

                        <div className="relative z-10 flex 
                        h-10 w-10 shrink-0 items-center justify-center
                        rounded-full border border-slate-800 bg-slate-950 ring-4 ring-slate-950 transition-transform
                        group-hover:scale-110">
                            <div className={`absolute inset-0 rounded-full  ${IconConfig.bg}`} />
                            <IconConfig.icon className={`relative z-10 h-5 w-5 ${IconConfig.color}`} />
                        </div>

                        {/*Content*/}
                        <div className="flex flex-1 flex-col gap-1 pt-0.5">
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <Avatar>
                                        <AvatarImage src={item.user.avatarUrl} />
                                        <AvatarFallback className="text-[8px] bg-slate-800">
                                            {item.user.name[0]}
                                        </AvatarFallback>
                                    </Avatar>

                                    <p className="text-sm font-medium text-white">
                                        {item.user.name} <span className="font-normal text-slate-500">{item.action}</span>
                                    </p>
                                </div>

                                <time className="text-[10px] whitespace-nowrap 
                                               font-medium text-slate-600
                                                uppercase tracking-tighter">
                                    {item.timestamp}
                                </time>
                            </div>

                            {item.metadata && (
                                <div className="mt-1 rounded-lg bg-slate-900/50 px-3 py-2 border border-slate-800/50">
                                    <p className="text-xs text-blue-400 font-medium italic">
                                        {item.metadata}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}