<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role'
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
    ];

    protected $appends = ['isActive'];

    public function getIsActiveAttribute()
    {
        if (!$this->LastActiveUserSubcription) {
            return false;
        }
        $dateNow = Carbon::now();
        $dateExpired = Carbon::create($this->LastActiveUserSubcription->expired_date);

        return $dateNow->lessThanOrEqualTo($dateExpired);
    }

   
    public function LastActiveUserSubcription() : HasOne
    {
        return $this->hasOne(UserSubcription::class)->wherePaymentStatus('paid')->latest();
    }
}
