import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { 
    Monitor, 
    TicketCheck, 
    AlertTriangle, 
    Clock,
    Activity
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function Dashboard() {
    const user = usePage().props.auth.user;

    // Dummy Data for the Dashboard
    const stats = [
        { title: 'Total Aset', value: '1,248', icon: Monitor, color: 'text-primary', bg: 'bg-primary/10' },
        { title: 'Aset Rusak / Servis', value: '24', icon: AlertTriangle, color: 'text-accent', bg: 'bg-accent/10' },
        { title: 'Tiket Aktif', value: '12', icon: TicketCheck, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { title: 'Lisensi Kedaluwarsa (30 Hari)', value: '3', icon: Clock, color: 'text-warning', bg: 'bg-warning/20' },
    ];

    const recentTickets = [
        { id: 'TKT-001', subject: 'Laptop Sering BSOD', user: 'Budi Santoso', priority: 'High', status: 'Open' },
        { id: 'TKT-002', subject: 'Printer HRD Macet', user: 'Siti Aminah', priority: 'Medium', status: 'In Progress' },
        { id: 'TKT-003', subject: 'Minta Akses VPN Baru', user: 'Andi Kusuma', priority: 'Low', status: 'Open' },
        { id: 'TKT-004', subject: 'Keyboard Ketik Sendiri', user: 'Ratna Sari', priority: 'Medium', status: 'Pending Parts' },
    ];

    const assetConditionData = [
        { name: 'Good', value: 850, color: '#1D3D2F' }, // primary
        { name: 'Fair', value: 300, color: '#A3C95A' }, // success
        { name: 'Poor', value: 98, color: '#FFD23F' },  // warning
    ];

    const hasRole = (role) => {
        return user?.roles?.includes(role);
    };

    if (hasRole('Karyawan') && !hasRole('IT Support')) {
        return (
            <AuthenticatedLayout header={<h2 className="heading-2">Portal Karyawan</h2>}>
                <Head title="Portal Karyawan" />
                <div className="space-y-8 pb-10">
                    <div className="card-modern bg-gradient-to-r from-primary to-primary/80 text-white">
                        <h3 className="text-2xl font-bold mb-2">Selamat Datang, {user.name}!</h3>
                        <p className="text-white/80">Ini adalah portal layanan IT Anda. Anda dapat melihat aset yang dipinjamkan kepada Anda atau membuat laporan jika ada kendala perangkat.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="card-modern">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Monitor className="w-5 h-5 text-primary" /> Aset Aktif Anda
                            </h3>
                            <div className="p-4 border border-gray-100 rounded-xl flex items-center gap-4">
                                <div className="p-3 bg-secondary rounded-lg">
                                    <Monitor className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <p className="font-bold">ThinkPad T14 Gen 3</p>
                                    <p className="text-sm text-muted-foreground">SN: PF123456</p>
                                </div>
                                <span className="ml-auto sticker-green !transform-none">Normal</span>
                            </div>
                        </div>

                        <div className="card-modern">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <TicketCheck className="w-5 h-5 text-primary" /> Tiket Terakhir
                            </h3>
                            <div className="p-4 border border-gray-100 rounded-xl flex items-center justify-between">
                                <div>
                                    <p className="font-bold">Minta Akses VPN</p>
                                    <p className="text-sm text-muted-foreground">TKT-003 • 30 Juni 2026</p>
                                </div>
                                <span className="sticker-yellow !transform-none">Open</span>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout
            header={<h2 className="heading-2">Dashboard Analytics</h2>}
        >
            <Head title="Dashboard" />

            <div className="space-y-8 pb-10">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="card-modern flex items-center p-6 gap-5">
                            <div className={`p-4 rounded-2xl ${stat.bg}`}>
                                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground mb-1">{stat.title}</p>
                                <h3 className="text-3xl font-bold tracking-tight text-foreground">{stat.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Chart Area */}
                    <div className="card-modern xl:col-span-1 flex flex-col h-[400px]">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-bold text-foreground">Kondisi Aset Global</h3>
                            <Activity className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-6">Persentase kesehatan seluruh perangkat.</p>
                        
                        <div className="flex-1 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={assetConditionData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={110}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {assetConditionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-center gap-6 mt-4">
                            {assetConditionData.map((entry, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
                                    <span className="text-sm font-semibold text-muted-foreground">{entry.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Tickets */}
                    <div className="card-modern xl:col-span-2 flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-foreground">Tiket Perbaikan Terbaru</h3>
                                <p className="text-sm text-muted-foreground">Tiket yang membutuhkan perhatian teknisi.</p>
                            </div>
                            <button className="text-sm text-primary font-bold hover:underline">Lihat Semua</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead>
                                    <tr className="border-b border-gray-100 text-muted-foreground">
                                        <th className="pb-4 font-semibold px-2">ID Tiket</th>
                                        <th className="pb-4 font-semibold px-2">Subjek Kendala</th>
                                        <th className="pb-4 font-semibold px-2">Pelapor</th>
                                        <th className="pb-4 font-semibold px-2">Prioritas</th>
                                        <th className="pb-4 font-semibold px-2 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentTickets.map((ticket, i) => (
                                        <tr key={i} className="border-b border-gray-50 hover:bg-secondary/30 transition-colors">
                                            <td className="py-4 px-2 font-bold text-primary">{ticket.id}</td>
                                            <td className="py-4 px-2 font-medium text-foreground">{ticket.subject}</td>
                                            <td className="py-4 px-2 text-muted-foreground">{ticket.user}</td>
                                            <td className="py-4 px-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                    ticket.priority === 'High' ? 'bg-red-100 text-red-600' : 
                                                    ticket.priority === 'Medium' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                    {ticket.priority}
                                                </span>
                                            </td>
                                            <td className="py-4 px-2 text-right">
                                                <span className={`label-caps px-3 py-1.5 rounded-md ${
                                                    ticket.status === 'Open' ? 'bg-warning text-foreground' : 
                                                    ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-secondary text-muted-foreground'
                                                }`}>
                                                    {ticket.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
