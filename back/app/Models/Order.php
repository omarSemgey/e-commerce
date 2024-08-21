<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Order extends Model
{
    use HasFactory;

    protected $with = ['items'];

    protected $fillable=[
        'title',
        'status',
        'price',
        'user_id',
        'branch_id',
    ];

    // public function branch()
    // {
    //     return $this->belongsTo(Branch::class,'branch_id','id');
    // }

    public function user()
    {
        return $this->belongsTo(User::class,'user_id','id');
    }

    public function items(): BelongsToMany
    {
        return $this->belongsToMany(Item::class, 'item_order', 'order_id', 'item_id')->withTimeStamps();
    }
}
