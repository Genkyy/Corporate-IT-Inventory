import { Link } from '@inertiajs/react';
import { MonitorSmartphone } from 'lucide-react';

export default function GuestLayout({ children }) {
    return (
        <div 
            className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 relative overflow-hidden"
            style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1506744626753-1fa44df31c2a?q=80&w=2070&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

            <div className="z-10 text-center mb-8">
                <Link href="/" className="inline-flex items-center gap-3 justify-center mb-4">
                    <div className="p-3 bg-emerald-500 rounded-2xl text-white shadow-lg shadow-emerald-500/30">
                        <MonitorSmartphone className="w-8 h-8" />
                    </div>
                    <span className="text-3xl font-bold tracking-tight text-white drop-shadow-md">CorpIT-Hub</span>
                </Link>
                <p className="text-gray-200 font-medium drop-shadow-md">Sistem Manajemen Aset IT Perusahaan</p>
            </div>

            <div className="w-full sm:max-w-md mt-2 px-8 py-10 bg-black/40 backdrop-blur-xl shadow-2xl border border-white/10 rounded-[2rem] z-10 relative overflow-hidden">
                {/* Glossy top edge highlight */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50"></div>
                {children}
            </div>
        </div>
    );
}
