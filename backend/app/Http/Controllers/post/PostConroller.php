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

        $data = $request->validate([
            'caption' => ['required', 'string', 'max:300'],
            'post_image' => ['required'],
        ]);


        $imageData = $data['post_image'];


        if (preg_match('/^data:(image\/[a-z]+);base64,/', $imageData, $matches)) {
            $mimeType = $matches[1];


            $imageData = str_replace($matches[0], '', $imageData);
        } else {
            return response()->json(['status' => 'error', 'message' => 'Invalid image data'], 400);
        }

        $imageData = str_replace(' ', '+', $imageData);

        $imageData = base64_decode($imageData);


        $extensions = [
            'image/jpeg' => 'jpg',
            'image/png' => 'png',
            'image/gif' => 'gif',

        ];

        $fileExtension = $extensions[$mimeType] ?? 'jpg';

        $imageName = Str::random(32) . '.' . $fileExtension;

        Storage::disk('public')->put($imageName, $imageData);

        $post = new Post();
        $post->caption = $data['caption'];
        $post->post_image = $imageName;
        $post->user_id = auth()->id();
        $post->save();

        return response()->json(['status' => 'success', 'message' => 'Post added successfully'], 201);
    }
}
