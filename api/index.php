<?php

/**
 * Vercel PHP Serverless Entry Point for Laravel
 * 
 * Handles:
 * 1. Creating writable storage in /tmp (Vercel's writable FS)
 * 2. Setting up SQLite database in /tmp
 * 3. Running migrations on first boot
 * 4. Bootstrapping and handling the Laravel request
 */

define('LARAVEL_START', microtime(true));

// ─── 1. Setup writable /tmp storage directories ───────────────────────────────
$tmpStorage = '/tmp/laravel-storage';
$storageDirs = [
    "$tmpStorage/framework/sessions",
    "$tmpStorage/framework/cache/data",
    "$tmpStorage/framework/views",
    "$tmpStorage/logs",
    "$tmpStorage/app/public",
];
foreach ($storageDirs as $dir) {
    if (!is_dir($dir)) {
        mkdir($dir, 0775, true);
    }
}

// ─── 2. Setup SQLite database ─────────────────────────────────────────────────
$dbPath = '/tmp/laravel-database.sqlite';
$isNewDb = !file_exists($dbPath);
if ($isNewDb) {
    touch($dbPath);
}

// ─── 3. Set environment variables ─────────────────────────────────────────────
putenv("VERCEL_RUNTIME=1");
putenv("DB_CONNECTION=sqlite");
putenv("DB_DATABASE=$dbPath");
putenv("SESSION_DRIVER=file");
putenv("CACHE_STORE=file");
putenv("LOG_CHANNEL=stderr");

$_ENV['VERCEL_RUNTIME'] = '1';
$_ENV['DB_CONNECTION'] = 'sqlite';
$_ENV['DB_DATABASE'] = $dbPath;
$_ENV['SESSION_DRIVER'] = 'file';
$_ENV['CACHE_STORE'] = 'file';
$_ENV['LOG_CHANNEL'] = 'stderr';

// ─── 4. Bootstrap Laravel ─────────────────────────────────────────────────────
require_once __DIR__ . '/../vendor/autoload.php';

$app = require_once __DIR__ . '/../bootstrap/app.php';

// Override storage path to use /tmp
$app->useStoragePath($tmpStorage);

// ─── 5. Run migrations + seed on new database (cold start) ───────────────────
if ($isNewDb) {
    try {
        $artisan = $app->make(Illuminate\Contracts\Console\Kernel::class);
        $artisan->call('migrate', ['--force' => true]);
        $artisan->call('db:seed', ['--force' => true, '--class' => 'RoleAndUserSeeder']);
    } catch (\Throwable $e) {
        // Log but don't crash — migrations may fail gracefully
        error_log('[Vercel Bootstrap] Migration error: ' . $e->getMessage());
    }
}

// ─── 6. Handle HTTP Request ───────────────────────────────────────────────────
$app->handleRequest(Illuminate\Http\Request::capture());
