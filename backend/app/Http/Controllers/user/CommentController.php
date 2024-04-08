<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store($id, Request $request)
    {
        $data = $request->validate([
            'content' => ['required', 'string', 'max:200', 'min:1']
        ]);
        $comment = new Comment();
        $comment->content = $data['content'];
        $comment->post_id = $id;
        $comment->user_id = auth()->id();
        $comment->save();
        return response()->json(['status' => 'success']);
    }
}
