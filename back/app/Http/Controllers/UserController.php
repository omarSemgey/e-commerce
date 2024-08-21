<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Cart;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($skip)
    {
        $users = User::skip($skip == 1 ? 0 : $skip * 10)->limit(20)->with('orders')->get();
        $count = count(User::all());
        return response()->json([
            'status' => 'success',
            'users' => $users,
            'count' => $count
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        try{
            DB::beginTransaction();
    
            $hashedPass = Hash::make($request->password);

            $user= User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => $hashedPass,
                'role' => $request->role,
            ]);

            if($user->role == 1){
                $cart= Cart::create([
                    'user_id' => $user->id,
                ]);
            }

            DB::commit();
            return response()->json([
                'status' => 'success',
                'message' => 'user created successfully',
            ]);

        }catch(\Throwable $err){
            DB::rollBack();
            return response()->json([
                'status' => 'error',
            ]);
        };
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = User::with('orders','cart')->find($id);
        if($user == null){
            return response()->json([
                'status' => 'error',
                'message' => 'user doesnt exist',
            ]);
        }
        return response()->json([
            'status' => 'success',
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, $id)
    {
        $user = User::find($id);
        if($user == null){
            return response()->json([
                'status' => 'error',
                'message' => 'user doesnt exist',
            ],404);
        }

        $newData=[];

        if(isset($request->name)){
            $newData['name'] = $request->name;
        };

        if(isset($request->email)){
            $newData['email'] = $request->email;
        };

        if(isset($request->password)){
            $hashedPass = Hash::make($request->password);
            $newData['password'] = $hashedPass;
        };

        try{
            DB::beginTransaction();
            $user->update($newData);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'user' => 'user updated successfully',
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
    public function destroy($id)
    {
        $user = User::with('cart')->find($id);

        $cart = Cart::find($user['cart']['id']);

        if($user == null || $cart == null){
            return response()->json([
                'status' => 'error',
                'message' => 'user doesnt exist',
            ]);
        }

        try{
            DB::beginTransaction();

            $cart->delete();
            $user->delete();

            DB::commit();
            return response()->json([
                'status' => 'success',
                'message' => 'user deleted successfully'
            ]);
        }catch(\Throwable $err){
            DB::rollBack();
            return response()->json([
                'status' => $err,
            ]);
        };
    }
}
