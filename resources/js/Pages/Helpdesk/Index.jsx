import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import {
    Ticket, Plus, MessageSquareWarning, CheckCircle2,
    X, ChevronDown, AlertTriangle, User, Monitor
} from 'lucide-react';

export default function Index() {
    const [showModal, setShowModal] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');
    const [showFilter, setShowFilter] = useState(false);
    const [formData, setFormData] = useState({ subject: '', description: '', priority: 'Medium', asset: '' });
    const [submitted, setSubmitted] = useState(false);

    const dummyTickets = [
        { id: 'TKT-001', subject: 'Laptop sering BSOD', user: 'Budi Santoso', priority: 'High', status: 'Open', date: '2026-07-01', assignedTo: 'Teknisi A' },
        { id: 'TKT-002', subject: 'Printer HRD Macet', user: 'Siti Aminah', priority: 'Medium', status: 'In Progress', date: '2026-07-01', assignedTo: 'Teknisi B' },
        { id: 'TKT-003', subject: 'Minta Akses VPN', user: 'Andi Kusuma', priority: 'Low', status: 'Open', date: '2026-06-30', assignedTo: 'Belum Ditentukan' },
        { id: 'TKT-004', subject: 'Keyboard double input', user: 'Ratna Sari', priority: 'Medium', status: 'Resolved', date: '2026-06-29', assignedTo: 'Teknisi A' },
        { id: 'TKT-005', subject: 'Monitor flickering', user: 'Dino Pratama', priority: 'High', status: 'Pending Parts', date: '2026-06-28', assignedTo: 'Teknisi C' },
    ];

    const filtered = filterStatus === 'all' ? dummyTickets : dummyTickets.filter(t => t.status === filterStatus);

    const getPriorityStyle = (p) => {
        if (p === 'High') return 'bg-red-100 text-red-600';
        if (p === 'Medium') return 'bg-orange-100 text-orange-600';
        return 'bg-gray-100 text-gray-600';
    };

    const getStatusStyle = (s) => {
        if (s === 'Open') return 'bg-warning/20 text-yellow-700';
        if (s === 'In Progress') return 'bg-blue-100 text-blue-700';
        if (s === 'Resolved') return 'bg-success/20 text-green-700';
        if (s === 'Pending Parts') return 'bg-purple-100 text-purple-700';
        return 'bg-secondary text-muted-foreground';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setShowModal(false);
            setSubmitted(false);
            setFormData({ subject: '', description: '', priority: 'Medium', asset: '' });
        }, 1500);
    };

    const statusOptions = ['all', 'Open', 'In Progress', 'Pending Parts', 'Resolved'];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-xl">
                            <Ticket className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="heading-2">IT Helpdesk</h2>
                            <p className="text-muted-foreground text-sm mt-1">Sistem pelaporan kendala dan permintaan layanan TI.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setShowModal(true)}
                        className="btn-primary !py-2 !px-4 text-sm shadow-md shadow-primary/20"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Buat Tiket Baru
                    </button>
                </div>
            }
        >
            <Head title="IT Helpdesk" />

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Tiket Buka', value: dummyTickets.filter(t => t.status === 'Open').length, icon: MessageSquareWarning, color: 'text-warning', bg: 'bg-warning/10' },
                    { label: 'Sedang Diproses', value: dummyTickets.filter(t => t.status === 'In Progress').length, icon: AlertTriangle, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { label: 'Nunggu Part', value: dummyTickets.filter(t => t.status === 'Pending Parts').length, icon: Ticket, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                    { label: 'Diselesaikan', value: dummyTickets.filter(t => t.status === 'Resolved').length, icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10' },
                ].map((stat, i) => (
                    <div key={i} className="card-modern flex items-center gap-4 p-5">
                        <div className={`p-3 rounded-xl ${stat.bg}`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground">{stat.label}</p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="card-modern" onClick={() => setShowFilter(false)}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold">Daftar Tiket Kendala</h3>
                    <div className="relative" onClick={e => e.stopPropagation()}>
                        <button 
                            onClick={() => setShowFilter(!showFilter)}
                            className="flex items-center gap-2 px-4 py-2 bg-background border border-gray-200 rounded-xl text-sm font-medium hover:bg-secondary"
                        >
                            <ChevronDown className={`w-4 h-4 transition-transform ${showFilter ? 'rotate-180' : ''}`} />
                            {filterStatus === 'all' ? 'Semua Status' : filterStatus}
                        </button>
                        {showFilter && (
                            <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-gray-100 z-20 p-1">
                                {statusOptions.map(opt => (
                                    <button key={opt} onClick={() => { setFilterStatus(opt); setShowFilter(false); }}
                                        className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium capitalize ${filterStatus === opt ? 'bg-primary text-white' : 'hover:bg-secondary'}`}
                                    >
                                        {opt === 'all' ? 'Semua' : opt}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-secondary/30">
                            <tr className="text-muted-foreground">
                                <th className="py-4 px-6 font-semibold">ID Tiket</th>
                                <th className="py-4 px-6 font-semibold">Subjek</th>
                                <th className="py-4 px-6 font-semibold">Pelapor</th>
                                <th className="py-4 px-6 font-semibold">Ditugaskan</th>
                                <th className="py-4 px-6 font-semibold">Prioritas</th>
                                <th className="py-4 px-6 font-semibold">Status</th>
                                <th className="py-4 px-6 font-semibold text-right">Tanggal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((ticket) => (
                                <tr key={ticket.id} className="border-t border-gray-50 hover:bg-secondary/10 transition-colors cursor-pointer">
                                    <td className="py-4 px-6 font-bold text-primary">{ticket.id}</td>
                                    <td className="py-4 px-6 text-foreground font-medium">{ticket.subject}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-primary">
                                                {ticket.user.charAt(0)}
                                            </div>
                                            {ticket.user}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-muted-foreground text-xs">{ticket.assignedTo}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${getPriorityStyle(ticket.priority)}`}>
                                            {ticket.priority}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(ticket.status)}`}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right text-muted-foreground text-xs">{ticket.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Ticket Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg z-10">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h3 className="text-xl font-bold">Buat Tiket Baru</h3>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-secondary rounded-full transition-colors">
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                        </div>
                        {submitted ? (
                            <div className="p-10 text-center">
                                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle2 className="w-8 h-8 text-success" />
                                </div>
                                <h4 className="font-bold text-xl mb-1">Tiket Berhasil Dibuat!</h4>
                                <p className="text-muted-foreground text-sm">Tim IT akan segera menindaklanjuti laporan Anda.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1.5">Subjek Kendala</label>
                                    <input
                                        type="text" required
                                        className="w-full rounded-xl border-gray-200 bg-background focus:border-primary focus:ring-primary/20 transition-all"
                                        placeholder="Deskripsikan masalah secara singkat..."
                                        value={formData.subject}
                                        onChange={e => setFormData({...formData, subject: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1.5">Perangkat Bermasalah</label>
                                    <select
                                        className="w-full rounded-xl border-gray-200 bg-background focus:border-primary focus:ring-primary/20 transition-all"
                                        value={formData.asset}
                                        onChange={e => setFormData({...formData, asset: e.target.value})}
                                    >
                                        <option value="">-- Pilih Aset (Opsional) --</option>
                                        <option>IT-JKT-LAP-001 - MacBook Pro M2</option>
                                        <option>IT-SBY-LAP-042 - ThinkPad T14</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1.5">Tingkat Prioritas</label>
                                    <div className="flex gap-2">
                                        {['Low', 'Medium', 'High'].map(p => (
                                            <button key={p} type="button"
                                                onClick={() => setFormData({...formData, priority: p})}
                                                className={`flex-1 py-2 rounded-xl text-sm font-bold border-2 transition-all ${formData.priority === p ? 'border-primary bg-primary text-white' : 'border-gray-200 hover:border-primary/30'}`}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1.5">Deskripsi Lengkap</label>
                                    <textarea
                                        rows={4} required
                                        className="w-full rounded-xl border-gray-200 bg-background focus:border-primary focus:ring-primary/20 transition-all"
                                        placeholder="Jelaskan langkah-langkah untuk mereproduksi masalah ini..."
                                        value={formData.description}
                                        onChange={e => setFormData({...formData, description: e.target.value})}
                                    />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 btn-outline">Batal</button>
                                    <button type="submit" className="flex-1 btn-primary">Kirim Tiket</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
