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

        $posts = Post::with('user', 'comments', 'comments.user', 'likes')->whereIn('user_id', $followedUserId)->get();
        $followingUsers = $user->followings;
        return response()->json(['status' => 'success', 'data' => [
            'followingUsers' => $followingUsers,
            'posts' => $posts,
        ]]);
    }
    public function getRecommendations()
    {

        $user = auth()->user();

        $followings = $this->getFollowingsWithDepth($user, 2);

        return response()->json(['status' => 'success', 'data' => [
            'followings' => $followings,
            'user' => $user
        ]]);
    }
    private function getFollowingsWithDepth($user, $depth, $currentDepth = 0)
    {
        // Initialize an empty array to store the followings
        $followings = [];

        // Base case: if depth is zero, return an empty array
        if ($currentDepth === $depth) {
            return $followings;
        }

        // Retrieve the direct followings of the user
        $directFollowings = $user->followings()->get();

        // Iterate through the direct followings
        foreach ($directFollowings as $following) {
            // Skip the current user
            if ($currentDepth !== 0) {
                $followings[] = $following;
            }

            // Recursively get the followings of the direct following with increased depth
            $nestedFollowings = $this->getFollowingsWithDepth($following, $depth, $currentDepth + 1);

            // Merge the nested followings with the list of followings
            $followings = array_merge($followings, $nestedFollowings);
        }

        // Return the list of followings
        return $followings;
    }
}
