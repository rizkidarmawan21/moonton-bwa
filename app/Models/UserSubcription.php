<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserSubcription extends Model
{
    use HasFactory,SoftDeletes;

    protected $guarded = ['id'];

    /**
     * Get the user that owns the UserSubcription
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function subcriptionPlan()
    {
        return $this->belongsTo(SubcriptionPlan::class);
    }
}
