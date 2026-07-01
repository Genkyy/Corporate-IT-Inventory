import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    Save, 
    ArrowLeft,
    MonitorSmartphone,
    Building2,
    Tag,
    QrCode
} from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        model_id: '',
        vendor_id: '',
        location_id: '',
        device_name: '',
        serial_number: '',
        status: 'available',
        condition: 'good',
        purchase_date: '',
        warranty_expiry: '',
        purchase_cost: '',
        notes: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // post(route('assets.store'));
        console.log("Form submitted", data);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Link href={route('assets.index')} className="p-2 hover:bg-secondary rounded-full transition-colors">
                            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                        </Link>
                        <div>
                            <h2 className="heading-2 text-2xl">Tambah Aset Baru</h2>
                            <p className="text-muted-foreground text-sm mt-1">Registrasi perangkat ke dalam sistem inventaris.</p>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Tambah Aset" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
                {/* Form Utama */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Section: Identitas Perangkat */}
                        <div className="card-modern">
                            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                                <MonitorSmartphone className="w-5 h-5 text-primary" />
                                <h3 className="text-lg font-bold text-foreground">Identitas Perangkat</h3>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-foreground mb-2">Nama Perangkat</label>
                                    <input 
                                        type="text" 
                                        className="w-full rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20 transition-all bg-background" 
                                        placeholder="Misal: Laptop Operasional HRD"
                                        value={data.device_name}
                                        onChange={e => setData('device_name', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-foreground mb-2">Serial Number / Service Tag</label>
                                    <input 
                                        type="text" 
                                        className="w-full rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20 transition-all bg-background" 
                                        placeholder="Masukkan SN perangkat"
                                        value={data.serial_number}
                                        onChange={e => setData('serial_number', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-foreground mb-2">Kategori Model</label>
                                    <select 
                                        className="w-full rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20 transition-all bg-background text-foreground"
                                        value={data.model_id}
                                        onChange={e => setData('model_id', e.target.value)}
                                    >
                                        <option value="">-- Pilih Model --</option>
                                        <option value="1">ThinkPad T14 Gen 3 (Laptop)</option>
                                        <option value="2">MacBook Pro M2 (Laptop)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-foreground mb-2">Kondisi Fisik</label>
                                    <select 
                                        className="w-full rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20 transition-all bg-background"
                                        value={data.condition}
                                        onChange={e => setData('condition', e.target.value)}
                                    >
                                        <option value="good">Good (Baru/Layak Pakai)</option>
                                        <option value="fair">Fair (Ada Cacat Minor)</option>
                                        <option value="poor">Poor (Rusak Parah)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Section: Pembelian & Lokasi */}
                        <div className="card-modern">
                            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                                <Building2 className="w-5 h-5 text-primary" />
                                <h3 className="text-lg font-bold text-foreground">Pengadaan & Lokasi</h3>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-foreground mb-2">Tanggal Pembelian</label>
                                    <input 
                                        type="date" 
                                        className="w-full rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20 transition-all bg-background" 
                                        value={data.purchase_date}
                                        onChange={e => setData('purchase_date', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-foreground mb-2">Batas Garansi</label>
                                    <input 
                                        type="date" 
                                        className="w-full rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20 transition-all bg-background" 
                                        value={data.warranty_expiry}
                                        onChange={e => setData('warranty_expiry', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-foreground mb-2">Harga Beli (IDR)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-muted-foreground sm:text-sm">Rp</span>
                                        </div>
                                        <input 
                                            type="number" 
                                            className="w-full rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20 transition-all bg-background pl-10" 
                                            placeholder="0"
                                            value={data.purchase_cost}
                                            onChange={e => setData('purchase_cost', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-foreground mb-2">Lokasi Penempatan</label>
                                    <select 
                                        className="w-full rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20 transition-all bg-background"
                                        value={data.location_id}
                                        onChange={e => setData('location_id', e.target.value)}
                                    >
                                        <option value="">-- Pilih Lokasi --</option>
                                        <option value="1">HO - Lt. 5 (IT Room)</option>
                                        <option value="2">Cabang Bandung - Gudang</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-foreground mb-2">Catatan Tambahan</label>
                                    <textarea 
                                        className="w-full rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20 transition-all bg-background" 
                                        rows="3"
                                        placeholder="Opsional..."
                                        value={data.notes}
                                        onChange={e => setData('notes', e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-4 mt-8">
                            <Link href={route('assets.index')} className="btn-outline">
                                Batal
                            </Link>
                            <button 
                                type="submit" 
                                className="btn-primary"
                                disabled={processing}
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {processing ? 'Menyimpan...' : 'Simpan Aset'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Sidebar Info */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="card-modern bg-gradient-to-br from-primary to-primary/90 text-white border-none shadow-xl shadow-primary/20">
                        <div className="flex items-center justify-between mb-4">
                            <QrCode className="w-8 h-8 opacity-80" />
                            <span className="sticker-yellow !transform-none !bg-white/20 !text-white !backdrop-blur-md">Auto-Generated</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Sistem Barcode & Label</h3>
                        <p className="text-white/80 text-sm leading-relaxed mb-6">
                            Kode internal (Internal Code) dan QR Code akan dibuat secara otomatis oleh sistem setelah aset berhasil disimpan, mengikuti format standard perusahaan.
                        </p>
                        <div className="bg-black/20 rounded-xl p-4 border border-white/10">
                            <p className="text-xs font-medium text-white/60 mb-1">Format Generasi</p>
                            <p className="font-mono text-sm">[CORP]-[KODE LOKASI]-[KODE KATEGORI]-[NO URUT]</p>
                        </div>
                    </div>

                    <div className="card-modern">
                        <div className="flex items-center gap-2 mb-4">
                            <Tag className="w-5 h-5 text-muted-foreground" />
                            <h3 className="font-bold">Status Default</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Secara *default*, aset baru yang didaftarkan akan berstatus <strong className="text-foreground">Available</strong> dan masuk ke dalam inventaris gudang sebelum dialokasikan ke karyawan melalui menu Serah Terima.
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
