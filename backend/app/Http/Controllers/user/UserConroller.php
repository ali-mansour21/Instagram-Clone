<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class UserConroller extends Controller
{
    public function update($id, Request $request)
    {
        $user = User::findOrFail($id);
        $data = $request->validate([
            'name' => ['string', 'max:50'],
            'user_name' => ['string', Rule::unique('users', 'user_name')->ignore($id)],
            'email' => ['string', 'email', 'max:255', Rule::unique('users', 'email')->ignore($id)],
            'password' => ['string', 'min:6', 'max:18'],
            'profile_image' => ['image', 'mimes:jpeg,png,jpg,gif,svg']
        ]);
        $user->name = $request->name;
        $user->user_name = $request->user_name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        if ($request->has('profile_image')) {
            $image_name = Str::random(32) . "." . $request->profile_image->getClientOriginalExtension();
            Storage::disk('public')->put($image_name, file_get_contents($request->profile_image));
            $user->profile_image = $image_name;
        }
        $user->save();
        return response()->json(['status' => 'success', 'message' => 'Profile updated successfully']);
    }
}
