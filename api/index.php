<?php

/**
 * Vercel PHP Serverless Entry Point for Laravel
 * Bridges Vercel serverless to Laravel's public/index.php
 */

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// Serve static files directly if they exist in public/
if ($uri !== '/' && file_exists(__DIR__ . '/../public' . $uri)) {
    return false;
}

// Bootstrap Laravel
define('LARAVEL_START', microtime(true));
require_once __DIR__ . '/../vendor/autoload.php';

// Point to Laravel public directory
chdir(__DIR__ . '/../public');
$_SERVER['DOCUMENT_ROOT'] = __DIR__ . '/../public';

require_once __DIR__ . '/../public/index.php';
