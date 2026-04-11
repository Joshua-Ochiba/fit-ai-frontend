"use client";
import { useState } from "react";
import { Settings, Bell, Zap, ShieldCheck, Key } from "lucide-react";
import { useSettings } from "@/context/settings-context";

type SettingsTab = "general" | "ai" | "usage";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<SettingsTab>("general");
    const { settings: globalSettings, updateSettings: saveToGlobal } = useSettings();


    //track if changes were made
    const [isDirty, setIsDirty] = useState(false);


    const tabs = [
        { id: "general", label: "General", icon: Settings },
        { id: "ai", label: "AI Engine", icon: Zap },
        { id: "usage", label: "Usage & Access", icon: Key },
    ] as const;

    const [settings, setSettings] = useState(globalSettings);

    {/* 
        const [settings, setSettings] = useState({
        // General
        platformName: "Fit.AI Admin",
        supportEmail: "support@fit-ai.com",
        publicUrl: "app.fit-ai.com",
        // AI Engine
        model: "gpt-4o",
        tone: "encouraging",
        memoryEnabled: true,
        maxResponseLength: 500,
        // Usage & Access
        dailyMessageLimit: 50,
        publicChatbotEnabled: true,
        registrationsEnabled: true,
        maintenanceMode: false
    });
    */}

    const updateSetting = (field: keyof typeof settings, value: any) => {
        setSettings(prev => ({ ...prev, [field]: value }));
        setIsDirty(true);
    }

    return (
        <div className="max-w-4xl space-y-8 animate-in fade-in duration-500 pb-20">
            <div>
                <h1 className="text-3xl font-bold text-white">System Settings</h1>
                <p className="text-slate-400">Configure global app behavior and AI coaching parameters.</p>
            </div>

            {/*Tab Nav*/}
            <div className="flex gap-1 border-b border-slate-800">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as SettingsTab)}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-medium 
                            transition-all relative
                            ${activeTab === tab.id ? "text-blue-500" : "text-slate-500 hover:text-slate-300"}
                            `}
                    >
                        <tab.icon className="h-4 w-4" />
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
                        )}
                    </button>
                ))}
            </div>

            {/*Tab Content */}
            <div className="bg-slate-900/40 border border-slate-800 
            rounded-2xl p-8 min-h-[400px]">
                {/*General*/}
                {activeTab === "general" && (
                    <div className="space-y-8 max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <section className="space-y-1">
                            <h2 className="text-xl font-semibold text-white">General Configuration</h2>
                            <p className="text-sm text-slate-500">Manage the public identity of your Fit.AI instance.</p>
                        </section>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Platform Name</label>
                                <input
                                    type="text"
                                    value={settings.platformName}
                                    onChange={(e) => updateSetting("platformName", e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Support Email</label>
                                <input
                                    type="email"
                                    value={settings.supportEmail}
                                    onChange={(e) => updateSetting("supportEmail", e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Public Platform URL</label>
                                <div className="flex">
                                    <span className="bg-slate-800 border border-slate-800 
                                    border-r-0 rounded-l-xl px-4 py-3 text-slate-500 text-sm flex items-center">
                                        https://
                                    </span>
                                    <input
                                        type="text"
                                        value={settings.publicUrl}
                                        onChange={(e) => updateSetting("publicUrl", e.target.value)}
                                        className="flex-1 bg-slate-950 border border-slate-800 rounded-r-xl
                                        px-4 py-3 text-slate-200 focus:outline-none focus:ring-2
                                         focus:ring-blue-500/50 transition-all"
                                    />
                                </div>

                            </div>

                        </div>

                    </div>
                )}


                {/*AI Engine Tab */}
                {activeTab === "ai" && (
                    <div className="space-y-8 max-w-2xl 
                    animate-in fade-in slide-in-from-bottom-2
                     duration-300">
                        <section className="space-y-1">
                            <h2 className="text-xl font-semibold text-white">AI Engine</h2>
                            <p className="text-sm text-slate-500">Configure the personality and limitations of the coaching AI.</p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400
                                 uppercase tracking-wider">
                                    Model
                                </label>

                                <select
                                    value={settings.model}
                                    onChange={(e) => updateSetting("model", e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4
                                    py-3 text-slate-200 focus:outline-none focus:ring-2
                                     focus:ring-blue-500/50 transition-all"
                                >
                                    <option value="gpt-4o">GPT-4o (Most Accurate)</option>
                                    <option value="gpt-4-turbo">GPT-4 Turbo</option>
                                    <option value="gpt-3.5-turbo">GPT-3.5 (Faster)</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Response Tone</label>
                                <select
                                    value={settings.tone}
                                    onChange={(e) => updateSetting("tone", e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4
                                    py-3 text-slate-200 focus:outline-none focus:ring-2
                                     focus:ring-blue-500/50 transition-all"
                                >
                                    <option value="encouraging">Encouraging & Friendly</option>
                                    <option value="drill-sergeant">Drill Sergeant (Strict)</option>
                                    <option value="analytical">Analytical & Scientific</option>
                                </select>
                            </div>
                        </div>

                        {/*Memory Toggle*/}
                        <div className="flex items-center justify-between p-4 bg-slate-950/50 border
                        border-slate-800 rounded-xl">
                            <div>
                                <div className="text-sm font-medium text-white">
                                    Enable AI Memory
                                </div>
                                <div className="text-xs text-slate-500">
                                    Allows the AI to remember past coaching sessions.
                                </div>
                            </div>
                            <button
                                onClick={() => updateSetting("memoryEnabled", !settings.memoryEnabled)}
                                className={`w-12 h-6 rounded-full transition-all relative
                                    ${settings.memoryEnabled ? 'bg-blue-600' : 'bg-slate-800'}`}
                            >
                                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full
                                    transition-all ${settings.memoryEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>

                        <div className="space-y-4 pt-4">
                            <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                                <span>Max Response Length</span>
                                <span className="text-blue-400 animate-in">{settings.maxResponseLength} tokens</span>
                            </div>

                            <input
                                type="range"
                                min="100" max="2000" step="100"
                                value={settings.maxResponseLength}
                                onChange={(e) => updateSetting("maxResponseLength", parseInt(e.target.value))}
                                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                        </div>


                    </div>

                )}

                {/*Usage Tab*/}
                {activeTab === "usage" && (
                    <div className="space-y-8 max-w-2xl animate-in fade-in
                             slide-in-from-bottom-2 duration-300">
                        <section className="space-y-1">
                            <h2 className="text-xl font-semibold text-white">Usage & Access</h2>
                            <p className="text-sm text-slate-500">Govern user limits and platform availability.</p>
                        </section>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    Daily Message Limit
                                </label>
                                <input
                                    type="number"
                                    value={settings.dailyMessageLimit}
                                    onChange={(e) => updateSetting("dailyMessageLimit", parseInt(e.target.value))}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl 
                                    px-4 py-3 text-slate-200 focus:outline-none
                                     focus:ring-2 focus:ring-blue-500/50 transition-all"
                                />
                                <p className="text-[10px] text-slate-600 font-medium italic">Standard limit for free-tier gym-goers.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { id: "publicChatbotEnabled", label: "Public Chatbot", desc: "Allow guest access" },
                                    { id: "registrationsEnabled", label: "New Registrations", desc: "Allow signups" },
                                    { id: "maintenanceMode", label: "Maintenance Mode", desc: "Lock platform" },
                                ].map((toggle) => (
                                    <div key={toggle.id} className="flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800 rounded-xl">
                                        <div>
                                            <div className="text-sm font-medium text-white">{toggle.label}</div>
                                            <div className="text-[10px] text-slate-500">{toggle.desc}</div>
                                        </div>
                                        <button
                                            onClick={() => updateSetting(toggle.id as any, !settings[toggle.id as keyof typeof settings])}
                                            className={`w-10 h-5 rounded-full transition-all relative ${settings[toggle.id as keyof typeof settings] ? 'bg-blue-600' : 'bg-slate-800'}`}
                                        >
                                            <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-all ${settings[toggle.id as keyof typeof settings] ? 'translate-x-5' : 'translate-x-0'}`} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Floating "Save" Bar (Only shows if changed) */}
            {isDirty && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 
                bg-blue-600 px-6 py-3 rounded-2xl 
                shadow-2xl flex items-center gap-8 animate-in  fade-in duration-500
                slide-in-from-bottom-4">
                    <span className="text-white text-sm font-medium">You have unsaved changes</span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                saveToGlobal(settings);//pushes local form data to the context (and localStorage)

                                setIsDirty(false);
                            }}
                            className="px-4 py-1.5 text-xs text-white/70 hover:text-white transition-colors"
                        >
                            Discard
                        </button>
                        <button
                            onClick={() => {
                                console.log("Saving Settings:", settings);
                                setIsDirty(false);
                            }}
                            className="bg-white text-blue-600 px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}