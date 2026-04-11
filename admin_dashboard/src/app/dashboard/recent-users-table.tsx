"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
"@/components/ui/status-badge";
import { User } from "@/types/user";
import { StatusBadge } from "@/components/ui/status-badge";

interface RecentUsersTableProps {
    users: User[];
}

export function RecentUsersTable({ users }: RecentUsersTableProps) {
    return (
        <div>
            <Table>
                <TableHeader className="bg-slate-950/50">
                    <TableRow className="border-slate-800 hover:bg-transparent">
                        <TableHead className="text-slate-400 font-medium">User</TableHead>
                        <TableHead className="text-slate-400 font-medium">Status</TableHead>
                        <TableHead className="text-slate-400 font-medium">Joined</TableHead>
                        <TableHead className="text-slate-400 font-medium">Last Active</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id} className="border-slate-800 hover:bg-slate-800/30 transition-colors">
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9 border border-slate-700">
                                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                                        <AvatarFallback className="bg-slate-800 text-slate-400 text-xs text-center flex items-center justify-center">
                                            {user.name.split('').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex flex-col">
                                        <span className="font-medium text-white text-sm">{user.name}</span>
                                        <span className="text-xs text-slate-500">{user.email}</span>
                                    </div>
                                </div>
                            </TableCell>

                            <TableCell>
                                <StatusBadge status={user.status} />
                            </TableCell>

                            <TableCell>
                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                            </TableCell>

                            <TableCell className="text-sm text-slate-400 font-medium">
                                {user.lastActive}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}