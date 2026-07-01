import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import {
    Users, UserPlus, UserMinus, ArrowRight, ChevronRight,
    CheckCircle2, Circle, Monitor, Mail, Wifi, Shield, Package, X
} from 'lucide-react';

const onboardingSteps = [
    { key: 'ip_allocated', label: 'Alokasi IP Address', icon: Wifi, desc: 'Daftarkan IP statis ke IPAM' },
    { key: 'os_installed', label: 'Instalasi OS & Driver', icon: Monitor, desc: 'Setup OS dan driver perangkat' },
    { key: 'email_created', label: 'Buat Email Perusahaan', icon: Mail, desc: 'Buat akun email aktif karyawan' },
    { key: 'software_installed', label: 'Instalasi Software', icon: Package, desc: 'Install software kerja standar' },
    { key: 'asset_handed_over', label: 'Serah Terima Aset', icon: Monitor, desc: 'Tanda tangani dokumen serah terima' },
    { key: 'access_granted', label: 'Berikan Akses Sistem', icon: Shield, desc: 'Setup role di aplikasi internal' },
];

const offboardingSteps = [
    { key: 'assets_returned', label: 'Kumpulkan Aset', icon: Package, desc: 'Tarik laptop, HP, dan perangkat lain' },
    { key: 'data_backed_up', label: 'Backup Data Karyawan', icon: Monitor, desc: 'Simpan data kerja ke server' },
    { key: 'email_deactivated', label: 'Nonaktifkan Email', icon: Mail, desc: 'Blokir akses email perusahaan' },
    { key: 'vpn_revoked', label: 'Cabut Akses VPN', icon: Wifi, desc: 'Hapus profil VPN karyawan' },
    { key: 'server_access_revoked', label: 'Cabut Akses Server', icon: Shield, desc: 'Hapus user dari semua server' },
    { key: 'software_access_revoked', label: 'Cabut Lisensi Software', icon: Package, desc: 'Dealokasi seat lisensi yang digunakan' },
];

