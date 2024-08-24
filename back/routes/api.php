<?php

use App\Http\Controllers\AuthController;
// use App\Http\Controllers\BranchController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\Admin;
use App\Http\Middleware\AdminOrSeller;
use App\Http\Middleware\AdminOrUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//users
Route::apiResource('users',UserController::class);
Route::get('users/get/{page}',[UserController::class, 'index']);
Route::post('users', [UserController::class, 'store'])->middleware(Admin::class);
Route::put('users', [UserController::class, 'update'])->middleware(Admin::class);
Route::delete('users',[UserController::class, 'delete'])->middleware(Admin::class);

//branches
// Route::apiResource('branches',BranchController::class);
// Route::post('branches', [BranchController::class, 'store'])->middleware(Admin::class);
// Route::put('branches', [BranchController::class, 'update'])->middleware(Admin::class);
// Route::delete('branches', [BranchController::class, 'delete'])->middleware(Admin::class);

//categories
Route::apiResource('categories',CategoryController::class);
Route::post('categories', [CategoryController::class, 'store'])->middleware(Admin::class);
Route::get('categories/showItems/{title}/{page}', [CategoryController::class, 'showCategoryItems']);
Route::put('categories', [CategoryController::class, 'update'])->middleware(Admin::class);
Route::delete('categories',[CategoryController::class, 'delete'])->middleware(Admin::class);

//companies
Route::apiResource('companies',CompanyController::class);
Route::post('companies', [CompanyController::class, 'store'])->middleware(AdminOrSeller::class);
Route::put('companies', [CompanyController::class, 'update'])->middleware(AdminOrSeller::class);
Route::delete('companies',[CompanyController::class, 'delete'])->middleware(AdminOrSeller::class);

//items
Route::apiResource('items',ItemController::class);
Route::get('items/get/{page}',[ItemController::class, 'index']);
Route::get('items/search/{search}',[ItemController::class, 'itemSearch']);
Route::post('items',[ItemController::class, 'store'])->middleware(AdminOrSeller::class);
Route::put('items', [ItemController::class, 'update'])->middleware(AdminOrSeller::class);
Route::delete('items', [ItemController::class, 'delete'])->middleware(AdminOrSeller::class);

// carts
Route::apiResource('carts',CartController::class);
Route::post('carts', [CartController::class, 'store'])->middleware(AdminOrUser::class);
Route::put('carts', [CartController::class, 'update'])->middleware(AdminOrUser::class);
// Route::delete('carts', [CartController::class, 'delete'])->middleware(AdminOrUser::class);
Route::post('carts/clear/{cart}', [CartController::class, 'clear'])->middleware(AdminOrUser::class);
Route::post('carts/deleteItem/{cart}', [CartController::class, 'deleteCartItem'])->middleware(AdminOrUser::class);


//orders
Route::apiResource('orders',OrderController::class);
Route::post('orders', [OrderController::class, 'store'])->middleware(AdminOrUser::class);
Route::put('orders', [OrderController::class, 'update'])->middleware(Admin::class);

//auth
Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
//add middlewares
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth');
    Route::post('refresh', [AuthController::class, 'refresh'])->middleware('auth');
    Route::post('me', [AuthController::class, 'me'])->middleware('auth');

});