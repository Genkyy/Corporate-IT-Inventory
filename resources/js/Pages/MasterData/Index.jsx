import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import {
    Settings, Building2, MapPin, Briefcase, Tags, Laptop,
    Plus, Pencil, Trash2, X, Search
} from 'lucide-react';

const masterDataConfig = {
    departments: {
        label: 'Departments', icon: Building2, color: 'text-primary', bg: 'bg-primary/10',
        fields: ['name', 'code'],
        data: [
            { id: 1, name: 'Information Technology', code: 'IT' },
            { id: 2, name: 'Human Resources Department', code: 'HRD' },
            { id: 3, name: 'Finance & Accounting', code: 'FIN' },
            { id: 4, name: 'Operations', code: 'OPS' },
            { id: 5, name: 'Marketing & Communications', code: 'MKT' },
        ]
    },
    locations: {
        label: 'Locations', icon: MapPin, color: 'text-blue-500', bg: 'bg-blue-500/10',
        fields: ['name', 'address'],
        data: [
            { id: 1, name: 'Head Office - Jakarta', address: 'Jl. Sudirman No.1, Jakarta' },
            { id: 2, name: 'Cabang Bandung', address: 'Jl. Dago No.55, Bandung' },
            { id: 3, name: 'Cabang Surabaya', address: 'Jl. Pemuda No.10, Surabaya' },
            { id: 4, name: 'Gudang Logistik', address: 'Kawasan Industri MM2100, Bekasi' },
        ]
    },
    vendors: {
        label: 'Vendors', icon: Briefcase, color: 'text-orange-500', bg: 'bg-orange-500/10',
        fields: ['name', 'contact_info'],
        data: [
            { id: 1, name: 'Lenovo Indonesia', contact_info: 'support@lenovo.co.id' },
            { id: 2, name: 'Apple ID', contact_info: 'support.apple.com' },
            { id: 3, name: 'Dell Technologies', contact_info: '021-1234567' },
            { id: 4, name: 'Epson Indonesia', contact_info: 'epson@ink.co.id' },
        ]
    },
    categories: {
        label: 'Categories', icon: Tags, color: 'text-purple-500', bg: 'bg-purple-500/10',
        fields: ['name'],
        data: [
            { id: 1, name: 'Laptop' }, { id: 2, name: 'Desktop PC' },
            { id: 3, name: 'Monitor' }, { id: 4, name: 'Printer' },
            { id: 5, name: 'Keyboard' }, { id: 6, name: 'Mouse' },
            { id: 7, name: 'Switch / Hub' }, { id: 8, name: 'Access Point' },
        ]
    },
    models: {
        label: 'Asset Models', icon: Laptop, color: 'text-success', bg: 'bg-success/10',
        fields: ['brand', 'name'],
        data: [
            { id: 1, brand: 'Apple', name: 'MacBook Pro M2 14"' },
            { id: 2, brand: 'Apple', name: 'MacBook Air M1' },
            { id: 3, brand: 'Lenovo', name: 'ThinkPad T14 Gen 3' },
            { id: 4, brand: 'Dell', name: 'UltraSharp U2722D' },
            { id: 5, brand: 'Epson', name: 'EcoTank L3150' },
        ]
    },
};

