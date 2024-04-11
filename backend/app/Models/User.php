<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    public function followings()
    {
        return $this->belongsToMany(User::class, 'follows', 'follower_id', 'following_id');
    }
    public function followers()
    {
        return $this->belongsToMany(User::class, 'follows', 'following_id', 'follower_id');
    }
    public function establishRelationshipsByDepth()
    {
        $potentialMatches = [];

        // Get the users that the current user follows
        $followedUsers = $this->followings()->get();

        // Iterate over each followed user
        foreach ($followedUsers as $followedUser) {
            // Get the users that the followed user follows (depth of 2)
            $secondLevelFollowers = $followedUser->followings()->get();

            // Iterate over each user in the second level of following
            foreach ($secondLevelFollowers as $secondLevelFollower) {
                // Skip if the second level follower is the current user
                if ($secondLevelFollower->id === $this->id) {
                    continue;
                }

                // Establish a relationship between the current user and the second level follower
                // Only if they are not already following each other directly
                if (!$this->followings()->where('following_id', $secondLevelFollower->id)->exists()) {
                    $potentialMatches[] = [
                        'recommended_users' => $secondLevelFollower
                    ];
                }
            }
        }

        return $potentialMatches;
    }
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public function getJWTCustomClaims()
    {
        return [];
    }
}
