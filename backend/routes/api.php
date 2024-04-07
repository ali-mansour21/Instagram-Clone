<?php

use App\Http\Controllers\auth\AuthController;
use App\Http\Controllers\post\PostConroller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth.jwt')->get('/user', function () {
    Route::post('posts', [PostConroller::class, 'store']);
});
Route::post("register", [AuthController::class, 'register']);
Route::post("login", [AuthController::class, 'login']);
