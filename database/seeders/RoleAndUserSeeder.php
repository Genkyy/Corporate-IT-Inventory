<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RoleAndUserSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Roles
        $roleIT = Role::firstOrCreate(['name' => 'IT Support']);
        $roleHR = Role::firstOrCreate(['name' => 'HRD']);
        $roleUser = Role::firstOrCreate(['name' => 'Karyawan']);

        // 2. Create Dummy Users
        
        // User 1: IT Support (Admin)
        $itUser = User::firstOrCreate(
            ['email' => 'admin.it@perusahaan.com'],
            [
                'name' => 'Budi IT',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
            ]
        );
        if (!$itUser->hasRole('IT Support')) {
            $itUser->assignRole('IT Support');
        }

        // User 2: HRD
        $hrUser = User::firstOrCreate(
            ['email' => 'hrd@perusahaan.com'],
            [
                'name' => 'Siti HRD',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
            ]
        );
        if (!$hrUser->hasRole('HRD')) {
            $hrUser->assignRole('HRD');
        }

        // User 3: Karyawan Biasa
        $karyawanUser = User::firstOrCreate(
            ['email' => 'andi.staff@perusahaan.com'],
            [
                'name' => 'Andi Staff',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
            ]
        );
        if (!$karyawanUser->hasRole('Karyawan')) {
            $karyawanUser->assignRole('Karyawan');
        }
    }
}
