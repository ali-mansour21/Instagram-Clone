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
            'post_image' => ['required'],
        ]);

        $image_data = $data['post_image'];
        $image_data = str_replace('data:image/jpeg;base64,', '', $image_data);
        $image_data = str_replace(' ', '+', $image_data);
        $image_data = base64_decode($image_data);
        $image_name = Str::random(32) . ".jpg";

        Storage::disk('public')->put($image_name, $image_data);

        $post = new Post();
        $post->caption = $data['caption'];
        $post->post_image = $image_name;
        $post->user_id = $user_id;
        $post->save();

        return response()->json(['status' => 'success', 'message' => 'Post added successfully'], 201);
    }
}
