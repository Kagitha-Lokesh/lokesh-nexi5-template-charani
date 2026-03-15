import { useState, useRef, useEffect } from 'react';
import {
    Send, Search, Bell, BellOff, CheckCheck, X, ChevronRight,
    Clock, MessageSquare, Users, AlertTriangle, CheckCircle2,
    User, Briefcase, FileText, Settings, PlusCircle, Filter,
    MoreVertical, Phone, Video, Paperclip, Smile, Info
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { conversations, initialNotifications } from '@/datasets/hrhead/hrChatData';

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HRChat() {
    const { isDarkMode } = useTheme();

    const [activeConv, setActiveConv] = useState(conversations[0]);
    const [messagesByConv, setMessagesByConv] = useState(
        Object.fromEntries(conversations.map(c => [c.id, c.messages]))
    );
    const [input, setInput] = useState('');
    const [convSearch, setConvSearch] = useState('');
    const [notifSearch, setNotifSearch] = useState('');
    const [notifications, setNotifications] = useState(initialNotifications);
    const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'notifications'
    const [unreadMap, setUnreadMap] = useState(Object.fromEntries(conversations.map(c => [c.id, c.unread])));
    const msgEndRef = useRef(null);

    useEffect(() => {
        msgEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activeConv, messagesByConv]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        setMessagesByConv(prev => ({
            ...prev,
            [activeConv.id]: [...(prev[activeConv.id] || []), { from: 'me', text: input.trim(), time: new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }) }]
        }));
        setInput('');
    };

    const openConv = (conv) => {
        setActiveConv(conv);
        setUnreadMap(prev => ({ ...prev, [conv.id]: 0 }));
    };

    const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    const dismissNotif = (id) => setNotifications(prev => prev.filter(n => n.id !== id));

    const filteredConvs = conversations.filter(c =>
        !convSearch || c.name.toLowerCase().includes(convSearch.toLowerCase())
    );
    const filteredNotifs = notifications.filter(n =>
        !notifSearch || n.title.toLowerCase().includes(notifSearch.toLowerCase()) || n.desc.toLowerCase().includes(notifSearch.toLowerCase())
    );
    const unreadCount = notifications.filter(n => !n.read).length;
    const totalUnreadMsgs = Object.values(unreadMap).reduce((a, b) => a + b, 0);

    const cardClass = `rounded-xl border ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`;
    const headingClass = `font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`;

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col gap-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>

            {/* 1. Section Title */}
            <div className="flex items-center justify-between mt-2 gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                    <h2 className={`text-xl font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-dark'}`}>HR Chat &amp; Notifications</h2>
                    {totalUnreadMsgs > 0 && <span className="px-2 py-0.5 rounded-full bg-primary text-white text-xs font-bold">{totalUnreadMsgs}</span>}
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={markAllRead} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs border transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200' : 'bg-white border-gray-200 hover:shadow-sm text-dark'}`}>
                        <CheckCheck size={14} />
                        Mark All Read
                    </button>
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs text-white transition-all active:scale-95 shadow-md ${isDarkMode ? 'bg-[#3ec3ff] hover:bg-[#3ec3ff]/90' : 'bg-primary hover:bg-blue-700'}`}>
                        <PlusCircle size={14} />
                        New Message
                    </button>
                </div>
            </div>

            {/* 2. Tab Toggle */}
            <div className={`flex items-center p-1 gap-1 rounded-xl self-start ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                {[{ key: 'chat', label: 'Messages', icon: MessageSquare, badge: totalUnreadMsgs },
                    { key: 'notifications', label: 'Notifications', icon: Bell, badge: unreadCount }].map(tab => (
                    <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab.key ? (isDarkMode ? 'bg-[#3ec3ff]/20 text-[#3ec3ff]' : 'bg-white shadow-sm text-primary') : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-dark')}`}>
                        <tab.icon size={15} />
                        {tab.label}
                        {tab.badge > 0 && <span className="px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold">{tab.badge}</span>}
                    </button>
                ))}
            </div>

            {/* 3. CHAT PANEL */}
            {activeTab === 'chat' && (
                <div className={`grid grid-cols-1 lg:grid-cols-3 gap-0 overflow-hidden rounded-xl border ${isDarkMode ? 'border-white/10 shadow-xl' : 'border-borderColor shadow-sm'}`} style={{ minHeight: 560 }}>

                    {/* Sidebar — Conversation List */}
                    <div className={`flex flex-col border-r ${isDarkMode ? 'bg-[#0c162d]/70 border-white/10' : 'bg-gray-50 border-borderColor'}`}>
                        <div className={`p-4 border-b ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
                                <Search size={14} className="text-gray-400 shrink-0" />
                                <input className="bg-transparent outline-none w-full text-sm placeholder-gray-400" placeholder="Search messages..." value={convSearch} onChange={e => setConvSearch(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {filteredConvs.map(conv => {
                                const unread = unreadMap[conv.id] || 0;
                                const isActive = activeConv?.id === conv.id;
                                return (
                                    <button key={conv.id} onClick={() => openConv(conv)} className={`w-full text-left p-4 border-b transition-all flex items-start gap-3 ${isDarkMode ? 'border-white/5' : 'border-borderColor'} ${isActive ? (isDarkMode ? 'bg-[#3ec3ff]/10' : 'bg-blue-50') : (isDarkMode ? 'hover:bg-white/5' : 'hover:bg-white')}`}>
                                        <div className="relative shrink-0">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-headings text-sm ${conv.color}`}>{conv.avatar}</div>
                                            {conv.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-[#0c162d]" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-1">
                                                <p className={`font-semibold text-sm truncate ${isDarkMode ? 'text-white' : 'text-dark'}`}>{conv.name}</p>
                                                <span className="text-[10px] text-gray-400 shrink-0">{conv.time}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 truncate mt-0.5">{conv.lastMsg}</p>
                                        </div>
                                        {unread > 0 && <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">{unread}</span>}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Chat Window */}
                    <div className={`lg:col-span-2 flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50' : 'bg-white'}`}>
                        {/* Chat Header */}
                        {activeConv && (
                            <>
                                <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-headings text-sm ${activeConv.color}`}>{activeConv.avatar}</div>
                                            {activeConv.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-[#0c162d]" />}
                                        </div>
                                        <div>
                                            <p className={`font-bold font-headings text-sm ${isDarkMode ? 'text-white' : 'text-dark'}`}>{activeConv.name}</p>
                                            <p className="text-xs text-emerald-500 font-semibold">{activeConv.online ? 'Online' : 'Offline'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {[Phone, Video, Info, MoreVertical].map((Icon, i) => (
                                            <button key={i} className={`p-2 rounded-lg transition-all ${isDarkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}><Icon size={16} /></button>
                                        ))}
                                    </div>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: 380 }}>
                                    {(messagesByConv[activeConv.id] || []).map((msg, i) => (
                                        <div key={i} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                                            {msg.from === 'them' && (
                                                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mr-2 mt-1 ${activeConv.color}`}>{activeConv.avatar}</div>
                                            )}
                                            <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${msg.from === 'me' ? (isDarkMode ? 'bg-[#3ec3ff] text-[#0c162d] rounded-br-sm' : 'bg-primary text-white rounded-br-sm') : (isDarkMode ? 'bg-white/10 text-gray-200 rounded-bl-sm' : 'bg-gray-100 text-gray-800 rounded-bl-sm')}`}>
                                                <p className="leading-snug">{msg.text}</p>
                                                <p className={`text-[10px] mt-1 text-right ${msg.from === 'me' ? 'opacity-70' : 'text-gray-400'}`}>{msg.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={msgEndRef} />
                                </div>

                                {/* Input */}
                                <form onSubmit={sendMessage} className={`p-4 border-t flex items-center gap-3 ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                                    <button type="button" className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}><Paperclip size={16} /></button>
                                    <input
                                        className={`flex-1 px-4 py-2.5 rounded-xl border outline-none text-sm transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-[#3ec3ff]' : 'bg-gray-50 border-gray-200 text-dark placeholder-gray-400 focus:border-primary'}`}
                                        placeholder="Type a message..."
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                    />
                                    <button type="button" className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}><Smile size={16} /></button>
                                    <button type="submit" disabled={!input.trim()} className={`p-2.5 rounded-xl transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${isDarkMode ? 'bg-[#3ec3ff] text-[#0c162d] hover:bg-[#3ec3ff]/90' : 'bg-primary text-white hover:bg-blue-700'}`}>
                                        <Send size={16} />
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* 4. NOTIFICATIONS PANEL */}
            {activeTab === 'notifications' && (
                <div className="flex flex-col gap-4">
                    {/* Search + Filter bar */}
                    <div className="flex items-center gap-3 flex-wrap">
                        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border flex-1 min-w-48 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
                            <Search size={14} className="text-gray-400 shrink-0" />
                            <input className="bg-transparent outline-none w-full text-sm placeholder-gray-400" placeholder="Search notifications..." value={notifSearch} onChange={e => setNotifSearch(e.target.value)} />
                        </div>
                        <div className="flex items-center gap-1">
                            {['All', 'Unread', 'Approval', 'Alert'].map(f => (
                                <button key={f} className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-600'}`}>{f}</button>
                            ))}
                        </div>
                    </div>

                    {/* Notifications List */}
                    <div className="space-y-3">
                        {filteredNotifs.map(notif => (
                            <div key={notif.id} className={`${cardClass} flex items-start gap-4 p-4 transition-all hover:-translate-y-0.5 duration-200 ${!notif.read ? (isDarkMode ? 'border-[#3ec3ff]/20' : 'border-blue-200') : ''}`}>
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${notif.bg}`}>
                                    <notif.icon size={18} className={notif.color} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <p className={`font-bold text-sm font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>{notif.title}
                                                {!notif.read && <span className="ml-2 inline-flex w-2 h-2 bg-primary rounded-full align-middle" />}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-0.5 leading-snug">{notif.desc}</p>
                                        </div>
                                        <button onClick={() => dismissNotif(notif.id)} className={`p-1 rounded-md transition-all shrink-0 mt-0.5 ${isDarkMode ? 'hover:bg-white/10 text-gray-500 hover:text-gray-300' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'}`}><X size={14} /></button>
                                    </div>
                                    <div className="flex items-center gap-3 mt-2">
                                        <span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={11} /> {notif.time}</span>
                                        {!notif.read && (
                                            <button onClick={() => setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n))} className={`text-xs font-bold ${isDarkMode ? 'text-[#3ec3ff] hover:text-[#3ec3ff]/80' : 'text-primary hover:text-blue-700'}`}>
                                                Mark as read
                                            </button>
                                        )}
                                        <button className={`text-xs font-bold ml-auto ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-dark'}`}>View</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {filteredNotifs.length === 0 && (
                            <div className={`${cardClass} p-12 text-center`}>
                                <BellOff size={40} className="mx-auto text-gray-400 mb-3" />
                                <p className="text-gray-400 font-semibold">No notifications found</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* 5. Quick Actions */}
            <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <div className="flex items-center justify-between mb-5">
                    <h3 className={headingClass}>Quick Actions</h3>
                    <Settings size={18} className={isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                        { label: 'View All Messages', icon: MessageSquare, color: 'text-blue-500', onClick: () => setActiveTab('chat') },
                        { label: 'All Notifications', icon: Bell, color: 'text-amber-500', onClick: () => setActiveTab('notifications') },
                        { label: 'Notification Settings', icon: Settings, color: 'text-violet-500', onClick: () => {} },
                        { label: 'Mark All Read', icon: CheckCheck, color: 'text-emerald-500', onClick: markAllRead },
                    ].map((btn, i) => (
                        <button key={i} onClick={btn.onClick} className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-sm font-semibold active:scale-95 hover:-translate-y-0.5 duration-200 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md'}`}>
                            <btn.icon size={17} className={btn.color} />
                            <span className="leading-tight text-left">{btn.label}</span>
                            <ChevronRight size={13} className="ml-auto text-gray-400 shrink-0" />
                        </button>
                    ))}
                </div>
            </div>

            <div className={`py-6 text-center mt-auto border-t ${isDarkMode ? 'border-white/5' : 'border-borderColor/50'}`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Copyright © NEXI5 HRM Portal</p>
            </div>
        </div>
    );
}
