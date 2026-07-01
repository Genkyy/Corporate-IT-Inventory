<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('onboarding_checklists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('employees')->cascadeOnDelete();
            $table->foreignId('handled_by')->nullable()->constrained('users')->nullOnDelete();
            $table->boolean('ip_allocated')->default(false);
            $table->boolean('os_installed')->default(false);
            $table->boolean('software_installed')->default(false);
            $table->boolean('email_created')->default(false);
            $table->boolean('asset_handed_over')->default(false);
            $table->boolean('access_granted')->default(false);
            $table->text('notes')->nullable();
            $table->enum('status', ['pending', 'in_progress', 'completed'])->default('pending');
            $table->timestamps();
        });

        Schema::create('offboarding_checklists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('employees')->cascadeOnDelete();
            $table->foreignId('handled_by')->nullable()->constrained('users')->nullOnDelete();
            $table->boolean('assets_returned')->default(false);
            $table->boolean('email_deactivated')->default(false);
            $table->boolean('server_access_revoked')->default(false);
            $table->boolean('software_access_revoked')->default(false);
            $table->boolean('vpn_revoked')->default(false);
            $table->boolean('data_backed_up')->default(false);
            $table->text('notes')->nullable();
            $table->enum('status', ['pending', 'in_progress', 'completed'])->default('pending');
            $table->timestamps();
        });

        Schema::create('digital_accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('employees')->cascadeOnDelete();
            $table->string('platform'); // e.g. Email, GitHub, Canva, VPN
            $table->string('username')->nullable();
            $table->enum('status', ['active', 'deactivated'])->default('active');
            $table->timestamp('deactivated_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('digital_accounts');
        Schema::dropIfExists('offboarding_checklists');
        Schema::dropIfExists('onboarding_checklists');
    }
};
