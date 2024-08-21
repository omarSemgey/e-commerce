<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Item;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //relation
        // $order = Order::with('branch', 'user', 'items')->limit(10)->get();
        $order = Order::with('user', 'items')->limit(10)->get();
        $count = count(Order::all());

        return response()->json([
            'status' => 'success',
            'orders' => $order,
            'count' => $count,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        try{

            DB::beginTransaction();

                $order= Order::create([
                    'status' => $request->status,
                    'price' => $request->price,
                    'user_id' => $request->user_id,
                    // 'branch_id' => $request->branch_id,
                ]);

                foreach($request->items as $item){     
                    $currentItem= Item::find($item['id']);

                    if($currentItem == null){
                        return response()->json([
                            'status' => 'error',
                            'error' => 'item doesnt exist',
                        ],404);
                    } 

                    if($currentItem->count - $item['count'] < 0){
                        return response()->json([
                            'status' => 'error',
                            'error' => 'item is already finished',
                        ],400);
                    }

                    $currentItem->update([
                        'count' =>$currentItem->count - $item['count']
                    ]);

                    $order->items()->attach($item['id']);
        }


            DB::commit();
            return response()->json([
                'status' => 'success',
                'message' => 'order created successfully',
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
        // $order = Order::with('branch')->find($id);
        $order = Order::with('items','user')->find($id);

        if($order == null){
            return response()->json([
                'status' => 'error',
                'error' => 'order doesnt exist',
            ],404);
        }

        return response()->json([
            'status' => 'success',
            'order' => $order
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, $id)
    {
        $order= Order::find($id);

        if($order == null){
            return response()->json([
                'status' => 'error',
                'error' => 'order doesnt exist',
            ],404);
        } 

        $newData=[];

        if(isset($request->status)){
            $newData['status'] = $request->status;
        };

        try{
            DB::beginTransaction();

            $order->update($newData);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'order updated successfully',
            ]);

        }catch(\Throwable $err){
            DB::rollBack();
            return response()->json([
                'status' => 'error',
            ]);
        };

    }

    /**
     * Remove the specified resource from storage.
     */
    // public function destroy($id)
    // {
    //     $order = Order::find($id);

    //     if($order == null){
    //         return response()->json([
    //             'status' => 'error',
    //             'error' => 'order doesnt exist',
    //         ],404);
    //     } 

    //     try{
    //         DB::beginTransaction();

    //         $order->delete();

    //         DB::commit();

    //         return response()->json([
    //             'status' => 'success',
    //             'message' => 'order deleted successfully',
    //         ]);
    //     }catch(\Throwable $err){

    //         DB::rollBack();

    //         return response()->json([
    //             'status' => 'error',
    //         ]);
    //     };

    // }
}
