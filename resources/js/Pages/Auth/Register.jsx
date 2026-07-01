import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { UserPlus } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Daftar Akun" />

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-1.5" htmlFor="name">
                        Nama Lengkap
                    </label>
                    <input
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full rounded-xl border-gray-200 bg-background/50 focus:bg-white focus:border-primary focus:ring-primary/20 transition-all px-4 py-2.5 text-foreground shadow-sm"
                        autoComplete="name"
                        placeholder="Budi Santoso"
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold text-foreground mb-1.5" htmlFor="email">
                        Email Perusahaan
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-xl border-gray-200 bg-background/50 focus:bg-white focus:border-primary focus:ring-primary/20 transition-all px-4 py-2.5 text-foreground shadow-sm"
                        autoComplete="username"
                        placeholder="nama@perusahaan.com"
                        onChange={(e) => setData('email', e.target.value)}
                        required
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
                        className="mt-1 block w-full rounded-xl border-gray-200 bg-background/50 focus:bg-white focus:border-primary focus:ring-primary/20 transition-all px-4 py-2.5 text-foreground shadow-sm"
                        autoComplete="new-password"
                        placeholder="••••••••"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold text-foreground mb-1.5" htmlFor="password_confirmation">
                        Konfirmasi Password
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full rounded-xl border-gray-200 bg-background/50 focus:bg-white focus:border-primary focus:ring-primary/20 transition-all px-4 py-2.5 text-foreground shadow-sm"
                        autoComplete="new-password"
                        placeholder="••••••••"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    {errors.password_confirmation && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password_confirmation}</p>}
                </div>

                <div className="pt-4 border-t border-gray-100 mt-6">
                    <button 
                        type="submit" 
                        disabled={processing}
                        className="w-full flex items-center justify-center gap-2 btn-primary shadow-lg shadow-primary/20 !py-3 text-base"
                    >
                        <UserPlus className="w-5 h-5" />
                        Buat Akun
                    </button>
                </div>
                
                <div className="text-center pt-2">
                    <p className="text-sm text-muted-foreground">
                        Sudah punya akun?{' '}
                        <Link href={route('login')} className="text-primary font-bold hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
