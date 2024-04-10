<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class FeedController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $followedUserId = $user->followings->pluck('id');

        $posts = Post::whereIn('user_id', $followedUserId)->get();
        return response()->json(['status' => 'success', 'data' => $posts]);
    }
}
