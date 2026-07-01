<?php

try {
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
    $_ENV['VERCEL_RUNTIME'] = '1';
    $_ENV['APP_DEBUG'] = 'true';
    $_ENV['APP_KEY'] = 'base64:gFqHKzwjClHI0s3TofjuLL0hcex+0ii8DeMchxPuAvo=';
    $_ENV['APP_URL'] = 'https://corporate-it-inventory-2ffb1183n-genkys-projects.vercel.app';
    $_ENV['DB_CONNECTION'] = 'sqlite';
    $_ENV['DB_DATABASE'] = $dbPath;
    $_ENV['SESSION_DRIVER'] = 'file';
    $_ENV['CACHE_STORE'] = 'file';
    $_ENV['LOG_CHANNEL'] = 'stderr';
    $_ENV['VIEW_COMPILED_PATH'] = "$tmpStorage/framework/views";

    putenv("APP_KEY=" . $_ENV['APP_KEY']);
    putenv("APP_URL=" . $_ENV['APP_URL']);
    putenv("VIEW_COMPILED_PATH=" . $_ENV['VIEW_COMPILED_PATH']);
    putenv("VERCEL_RUNTIME=1");
    putenv("APP_DEBUG=true");
    putenv("DB_CONNECTION=sqlite");
    putenv("DB_DATABASE=$dbPath");
    putenv("SESSION_DRIVER=file");
    putenv("CACHE_STORE=file");
    putenv("LOG_CHANNEL=stderr");

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
            error_log('[Vercel Bootstrap] Migration error: ' . $e->getMessage());
        }
    }

    // ─── 6. Handle HTTP Request ───────────────────────────────────────────────────
    $app->handleRequest(Illuminate\Http\Request::capture());

} catch (\Throwable $e) {
    http_response_code(500);
    echo "<h1>Vercel PHP Fatal Error</h1>";
    echo "<p><strong>Message:</strong> " . htmlspecialchars($e->getMessage()) . "</p>";
    echo "<p><strong>File:</strong> " . htmlspecialchars($e->getFile()) . ":" . $e->getLine() . "</p>";
    echo "<h2>Stack Trace:</h2>";
    echo "<pre>" . htmlspecialchars($e->getTraceAsString()) . "</pre>";
}
