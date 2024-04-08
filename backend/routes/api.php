<?php

use App\Http\Controllers\auth\AuthController;
use App\Http\Controllers\post\PostConroller;
use App\Http\Controllers\user\FeedController;
use App\Http\Controllers\user\LikedController;
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
    Route::get('feed', [FeedController::class, 'index']);
    Route::post('posts/{id}/like', [LikedController::class, 'store']);
});
Route::post("register", [AuthController::class, 'register']);
Route::post("login", [AuthController::class, 'login']);
