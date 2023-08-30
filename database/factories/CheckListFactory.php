<?php

namespace Database\Factories;

use App\Models\CheckList;
use Illuminate\Database\Eloquent\Factories\Factory;

class CheckListFactory extends Factory
{
    protected $model = CheckList::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word,
        ];
    }
}
