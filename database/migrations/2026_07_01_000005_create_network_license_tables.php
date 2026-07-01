<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ip_addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('asset_id')->nullable()->constrained('assets')->nullOnDelete();
            $table->string('ip_address', 45)->unique();
            $table->string('subnet', 45)->nullable();
            $table->string('gateway', 45)->nullable();
            $table->string('mac_address', 17)->nullable();
            $table->enum('type', ['static', 'dhcp'])->default('static');
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('licenses', function (Blueprint $table) {
            $table->id();
            $table->string('software_name');
            $table->string('version')->nullable();
            $table->string('product_key')->nullable();
            $table->enum('license_type', ['oem', 'volume', 'subscription', 'freeware'])->default('oem');
            $table->integer('total_seats')->default(1);
            $table->integer('used_seats')->default(0);
            $table->date('purchase_date')->nullable();
            $table->date('expiry_date')->nullable();
            $table->foreignId('vendor_id')->nullable()->constrained('vendors')->nullOnDelete();
            $table->decimal('cost', 15, 2)->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('license_allocations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('license_id')->constrained('licenses')->cascadeOnDelete();
            $table->foreignId('asset_id')->nullable()->constrained('assets')->nullOnDelete();
            $table->foreignId('employee_id')->nullable()->constrained('employees')->nullOnDelete();
            $table->date('allocated_at');
            $table->date('revoked_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('license_allocations');
        Schema::dropIfExists('licenses');
        Schema::dropIfExists('ip_addresses');
    }
};