function DataTable({ config, onClose }) {
    const [data, setData] = useState(config.data);
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const filtered = data.filter(row =>
        config.fields.some(f => (row[f] || '').toLowerCase().includes(search.toLowerCase()))
    );

    const handleDelete = (id) => {
        setData(prev => prev.filter(r => r.id !== id));
        setDeleteTarget(null);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl z-10 max-h-[85vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl ${config.bg}`}>
                            <config.icon className={`w-5 h-5 ${config.color}`} />
                        </div>
                        <h3 className="text-xl font-bold">Kelola {config.label}</h3>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full">
                        <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>

                {/* Controls */}
                <div className="flex gap-3 p-4 border-b border-gray-100">
                    <div className="flex items-center bg-background rounded-xl px-3 py-2 border border-gray-200 flex-1">
                        <Search className="w-4 h-4 text-muted-foreground mr-2" />
                        <input
                            className="bg-transparent border-none focus:ring-0 text-sm w-full p-0"
                            placeholder="Cari data..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="btn-primary !py-2 !px-4 text-sm"
                    >
                        <Plus className="w-4 h-4 mr-1" /> Tambah
                    </button>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-secondary/30 sticky top-0">
                            <tr>
                                <th className="py-3 px-5 text-left font-semibold text-muted-foreground">#</th>
                                {config.fields.map(f => (
                                    <th key={f} className="py-3 px-5 text-left font-semibold text-muted-foreground capitalize">
                                        {f.replace('_', ' ')}
                                    </th>
                                ))}
                                <th className="py-3 px-5 text-right font-semibold text-muted-foreground">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((row, i) => (
                                <tr key={row.id} className="border-t border-gray-50 hover:bg-secondary/10 transition-colors">
                                    <td className="py-3 px-5 text-muted-foreground">{i + 1}</td>
                                    {config.fields.map(f => (
                                        <td key={f} className="py-3 px-5 font-medium">{row[f]}</td>
                                    ))}
                                    <td className="py-3 px-5 text-right">
                                        <div className="flex gap-1 justify-end">
                                            <button className="p-1.5 hover:bg-blue-50 text-blue-500 rounded-lg transition-colors">
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => setDeleteTarget(row)}
                                                className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-gray-100 text-sm text-muted-foreground">
                    Total: <strong>{filtered.length}</strong> data
                </div>
            </div>

            {/* Add Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/30" onClick={() => setShowForm(false)}></div>
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10 p-6">
                        <h4 className="text-lg font-bold mb-4">Tambah {config.label}</h4>
                        <form onSubmit={(e) => { e.preventDefault(); setShowForm(false); }} className="space-y-4">
                            {config.fields.map(f => (
                                <div key={f}>
                                    <label className="block text-sm font-bold mb-1.5 capitalize">{f.replace('_', ' ')}</label>
                                    <input
                                        type="text" required
                                        className="w-full rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20 bg-background"
                                        placeholder={`Masukkan ${f.replace('_', ' ')}...`}
                                    />
                                </div>
                            ))}
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowForm(false)} className="flex-1 btn-outline">Batal</button>
                                <button type="submit" className="flex-1 btn-primary">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirm */}
            {deleteTarget && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/30" onClick={() => setDeleteTarget(null)}></div>
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm z-10 p-8 text-center">
                        <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trash2 className="w-7 h-7 text-red-600" />
                        </div>
                        <h4 className="font-bold text-lg mb-2">Hapus Data?</h4>
                        <p className="text-sm text-muted-foreground mb-6">Data ini akan dihapus secara permanen.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteTarget(null)} className="flex-1 btn-outline">Batal</button>
                            <button onClick={() => handleDelete(deleteTarget.id)} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition-all">
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Index() {
    const [activeModule, setActiveModule] = useState(null);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-xl">
                        <Settings className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="heading-2">Master Data</h2>
                        <p className="text-muted-foreground text-sm mt-1">Konfigurasi entitas dasar sistem inventaris.</p>
                    </div>
                </div>
            }
        >
            <Head title="Master Data" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(masterDataConfig).map(([key, cfg]) => (
                    <button
                        key={key}
                        onClick={() => setActiveModule(key)}
                        className="card-modern cursor-pointer group hover:bg-primary/5 transition-all text-left"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 ${cfg.bg} rounded-xl transition-colors group-hover:bg-primary group-hover:text-white`}>
                                <cfg.icon className={`w-6 h-6 ${cfg.color} group-hover:text-white transition-colors`} />
                            </div>
                            <span className="text-2xl font-bold text-muted-foreground/20 group-hover:text-primary/20">{cfg.data.length}</span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-1">{cfg.label}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            {cfg.data.length} data tersedia
                        </p>
                        <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:underline">
                            Kelola Data <Plus className="w-3 h-3" />
                        </span>
                    </button>
                ))}
            </div>

            {activeModule && (
                <DataTable
                    config={masterDataConfig[activeModule]}
                    onClose={() => setActiveModule(null)}
                />
            )}
        </AuthenticatedLayout>
    );
}
