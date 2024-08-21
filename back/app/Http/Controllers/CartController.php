<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Http\Requests\StoreCartRequest;
use App\Http\Requests\UpdateCartRequest;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index()
    // {
    //     $carts = Cart::with('user', 'items')->limit(10)->get();

    //     return response()->json([
    //         'status' => 'success',
    //         'carts' => $carts
    //     ]);
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCartRequest $request)
    {
        try{
            // return $request;
            DB::beginTransaction();

            $cart= Cart::create([
                'user_id' => $request->user_id,
            ]);

            DB::commit();
            return response()->json([
                'status' => 'success',
                'message' => 'cart created successfully',
            ]);

        }catch(\Throwable $err){
            DB::rollBack();
            return response()->json([
                'status' => $err,
            ]);
        };
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //relation
        $cart = Cart::with('items','user')->find($id);

        if($cart == null){
            return response()->json([
                'status' => 'error',
                'error' => 'cart doesnt exist',
            ],404);
        }

        return response()->json([
            'status' => 'success',
            'cart' => $cart
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCartRequest $request, $id)
    {
        $cart= Cart::find($id);

        if($cart == null){
            return response()->json([
                'status' => 'error',
                'error' => 'cart doesnt exist',
            ],404);
        } 

        try{

            DB::beginTransaction();

                $currentItem= Item::find($request->item);

                if($currentItem == null){
                    return response()->json([
                        'status' => 'error',
                        'error' => 'item doesnt exist',
                    ],404);
                } 

                if($currentItem->count - 1 < 0){
                    return response()->json([
                        'status' => 'error',
                        'error' => 'item is already finished',
                    ],400);
                }

                $currentItem->update([
                    'count' =>$currentItem->count - 1,
                ]);


            $cart->items()->syncWithoutDetaching($request->item);

            DB::commit();
            return response()->json([
                'status' => 'success',
                'message' => 'item added to cart successfully',
            ]);

        }catch(\Throwable $err){
            DB::rollBack();
            return response()->json([
                'status' => $err,
            ]);
        };

    }

    /**
     * Delete carts item.
     */
    public function deleteCartItem(Request $request, $id)
    {
        $validated = $request->validate([
            'item' => 'required|integer'
        ]);

        $cart = Cart::find($id);
        $currentItem= Item::find($validated['item']);

        if($cart == null){
            return response()->json([
                'status' => 'error',
                'error' => 'cart doesnt exist',
            ],404);
        } 

        if($currentItem == null){
            return response()->json([
                'status' => 'error',
                'error' => 'item doesnt exist',
            ],404);
        } 

        try{
            DB::beginTransaction();

            $currentItem->update([
                'count' =>$currentItem->count + 1,
            ]);

            $cart->items()->detach($validated['item']);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'cart item deleted successfully',
            ]);
        }catch(\Throwable $err){

            DB::rollBack();

            return response()->json([
                'status' => $err,
            ],400);
        };

    }

    /**
     * Clear carts items.
     */
    public function clear($id)
    {
        $cart = Cart::find($id);

        if($cart == null){
            return response()->json([
                'status' => 'error',
                'error' => 'cart doesnt exist',
            ],404);
        } 

        try{
            DB::beginTransaction();

            $cart->items()->detach($cart->getItemsId());

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'cart cleared successfully',
            ]);
        }catch(\Throwable $err){

            DB::rollBack();

            return response()->json([
                'status' => $err,
            ],400);
        };

    }

    /**
     * Remove the specified resource from storage.
     */
    // public function destroy(Request $request ,$id)
    // {
    //     // return $request;
    //     $cart = Cart::find($id);
    //     return $cart;

    //     if($cart == null){
    //         return response()->json([
    //             'status' => 'error',
    //             'error' => 'cart doesnt exist',
    //         ],404);
    //     } 

    //     try{
    //         DB::beginTransaction();

    //         // $cart->detach($request->items);

    //         DB::commit();

    //         return response()->json([
    //             'status' => 'success',
    //             'message' => 'cart deleted successfully',
    //         ]);
    //     }catch(\Throwable $err){

    //         DB::rollBack();

    //         return response()->json([
    //             'status' => 'error',
    //         ]);
    //     };

    // }
}
