<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call([
            UserSeeder::class,
            AdminSeeder::class,
            CompanySeeder::class,
            CategorySeeder::class,
            // ItemSeeder::class,
            CartSeeder::class,
            // BranchSeeder::class,
            // OrderSeeder::class,
        ]);
        Item::factory(100)->create();
    }
}
