<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Item extends Model
{
    use HasFactory;

    protected $fillable=[
        'title',
        'description',
        'content',
        'count',
        'price',
        'company_id',
        'category_id',
    ];

    public function orders(): BelongsToMany
    {
        return $this->belongsToMany(Order::class, 'item_order', 'item_id', 'order_id')->withTimeStamps();;
    }

    public function carts(): BelongsToMany
    {
        return $this->belongsToMany(Cart::class, 'cart_item', 'item_id', 'cart_id')->withTimeStamps();;
    }

    public function company()
    {
        return $this->belongsTo(Company::class,'company_id','id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class,'category_id','id');
    }
}
