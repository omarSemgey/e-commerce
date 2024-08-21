<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $category = Category::with('items')->get();
        $count = count(Category::all());

        return response()->json([
            'status' => 'success',
            'categories' => $category,
            'count' => $count,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        try{
            DB::beginTransaction();

            $category= Category::create([
                'title' => $request->title,
                'description' => $request->description,
            ]);

            DB::commit();
            return response()->json([
                'status' => 'success',
                'category' => 'category created successfully',
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
        $category = Category::find($id);

            $category->load(['items' => function ($query) {
            $query->orderBy('title')->limit(8);
        }]);

        if($category == null){
            return response()->json([
                'status' => 'error',
                'error' => 'category doesnt exist',
            ]);
        }

        return response()->json([
            'status' => 'success',
            'category' => $category,
        ]);
    }

        /**
     * Display the category items.
     */
    public function showCategoryItems($title,$skip)
    {
        $category = Category::withCount('items')->where('title',$title)->first();

        $category->load(['items' => function ($query) use($skip)  {
            $query->skip($skip == 1 ? 0 : $skip * 10)->orderBy('title')->limit(20);
        }]);

        if($category == null){
            return response()->json([
                'status' => 'error',
                'error' => 'category doesnt exist',
            ]);
        }

        return response()->json([
            'status' => 'success',
            'category' => $category,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, $id)
    {
        $category= Category::find($id);

        if($category == null){
            return response()->json([
                'status' => 'error',
                'error' => 'category doesnt exist',
            ]);
        }

        $newData=[];
        if(isset($request->title)){
            $newData['title'] = $request->title;
        };

        if(isset($request->description)){
            $newData['description'] = $request->description;
        };

        try{
            DB::beginTransaction();

            $category->update($newData);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'category updated successfully',
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
        $category= Category::find($id);

        if($category == null){
            return response()->json([
                'status' => 'error',
                'error' => 'category doesnt exist',
            ]);
        }

        try{
            DB::beginTransaction();

            $category->delete();

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'category deleted successfully',
            ]);
        }catch(\Throwable $err){

            DB::rollBack();

            return response()->json([
                'status' => 'error',
            ]);
        };
    }
}
