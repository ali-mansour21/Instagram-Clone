<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;

class LikedController extends Controller
{
    public function store($id)
    {
        $user_id = auth()->id();
        $post = Post::findOrFail($id);
        $post_id = $post->id;
        $existing_Like = Like::where('user_id', $user_id)->where('post_id', $post_id)->first();
        if ($existing_Like) {
            $existing_Like->delete();
        } else {
            $like = new Like();
            $like->user_id = $user_id;
            $like->post_id = $post_id;
            $like->save();
        }
        return response()->json(['status' => 'success']);
    }
}
