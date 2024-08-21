<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Http\Requests\StoreCompanyRequest;
use App\Http\Requests\UpdateCompanyRequest;
use Illuminate\Support\Facades\DB;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $company = Company::with('items')->limit(10)->get();
        $count = count(Company::all());


        return response()->json([
            'status' => 'success',
            'companies' => $company,
            'count' => $count,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCompanyRequest $request)
    {
        try{
            DB::beginTransaction();

            $company= Company::create([
                'title' => $request->title,
                'description' => $request->description,
            ]);

            DB::commit();
            return response()->json([
                'status' => 'success',
                'company' => 'company created successfully',
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
        $company = Company::find($id);

        if($company == null){
            return response()->json([
                'status' => 'error',
                'error' => 'company doesnt exist',
            ]);
        }

        return response()->json([
            'status' => 'success',
            'company' => $company,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCompanyRequest $request, $id)
    {
        $company= Company::find($id);

        if($company == null){
            return response()->json([
                'status' => 'error',
                'error' => 'company doesnt exist',
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

            $company->update($newData);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'company updated successfully',
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
        $company= Company::find($id);

        if($company == null){
            return response()->json([
                'status' => 'error',
                'error' => 'company doesnt exist',
            ]);
        }

        try{
            DB::beginTransaction();

            $company->delete();

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'company deleted successfully',
            ]);
        }catch(\Throwable $err){

            DB::rollBack();

            return response()->json([
                'status' => 'error',
            ]);
        };
    }
}
