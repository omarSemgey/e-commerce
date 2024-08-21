<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($skip)
    {
        $item = Item::skip($skip == 1 ? 0 : $skip * 10)->with('category','company')->orderBy('title')->limit(20)->get();
        $count = count(Item::all());
        return response()->json([
            'status' => 'success',
            'items' => $item,
            'count' => $count
        ]);
    }

    public function itemSearch($search){
        $item =Item::where('title', 'LIKE', '%' . $search .'%')->orderBy('title')->get();
        return response()->json([
            'status' => 'success',
            'items' => $item
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreItemRequest $request)
    {
        try{
            DB::beginTransaction();

                $content=$request->content;

                $originalContentName= $content->getClientOriginalName();

                if(preg_match('/\.[^.]+\./',$originalContentName)){
                    return response()->json([
                        'status' => 'error',
                        'message' => 'content is not appropriate.',
                    ],403);
                    DB::rollBack();
                }

                $contentName= Str::random(32);
                $mimeType=$content->getClientMimeType();
                $type=explode('/',$mimeType);

                $imageName= $contentName . '.' . $type[1];

                $content->move(public_path('images'),$imageName);

                $item= Item::create([
                    'title' => $request->title,
                    'description' => $request->description,
                    'count' => $request->count,
                    'price' => $request->price,
                    'content' => 'http://127.0.0.1:8000/images/' . $imageName,
                    'company_id' => $request->company_id,
                    'category_id' => $request->category_id,
                ]);
            DB::commit();
            return response()->json([
                'status' => 'success',
                'message' => 'item created successfully',
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
        $item = Item::with('category','company')->find($id);

        if($item == null){
            return response()->json([
                'status' => 'error',
                'error' => 'item doesnt exist',
            ],404);
        }

        return response()->json([
            'status' => 'success',
            'item' => $item
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateItemRequest $request, $id)
    {
        $item= Item::find($id);

        if($item == null){
            return response()->json([
                'status' => 'error',
                'error' => 'item doesnt exist',
            ],404);
        } 

        $newData=[];
        if(isset($request->title)){
            $newData['title'] = $request->title;
        };

        if(isset($request->content)){
            $content=$request->content;

            $originalContentName= $content->getClientOriginalName();

            if(preg_match('/\.[^.]+\./',$originalContentName)){
                throw new Exception(trans('general.notAllowedAction'),403);
            }

            $contentName= Str::random(32);
            $mimeType=$content->getClientMimeType();
            $type=explode('/',$mimeType);

            $imageName= $contentName . '.' . $type[1];

            $content->move(public_path('images'),$imageName);

            $newData['content'] = 'http://127.0.0.1:8000/images/' . $imageName;
        };

        if(isset($request->description)){
            $newData['description'] = $request->description;
        };

        if(isset($request->count)){
            $newData['count'] = $request->count;
        };

        if(isset($request->price)){
            $newData['price'] = $request->price;
        };

        if(isset($request->company_id)){
            $newData['company_id'] = $request->company_id;
        };

        if(isset($request->category_id)){
            $newData['category_id'] = $request->category_id;
        };


        try{
            DB::beginTransaction();

            $item->update($newData);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'item updated successfully',
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
        $item = Item::find($id);

        if($item == null){
            return response()->json([
                'status' => 'error',
                'error' => 'item doesnt exist',
            ],404);
        } 

        try{
            DB::beginTransaction();

            $item->delete();

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'item deleted successfully',
            ]);
        }catch(\Throwable $err){

            DB::rollBack();

            return response()->json([
                'status' => 'error',
            ]);
        };

    }
}
