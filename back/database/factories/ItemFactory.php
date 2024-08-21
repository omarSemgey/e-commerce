<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title'=> $this->faker->sentence(),
            'content'=>'http://127.0.0.1:8000/images/test.jpeg',
            'count'=>$this->faker->randomDigitNotNull(),
            'price'=>$this->faker->randomDigitNotNull(),
            'description'=>'this is item',
            'company_id'=>1,
            'category_id'=>1,
        ];
    }
}
