import { Link } from '@inertiajs/react';
import { MonitorSmartphone } from 'lucide-react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-background relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>

            <div className="z-10 text-center mb-8">
                <Link href="/" className="inline-flex items-center gap-3 justify-center mb-4">
                    <div className="p-3 bg-primary rounded-2xl text-white shadow-lg shadow-primary/30">
                        <MonitorSmartphone className="w-8 h-8" />
                    </div>
                    <span className="text-3xl font-bold tracking-tight text-primary">CorpIT-Hub</span>
                </Link>
                <p className="text-muted-foreground font-medium">Sistem Manajemen Aset IT Perusahaan</p>
            </div>

            <div className="w-full sm:max-w-md mt-2 px-8 py-10 bg-white/70 backdrop-blur-xl shadow-2xl border border-white rounded-[2rem] z-10 relative overflow-hidden">
                {/* Glossy top edge highlight */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>
                {children}
            </div>
        </div>
    );
}
