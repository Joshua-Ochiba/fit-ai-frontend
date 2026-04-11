"use client";
import { useEffect, useState } from "react";
import { UserService, UserFilters } from "@/services/user-service";
import { User } from "@/types/user";
import { UserFilterBar } from "./user-filters";
import { UserTable } from "./user-table";
import { UserDetailsDrawer } from "./user-details-drawer";


export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);

    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const [filters, setFilters] = useState<UserFilters>({
        search: "",
        page: 1,
    });

    const handleFilterChange = (key: keyof UserFilters, value: string | number) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
            page: 1 //Always reset to page 1 when filtering! Crucial
        }));
    }

    //Data fetch pipeline
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await UserService.getUsers(filters);
                setUsers(data.users);
                setTotalCount(data.totalCount);
            }
            catch (err) {
                console.error("Failed to fetch users", err);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [filters]);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center 
            justify-between gap-4">

                <div>
                    <h1 className="text-3xl font-bold text-white pb-3">User Management</h1>
                    <p className="text-slate-400">Monitor engagement and AI coaching performance</p>
                </div>

            </div>

            {/*Filter Bar*/}
            <UserFilterBar onFilterChange={handleFilterChange} currentFilters={filters} />


            {/*User Table*/}
            <div className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden">
                {isLoading ? (
                    <div className="p-20 text-center text-slate-500">
                        <div className="animate-pulse flex flex-col items-center gap-3">
                            <div className="h-8 w-32 bg-slate-800 rounded-lg" />
                            <span>Fetching records...</span>
                        </div>
                    </div>
                ) : (
                    <UserTable
                        users={users}
                        onUserClick={(user) => setSelectedUser(user)}
                    />
                )}
            </div>
            <UserDetailsDrawer
                user={selectedUser}
                onClose={() => setSelectedUser(null)}
            />
        </div>

    );
}