<?php

namespace App\Http\Controllers\post;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostConroller extends Controller
{
    public function store(Request $request)
    {
        $user_id = auth()->id();
        $data = $request->validate([
            'caption' => ['required', 'string', 'max:300'],
            'post_image' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg']
        ]);
        $image_name = Str::random(32) . "." . $request->post_image->getClientOriginalExtension();
        Storage::disk('public')->put($image_name, $request->post_image);
        $post = new Post();
        $post->caption = $data['caption'];
        $post->post_image = $image_name;
        $post->user_id = $user_id;
        $post->save();
        return response()->json(['status' => 'success', 'message' => 'Post added successfully'], 201);
    }
}
