import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { LogIn } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const fillDemoCredentials = (email) => {
        setData({
            ...data,
            email: email,
            password: 'password', // Default dummy password
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-emerald-400">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label className="block text-sm font-bold text-gray-200 mb-1.5" htmlFor="email">
                        Email Perusahaan
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-xl border-white/20 bg-black/30 focus:bg-black/50 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all px-4 py-3 text-white placeholder-gray-400 shadow-sm"
                        autoComplete="username"
                        placeholder="nama@perusahaan.com"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1 font-medium">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-200 mb-1.5" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full rounded-xl border-white/20 bg-black/30 focus:bg-black/50 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all px-4 py-3 text-white placeholder-gray-400 shadow-sm"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    {errors.password && <p className="text-red-400 text-xs mt-1 font-medium">{errors.password}</p>}
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer group">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-white/20 bg-black/30 text-emerald-500 shadow-sm focus:ring-emerald-500/20 cursor-pointer group-hover:border-emerald-500 transition-colors"
                        />
                        <span className="ms-2 text-sm text-gray-300 group-hover:text-white transition-colors">Ingat Saya</span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-emerald-400 font-bold hover:underline"
                        >
                            Lupa Password?
                        </Link>
                    )}
                </div>

                <div className="pt-2">
                    <button 
                        type="submit" 
                        disabled={processing}
                        className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-500/20 !py-3.5 text-base font-bold transition-all disabled:opacity-50"
                    >
                        <LogIn className="w-5 h-5" />
                        Log in ke Dashboard
                    </button>
                </div>
                
                {/* TEST ACCOUNT ACCESS (DEMO) */}
                <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="h-px bg-white/20 flex-1"></div>
                        <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                            <span className="text-yellow-400">⚠️</span> Test Account Access (Demo)
                        </p>
                        <div className="h-px bg-white/20 flex-1"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button 
                            type="button" 
                            onClick={() => fillDemoCredentials('admin@example.com')}
                            className="flex flex-col items-center justify-center py-2 px-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg transition-colors group"
                        >
                            <span className="text-xs font-bold text-gray-200 group-hover:text-white">Super Admin</span>
                            <span className="text-[10px] text-gray-400">admin@example.com</span>
                        </button>
                        <button 
                            type="button" 
                            onClick={() => fillDemoCredentials('manager@example.com')}
                            className="flex flex-col items-center justify-center py-2 px-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg transition-colors group"
                        >
                            <span className="text-xs font-bold text-gray-200 group-hover:text-white">IT Manager</span>
                            <span className="text-[10px] text-gray-400">manager@example.com</span>
                        </button>
                        <button 
                            type="button" 
                            onClick={() => fillDemoCredentials('support@example.com')}
                            className="flex flex-col items-center justify-center py-2 px-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg transition-colors group"
                        >
                            <span className="text-xs font-bold text-gray-200 group-hover:text-white">IT Support</span>
                            <span className="text-[10px] text-gray-400">support@example.com</span>
                        </button>
                        <button 
                            type="button" 
                            onClick={() => fillDemoCredentials('staff@example.com')}
                            className="flex flex-col items-center justify-center py-2 px-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg transition-colors group"
                        >
                            <span className="text-xs font-bold text-gray-200 group-hover:text-white">Staff Biasa</span>
                            <span className="text-[10px] text-gray-400">staff@example.com</span>
                        </button>
                    </div>
                </div>

            </form>
        </GuestLayout>
    );
}
