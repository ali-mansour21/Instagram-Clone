<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class FeedController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $followedUserId = $user->followings->pluck('id');

        $posts = Post::with('user', 'comments', 'comments.user', 'likes')->whereIn('user_id', $followedUserId)->get();
        $followingUsers = $user->followings;
        return response()->json(['status' => 'success', 'data' => [
            'followingUsers' => $followingUsers,
            'posts' => $posts,
        ]]);
    }
    public function getRecommendations()
    {
        // Get the authenticated user
        $user = auth()->user();

        // Call the function to establish relationships based on the depth of 2 follower nodes
        $recommendations = $user->establishRelationshipsByDepth();

        // Return a JSON response with the recommendations
        return response()->json([
            'status' => 'success',
            'data' => [
                'recommendations' => $recommendations,
                'user' => $user
            ]
        ]);
    }
    public function followUser($id)
    {

        $user = auth()->user();
        $userToFollow = User::findOrFail($id);

        if (!$user->followings()->where('following_id', $userToFollow->id)->exists()) {

            $user->followings()->attach($userToFollow->id);
            return response()->json(['status' => 'success', 'message' => 'User followed successfully.']);
        } else {
            return response()->json(['status' => 'error', 'message' => 'Already following this user.']);
        }
    }
}
