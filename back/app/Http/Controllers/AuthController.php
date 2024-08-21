<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function login(Request $request)
    {

        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');

        $token = Auth::guard('api')->attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::guard('api')->user();
        return response()->json([
                'status' => 'success',
                'role' => $user->role,
                'authorization' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ]);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        $user = auth()->user();
        if($user == null){
            return response()->json([
                'status' => 'error',
                'user' => auth()->user(),
            ],404);
        }

        $user->load('cart');

        return response()->json([
            'status' => 'success',
            'user' => auth()->user(),
        ]);
    }

    public function register(StoreUserRequest $request)
    {
        try{

            DB::beginTransaction();
            //creating user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $request->role,
            ]);


            //logging in

            $token = Auth::guard('api')->login($user);

            //creating cart

            $cart= Cart::create([
                'user_id' => $user->id,
            ]);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'user created successfully',
                'role' => $user->role,
                'authorization' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ]);
        }catch(\Throwable $err){
            DB::rollBack();
            return response()->json([
                'status' => $err,
            ]);
        }
    }

    public function logout()
    {
        auth()->logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'authorization' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

}