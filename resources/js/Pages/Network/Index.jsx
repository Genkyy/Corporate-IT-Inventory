import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { 
    Network,
    KeySquare,
    Wifi
} from 'lucide-react';

export default function Index() {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-xl">
                        <Network className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="heading-2">Network & License</h2>
                        <p className="text-muted-foreground text-sm mt-1">Manajemen IP Address (IPAM) dan Lisensi Perangkat Lunak.</p>
                    </div>
                </div>
            }
        >
            <Head title="Network & License" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card-modern cursor-pointer hover:bg-secondary/10 transition-colors border-t-4 border-t-primary">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Wifi className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">IP Address Management</h3>
                    </div>
                    <p className="text-muted-foreground text-sm">
                        Kelola alokasi IP Address statis untuk server, printer, dan perangkat khusus agar terhindar dari IP Conflict.
                    </p>
                </div>

                <div className="card-modern cursor-pointer hover:bg-secondary/10 transition-colors border-t-4 border-t-accent">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-accent/10 rounded-full">
                            <KeySquare className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="text-xl font-bold">Software Licenses</h3>
                    </div>
                    <p className="text-muted-foreground text-sm">
                        Pantau sisa kuota lisensi software (Office 365, Adobe, dll) dan dapatkan peringatan sebelum masa berlaku habis.
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
