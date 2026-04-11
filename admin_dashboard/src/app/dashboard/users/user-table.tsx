"use-client";
import { StatusBadge } from "@/components/ui/status-badge";
import { User } from "@/types/user";
import { ChevronRight, Dumbbell, MessageSquare } from "lucide-react";

interface UserTableProps {
    users: User[];
    onUserClick: (user: User) => void;
}

export function UserTable({ users, onUserClick }: UserTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-800 text-slate-500 text-xs uppercase tracking-wider">
                        <th className="px-6 py-4 font-medium">User</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">Fitness Level</th>
                        <th className="px-6 py-4 font-medium">AI Activity</th>
                        <th className="px-6 py-4 font-medium">Last Active</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-800/50">
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            onClick={() => onUserClick(user)}
                            className="hover:bg-slate-800/30 cursor-pointer transition-colors"
                        >
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-slate-800 border
                                     border-slate-700 flex items-center justify-center text-blue-400 font-bold">
                                        {user.name.charAt(0)}
                                    </div>

                                    <div>
                                        <div className="text-sm font-medium text-white">
                                            {user.name}
                                        </div>

                                        <div className="text-xs text-slate-500">
                                            {user.email}
                                        </div>
                                    </div>
                                </div>
                            </td>

                            <td className="px-6 py-4">
                                <StatusBadge status={user.status} />
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-300">
                                {user.fitnessLevel}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4 text-xs text-slate-400">
                                    <span className="flex items-center gap-1.5">
                                        <Dumbbell className="h-3 w-3" /> {user.workoutsLogged}
                                    </span>

                                    <span className="flex items-center gap-1.5">
                                        <MessageSquare className="h-3 w-3" /> {user.aiInteractions}
                                    </span>
                                </div>
                            </td>

                            <td className="px-6 py-4 text-sm text-slate-500">
                                {user.lastActive}
                            </td>

                            <td className="px-6 py-4 text-right">
                                <ChevronRight className="h-4 w-4 text-slate-700 hover:text-blue-500 transition-colors" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}