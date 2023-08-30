<?php

namespace Database\Factories;

use App\Models\CheckList;
use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'check_list_id' => function () {
                return CheckList::factory()->create()->id;
            }
        ];
    }
}