function ChecklistModal({ type, onClose }) {
    const steps = type === 'onboarding' ? onboardingSteps : offboardingSteps;
    const [checked, setChecked] = useState({});
    const [employee, setEmployee] = useState('');
    const [saved, setSaved] = useState(false);

    const toggle = (key) => setChecked(prev => ({ ...prev, [key]: !prev[key] }));
    const progress = Math.round((Object.values(checked).filter(Boolean).length / steps.length) * 100);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => { setSaved(false); onClose(); }, 1800);
    };

    const isOnboarding = type === 'onboarding';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg z-10 max-h-[90vh] flex flex-col">
                <div className={`flex items-center justify-between p-6 rounded-t-2xl ${isOnboarding ? 'bg-primary' : 'bg-red-600'} text-white`}>
                    <div>
                        <h3 className="text-xl font-bold">{isOnboarding ? '🟢 Onboarding' : '🔴 Offboarding'} Checklist</h3>
                        <p className="text-sm opacity-80 mt-0.5">Progres: {progress}%</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {saved ? (
                    <div className="p-10 text-center">
                        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-8 h-8 text-success" />
                        </div>
                        <h4 className="font-bold text-xl mb-1">Checklist Disimpan!</h4>
                        <p className="text-muted-foreground text-sm">Status proses telah berhasil diperbarui.</p>
                    </div>
                ) : (
                    <>
                        <div className="p-6 border-b border-gray-100">
                            {/* Progress bar */}
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${isOnboarding ? 'bg-primary' : 'bg-red-500'}`}
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <label className="block text-sm font-bold mb-1.5">Nama Karyawan</label>
                            <input
                                type="text"
                                className="w-full rounded-xl border-gray-200 bg-background focus:border-primary focus:ring-primary/20 transition-all"
                                placeholder="Cari nama karyawan..."
                                value={employee}
                                onChange={e => setEmployee(e.target.value)}
                            />
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-3">
                            {steps.map(step => (
                                <button
                                    key={step.key}
                                    onClick={() => toggle(step.key)}
                                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                                        checked[step.key]
                                            ? isOnboarding ? 'border-primary bg-primary/5' : 'border-red-500 bg-red-50'
                                            : 'border-gray-100 hover:border-gray-300'
                                    }`}
                                >
                                    <div className={`flex-shrink-0 transition-colors ${checked[step.key] ? isOnboarding ? 'text-primary' : 'text-red-500' : 'text-gray-300'}`}>
                                        {checked[step.key]
                                            ? <CheckCircle2 className="w-6 h-6" />
                                            : <Circle className="w-6 h-6" />}
                                    </div>
                                    <div>
                                        <p className={`font-semibold text-sm ${checked[step.key] ? 'line-through text-muted-foreground' : ''}`}>{step.label}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                        <div className="p-6 border-t border-gray-100 flex gap-3">
                            <button onClick={onClose} className="flex-1 btn-outline">Tutup</button>
                            <button
                                onClick={handleSave}
                                disabled={!employee}
                                className={`flex-1 ${isOnboarding ? 'btn-primary' : 'flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition-all'} disabled:opacity-50`}
                            >
                                Simpan Progress
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default function Index() {
    const [modalType, setModalType] = useState(null);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-xl">
                        <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="heading-2">Employee Lifecycle</h2>
                        <p className="text-muted-foreground text-sm mt-1">Otomatisasi Onboarding dan Offboarding fasilitas IT Karyawan.</p>
                    </div>
                </div>
            }
        >
            <Head title="Employee Lifecycle" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Onboarding */}
                <div className="card-modern relative overflow-hidden group">
                    <div className="absolute -right-10 -top-10 bg-success/5 w-40 h-40 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <div className="p-4 bg-success/10 text-success rounded-2xl">
                                <UserPlus className="w-8 h-8" />
                            </div>
                            <span className="sticker-green !transform-none">Karyawan Baru</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Onboarding IT</h3>
                        <p className="text-muted-foreground mb-4 text-sm">
                            Siapkan perangkat kerja, email, dan akses jaringan untuk karyawan baru dengan checklist terstruktur.
                        </p>
                        <div className="space-y-2 mb-6">
                            {onboardingSteps.slice(0, 3).map(s => (
                                <div key={s.key} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <ChevronRight className="w-4 h-4 text-success" />
                                    {s.label}
                                </div>
                            ))}
                            <p className="text-xs text-muted-foreground pl-6">+ {onboardingSteps.length - 3} langkah lainnya</p>
                        </div>
                        <button 
                            onClick={() => setModalType('onboarding')}
                            className="btn-primary w-full justify-center"
                        >
                            Mulai Proses Onboarding <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                    </div>
                </div>

                {/* Offboarding */}
                <div className="card-modern relative overflow-hidden group">
                    <div className="absolute -right-10 -top-10 bg-red-500/5 w-40 h-40 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <div className="p-4 bg-red-100 text-red-600 rounded-2xl">
                                <UserMinus className="w-8 h-8" />
                            </div>
                            <span className="sticker-yellow !transform-none !bg-red-100 !text-red-600">Karyawan Resign</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Offboarding IT</h3>
                        <p className="text-muted-foreground mb-4 text-sm">
                            Tarik aset perusahaan dan cabut semua akses digital untuk menjaga keamanan data.
                        </p>
                        <div className="space-y-2 mb-6">
                            {offboardingSteps.slice(0, 3).map(s => (
                                <div key={s.key} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <ChevronRight className="w-4 h-4 text-red-500" />
                                    {s.label}
                                </div>
                            ))}
                            <p className="text-xs text-muted-foreground pl-6">+ {offboardingSteps.length - 3} langkah lainnya</p>
                        </div>
                        <button
                            onClick={() => setModalType('offboarding')}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition-all"
                        >
                            Mulai Proses Offboarding <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {modalType && <ChecklistModal type={modalType} onClose={() => setModalType(null)} />}
        </AuthenticatedLayout>
    );
}
