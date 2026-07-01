import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { 
    Plus, Search, Filter, Download, Upload,
    MoreVertical, Monitor, Laptop, Printer,
    Eye, Pencil, Trash2, QrCode, X, ChevronDown
} from 'lucide-react';

export default function Index({ assets }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(null);

    const dummyAssets = [
        { id: 1, code: 'IT-JKT-LAP-001', name: 'MacBook Pro M2 2023', category: 'Laptop', user: 'Budi Santoso', status: 'Assigned', condition: 'Good' },
        { id: 2, code: 'IT-BDG-MON-012', name: 'Dell UltraSharp 27', category: 'Monitor', user: 'Siti Aminah', status: 'Assigned', condition: 'Good' },
        { id: 3, code: 'IT-JKT-PRN-005', name: 'Epson L3150', category: 'Printer', user: 'HRD Team', status: 'Maintenance', condition: 'Fair' },
        { id: 4, code: 'IT-SBY-LAP-042', name: 'ThinkPad T14 Gen 3', category: 'Laptop', user: '-', status: 'Available', condition: 'Good' },
        { id: 5, code: 'IT-JKT-LAP-018', name: 'MacBook Air M1', category: 'Laptop', user: 'Andi Kusuma', status: 'Assigned', condition: 'Poor' },
        { id: 6, code: 'IT-JKT-LAP-030', name: 'HP EliteBook 840', category: 'Laptop', user: '-', status: 'Available', condition: 'Fair' },
    ];

    const filteredAssets = dummyAssets.filter(asset => {
        const matchSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase())
            || asset.code.toLowerCase().includes(searchQuery.toLowerCase())
            || asset.user.toLowerCase().includes(searchQuery.toLowerCase());
        const matchFilter = filterStatus === 'all' || asset.status === filterStatus;
        return matchSearch && matchFilter;
    });

    const getCategoryIcon = (category) => {
        if (category === 'Laptop') return <Laptop className="w-4 h-4" />;
        if (category === 'Printer') return <Printer className="w-4 h-4" />;
        return <Monitor className="w-4 h-4" />;
    };

    const getStatusStyle = (status) => {
        switch(status) {
            case 'Available': return 'bg-success/20 text-success border border-success/30';
            case 'Assigned': return 'bg-primary/10 text-primary border border-primary/20';
            case 'Maintenance': return 'bg-warning/20 text-warning border border-warning/30';
            default: return 'bg-secondary text-muted-foreground';
        }
    };

    const handleDeleteClick = (asset) => {
        setSelectedAsset(asset);
        setShowDeleteModal(true);
        setOpenDropdown(null);
    };

    const statusOptions = ['all', 'Available', 'Assigned', 'Maintenance'];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="heading-2">Asset Management</h2>
                        <p className="text-muted-foreground text-sm mt-1">Kelola dan pantau seluruh perangkat IT perusahaan.</p>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                        <button 
                            onClick={() => alert('Fitur import CSV akan segera tersedia!')}
                            className="btn-outline !py-2 !px-4 text-sm"
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            Import CSV
                        </button>
                        <button 
                            onClick={() => alert('Mengunduh data aset...')}
                            className="btn-outline !py-2 !px-4 text-sm"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </button>
                        <Link href={route('assets.create')} className="btn-primary !py-2 !px-4 text-sm shadow-md shadow-primary/20">
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Aset
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Assets" />

            <div className="card-modern" onClick={() => { setOpenDropdown(null); setShowFilterMenu(false); }}>
                {/* Table Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <div className="flex items-center bg-background rounded-xl px-4 py-2 border border-gray-200 focus-within:border-primary/50 w-full md:w-96 transition-all">
                        <Search className="w-4 h-4 text-muted-foreground mr-2 flex-shrink-0" />
                        <input 
                            type="text" 
                            placeholder="Cari kode aset, nama, atau pengguna..." 
                            className="bg-transparent border-none focus:ring-0 text-sm w-full p-0 text-foreground"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')}>
                                <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                            </button>
                        )}
                    </div>
                    <div className="relative flex items-center gap-2 w-full md:w-auto">
                        <button 
                            onClick={(e) => { e.stopPropagation(); setShowFilterMenu(!showFilterMenu); }}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-background border border-gray-200 rounded-xl text-sm font-medium hover:bg-secondary transition-all w-full md:w-auto"
                        >
                            <Filter className="w-4 h-4" />
                            {filterStatus === 'all' ? 'Filter Status' : filterStatus}
                            <ChevronDown className={`w-4 h-4 transition-transform ${showFilterMenu ? 'rotate-180' : ''}`} />
                        </button>
                        {showFilterMenu && (
                            <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-20 p-1" onClick={(e) => e.stopPropagation()}>
                                {statusOptions.map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => { setFilterStatus(opt); setShowFilterMenu(false); }}
                                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors capitalize ${filterStatus === opt ? 'bg-primary text-white' : 'hover:bg-secondary text-foreground'}`}
                                    >
                                        {opt === 'all' ? 'Semua Status' : opt}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Table Area */}
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-secondary/30">
                            <tr className="text-muted-foreground">
                                <th className="py-4 px-6 font-semibold">Kode Internal</th>
                                <th className="py-4 px-6 font-semibold">Nama Perangkat</th>
                                <th className="py-4 px-6 font-semibold">Pengguna Aktif</th>
                                <th className="py-4 px-6 font-semibold">Kondisi</th>
                                <th className="py-4 px-6 font-semibold">Status</th>
                                <th className="py-4 px-6 font-semibold text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAssets.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-16 text-center text-muted-foreground">
                                        <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
                                        <p>Tidak ada aset yang cocok dengan pencarian Anda.</p>
                                    </td>
                                </tr>
                            ) : filteredAssets.map((asset) => (
                                <tr key={asset.id} className="border-t border-gray-50 hover:bg-secondary/10 transition-colors">
                                    <td className="py-4 px-6 font-bold text-primary">{asset.code}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-secondary rounded-lg text-muted-foreground">
                                                {getCategoryIcon(asset.category)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-foreground">{asset.name}</p>
                                                <p className="text-xs text-muted-foreground">{asset.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        {asset.user !== '-' ? (
                                            <span className="font-medium">{asset.user}</span>
                                        ) : (
                                            <span className="text-muted-foreground italic">Belum Dialokasikan</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`flex items-center gap-1.5 font-medium ${
                                            asset.condition === 'Poor' ? 'text-red-500' : 
                                            asset.condition === 'Fair' ? 'text-yellow-600' : 'text-success'
                                        }`}>
                                            <span className={`w-2 h-2 rounded-full ${
                                                asset.condition === 'Poor' ? 'bg-red-500' : 
                                                asset.condition === 'Fair' ? 'bg-yellow-400' : 'bg-success'
                                            }`}></span>
                                            {asset.condition}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(asset.status)}`}>
                                            {asset.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right relative">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === asset.id ? null : asset.id); }}
                                            className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                                        >
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                        {openDropdown === asset.id && (
                                            <div className="absolute right-6 top-full mt-0 w-44 bg-white rounded-xl shadow-xl border border-gray-100 z-20 p-1" onClick={e => e.stopPropagation()}>
                                                <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm hover:bg-secondary text-foreground">
                                                    <Eye className="w-4 h-4 text-primary" /> Lihat Detail
                                                </button>
                                                <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm hover:bg-secondary text-foreground">
                                                    <Pencil className="w-4 h-4 text-blue-500" /> Edit Aset
                                                </button>
                                                <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm hover:bg-secondary text-foreground">
                                                    <QrCode className="w-4 h-4 text-muted-foreground" /> Cetak QR Code
                                                </button>
                                                <hr className="my-1 border-gray-100" />
                                                <button 
                                                    onClick={() => handleDeleteClick(asset)}
                                                    className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm hover:bg-red-50 text-red-600"
                                                >
                                                    <Trash2 className="w-4 h-4" /> Hapus Aset
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                    <p className="text-sm text-muted-foreground">
                        Menampilkan <strong>{filteredAssets.length}</strong> dari <strong>{dummyAssets.length}</strong> aset
                    </p>
                    <div className="flex gap-1">
                        <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-muted-foreground cursor-not-allowed opacity-50" disabled>Prev</button>
                        <button className="px-3 py-1 bg-primary text-white rounded-lg text-sm font-medium">1</button>
                        <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm text-muted-foreground hover:bg-secondary">Next</button>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)}></div>
                    <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md z-10">
                        <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
                            <Trash2 className="w-8 h-8 text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold text-center text-foreground mb-2">Hapus Aset?</h3>
                        <p className="text-center text-muted-foreground text-sm mb-6">
                            Anda yakin ingin menghapus aset <strong className="text-foreground">"{selectedAsset?.name}"</strong>? Tindakan ini tidak dapat dibatalkan.
                        </p>
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 btn-outline"
                            >
                                Batal
                            </button>
                            <button 
                                onClick={() => { setShowDeleteModal(false); alert('Aset telah dihapus!'); }}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition-all"
                            >
                                <Trash2 className="w-4 h-4" /> Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
