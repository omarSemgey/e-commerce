<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('items')->insert([
            'title'=>'item',
            'content'=>'http://127.0.0.1:8000/images/test.jpeg',
            'count'=>30,
            'price'=>50,
            'description'=>'this is item',
            'company_id'=>1,
            'category_id'=>1,
        ]);
    }
}
