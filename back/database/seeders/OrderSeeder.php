<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('orders')->insert([
            'status'=>0,
            'price'=>32,
            'user_id'=>1,
            // 'branch_id'=>1,
        ]);
    }
}
