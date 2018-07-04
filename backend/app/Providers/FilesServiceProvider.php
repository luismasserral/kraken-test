<?php

namespace App\Providers;

use App\Services\FilesService;
use Illuminate\Support\ServiceProvider;

class FilesServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton(FilesService::class, function () {
            return new FilesService();
        });
    }
}
