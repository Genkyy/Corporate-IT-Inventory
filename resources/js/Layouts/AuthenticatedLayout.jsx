import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    MonitorSmartphone, 
    Ticket, 
    Network, 
    Users, 
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    Search
} from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const navigationAll = [
        { name: 'Dashboard', href: route('dashboard'), icon: LayoutDashboard, active: route().current('dashboard'), roles: ['IT Support', 'HRD', 'Karyawan'] },
        { name: 'Master Data', href: route('master.index'), icon: Settings, active: route().current('master.*'), roles: ['IT Support'] },
        { name: 'Asset Management', href: route('assets.index'), icon: MonitorSmartphone, active: route().current('assets.*'), roles: ['IT Support'] },
        { name: 'IT Helpdesk', href: route('helpdesk.index'), icon: Ticket, active: route().current('helpdesk.*'), roles: ['IT Support', 'Karyawan'] },
        { name: 'Network & License', href: route('network.index'), icon: Network, active: route().current('network.*'), roles: ['IT Support'] },
        { name: 'Employee Lifecycle', href: route('employee.index'), icon: Users, active: route().current('employee.*'), roles: ['IT Support', 'HRD'] },
    ];

    const hasRole = (allowedRoles) => {
        if (!user || !user.roles) return false;
        return allowedRoles.some(role => user.roles.includes(role));
    };

    const navigation = navigationAll.filter(item => hasRole(item.roles));

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar Desktop */}
            <aside className="hidden md:flex flex-col w-64 bg-card border-r border-gray-100 h-screen sticky top-0">
                <div className="p-6">
                    <h1 className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
                        <MonitorSmartphone className="w-6 h-6" />
                        CorpIT-Hub
                    </h1>
                </div>
                <nav className="flex-1 px-4 space-y-2 overflow-y-auto mt-4">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                                item.active
                                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                                    : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground hover:translate-x-1'
                            }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-100">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-sm font-semibold text-red-500 hover:bg-red-50 hover:translate-x-1 transition-all duration-300"
                    >
                        <LogOut className="w-5 h-5" />
                        Log Out
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-[72px] bg-card/70 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <button 
                            className="md:hidden text-muted-foreground hover:text-foreground"
                            onClick={() => setShowingNavigationDropdown(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        
                        <div className="hidden md:flex items-center bg-background rounded-full px-4 py-2 border border-gray-100 focus-within:border-primary/30 focus-within:bg-white focus-within:shadow-sm transition-all duration-300 w-80">
                            <Search className="w-4 h-4 text-muted-foreground mr-2" />
                            <input 
                                type="text" 
                                placeholder="Cari aset atau tiket..." 
                                className="bg-transparent border-none focus:ring-0 text-sm w-full p-0 text-foreground placeholder:text-muted-foreground/70"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <button className="relative p-2 text-muted-foreground hover:bg-secondary/50 rounded-full transition-all hover:scale-105">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full border border-card"></span>
                        </button>
                        <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shadow-sm cursor-pointer hover:scale-105 transition-transform">
                            {user?.name?.charAt(0) || 'A'}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 p-4 md:p-8 overflow-x-hidden">
                    {header && (
                        <div className="mb-8">
                            {header}
                        </div>
                    )}
                    {children}
                </div>
            </main>

            {/* Mobile Sidebar Overlay */}
            {showingNavigationDropdown && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setShowingNavigationDropdown(false)}></div>
                    <aside className="relative w-72 bg-card h-full flex flex-col shadow-2xl">
                        <div className="p-6 flex items-center justify-between">
                            <h1 className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
                                <MonitorSmartphone className="w-6 h-6" />
                                CorpIT
                            </h1>
                            <button onClick={() => setShowingNavigationDropdown(false)} className="p-2 hover:bg-secondary rounded-full">
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                        </div>
                        <nav className="flex-1 px-4 space-y-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold ${
                                        item.active ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:bg-secondary'
                                    }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </aside>
                </div>
            )}
        </div>
    );
}
