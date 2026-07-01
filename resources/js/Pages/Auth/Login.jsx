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
        setData({ email: email, password: 'password123', remember: false });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-1.5" htmlFor="email">
                        Email Perusahaan
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-xl border-gray-200 bg-background/50 focus:bg-white focus:border-primary focus:ring-primary/20 transition-all px-4 py-3 text-foreground shadow-sm"
                        autoComplete="username"
                        placeholder="nama@perusahaan.com"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold text-foreground mb-1.5" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full rounded-xl border-gray-200 bg-background/50 focus:bg-white focus:border-primary focus:ring-primary/20 transition-all px-4 py-3 text-foreground shadow-sm"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>}
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer group">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-gray-300 text-primary shadow-sm focus:ring-primary/20 cursor-pointer group-hover:border-primary transition-colors"
                        />
                        <span className="ms-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">Ingat Saya</span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-primary font-bold hover:underline"
                        >
                            Lupa Password?
                        </Link>
                    )}
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex items-center justify-center gap-2 btn-primary shadow-lg shadow-primary/20 !py-3.5 text-base"
                    >
                        <LogIn className="w-5 h-5" />
                        Log in ke Dashboard
                    </button>
                </div>

                {/* Demo account quick-fill buttons */}
                <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center mb-3 flex items-center justify-center gap-1.5">
                        <span>⚡</span> Akun Demo — Klik untuk mengisi otomatis
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                        <button
                            type="button"
                            onClick={() => fillDemoCredentials('admin.it@perusahaan.com')}
                            className="flex flex-col items-center justify-center py-2.5 px-2 bg-primary/5 hover:bg-primary/15 border border-primary/20 hover:border-primary/50 rounded-xl transition-all group"
                        >
                            <span className="text-xs font-bold text-primary">IT Support</span>
                            <span className="text-[10px] text-muted-foreground mt-0.5">admin.it</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => fillDemoCredentials('hrd@perusahaan.com')}
                            className="flex flex-col items-center justify-center py-2.5 px-2 bg-primary/5 hover:bg-primary/15 border border-primary/20 hover:border-primary/50 rounded-xl transition-all group"
                        >
                            <span className="text-xs font-bold text-primary">HRD</span>
                            <span className="text-[10px] text-muted-foreground mt-0.5">hrd</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => fillDemoCredentials('andi.staff@perusahaan.com')}
                            className="flex flex-col items-center justify-center py-2.5 px-2 bg-primary/5 hover:bg-primary/15 border border-primary/20 hover:border-primary/50 rounded-xl transition-all group"
                        >
                            <span className="text-xs font-bold text-primary">Karyawan</span>
                            <span className="text-[10px] text-muted-foreground mt-0.5">andi.staff</span>
                        </button>
                    </div>
                    <p className="text-center text-[10px] text-muted-foreground mt-2">
                        Password semua akun: <span className="font-mono font-bold text-foreground">password123</span>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
