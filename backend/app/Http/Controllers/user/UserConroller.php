<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class UserConroller extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $nbOfFollower = $user->followers()->count();
        $nbOfFollowing = $user->followings()->count();
        $posts = Post::where('user_id', $user->id)->get();
        return response()->json([
            'status' => 'success',
            'data' => [
                'user' => $user,
                'posts' => $posts,
                'nbOfFollower' => $nbOfFollower,
                'nbOfFollowing' => $nbOfFollowing
            ]
        ]);
    }
    public function update($id, Request $request)
    {
        $user = User::findOrFail($id);
        $data = $request->validate([
            'bio' => ['string', 'required'],
            'profile_image' => ['string']
        ]);

        if ($request->has('profile_image')) {
            $imageData = $data['profile_image'];


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
        }
        $user->profile_image = $imageName;
        $user->bio = $request->bio;
        $user->save();
        return response()->json(['status' => 'success', 'message' => 'Profile updated successfully']);
    }
}
