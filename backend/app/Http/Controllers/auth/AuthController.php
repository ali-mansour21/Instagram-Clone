<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:50'],
            'user_name' => ['required', 'string', Rule::unique('users', 'user_name')],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users', 'email')],
            'password' => ['required', 'string', 'min:6', 'max:18'],
            'profile_image' => ['image', 'mimes:jpeg,png,jpg,gif,svg']
        ]);
        $user = new User();
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

        $token = Auth::login($user);
        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }
    public function login(Request $request)
    {
        // Validate the request
        $request->validate([
            'password' => 'required|string',
        ]);

        // Determine if the user provided an email or a username
        if ($request->has('email')) {
            $field = 'email';
        } elseif ($request->has('user_name')) {
            $field = 'user_name';
        } else {
            throw ValidationException::withMessages([
                'login_field' => ['Please provide email or username'],
            ]);
        }
        $credentials = [
            $field => $request->input($field),
            'password' => $request->input('password'),
        ];
        if (!Auth::attempt($credentials)) {
            return response()->json(['status' => 'failed', 'message' => 'Incorrect  provided email or username ']);
        }
        $user = Auth::user();
        $token = Auth::login($user);

        return response()->json([
            'status' => 'success',
            'user' => $user,
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }
    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }
}
