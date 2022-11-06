<?php

use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\MovieController;
use App\Http\Controllers\User\SubcriptionPlanController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('admin', function () {
//     return ' Hi Admin';
// })->middleware('role:admin');

// Route::get('user', function () {
//     return ' Hi user';
// })->middleware('role:user');

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::redirect('/', 'login');

Route::middleware(['auth', 'role:user'])->prefix('dashboard')->name('user.dashboard.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('index');
    Route::get('movie/{movie:slug}', [MovieController::class, 'show'])->name('movie.show')->middleware('checkUserSubcription:true');
    Route::get('subcription-plan', [SubcriptionPlanController::class, 'index'])->name('subcriptionPlan.index')->middleware('checkUserSubcription:false');
    Route::post('subcription-plan/{subcriptionPlan}/user-subcribe', [SubcriptionPlanController::class, 'store'])->name('subcriptionPlan.store')->middleware('checkUserSubcription:false');
});


Route::prefix('prototype')->name('prototype.')->group(function () {
    route::get('/login', function () {
        return Inertia::render('Prototype/Login');
    })->name('login');
    route::get('/register', function () {
        return Inertia::render('Prototype/Register');
    })->name('register');
    route::get('/dashboard', function () {
        return Inertia::render('Prototype/Dashboard');
    })->name('dashboard');
    route::get('/subcriptionPlan', function () {
        return Inertia::render('Prototype/SubcriptionPlan');
    })->name('subcriptionPlan');
    route::get('/movie/{slug}', function () {
        return Inertia::render('Prototype/Movie/Show');
    })->name('movie.show');
});

require __DIR__ . '/auth.php';
