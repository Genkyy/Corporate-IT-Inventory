<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Asset Management
    Route::resource('assets', \App\Http\Controllers\AssetController::class);
    
    // Prototype Routes (Dummy UI)
    Route::get('/master-data', function () { return inertia('MasterData/Index'); })->name('master.index');
    Route::get('/helpdesk', function () { return inertia('Helpdesk/Index'); })->name('helpdesk.index');
    Route::get('/network', function () { return inertia('Network/Index'); })->name('network.index');
    Route::get('/employees', function () { return inertia('Employee/Index'); })->name('employee.index');
});

require __DIR__.'/auth.php';
