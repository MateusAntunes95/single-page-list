<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\CheckList;
use App\Models\Task;

class TaskControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    private $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $token = auth()->login($this->user);
        $this->withHeaders(['Authorization' => 'Bearer ' . $token]);
    }

    public function testCreateCheckList()
    {
        $data = ['name' => $this->faker->word, 'user_id' => $this->user->id];


        $this->post('/api/tarefa/save_list', $data)
            ->assertStatus(201)
            ->assertJson(['message' => 'Lista criada com sucesso']);
    }

    public function testShowCheckLists()
    {
        $checklist = CheckList::factory()->create(['user_id' => $this->user->id]);

        $this->get('/api/tarefa/atualiza_list')
            ->assertStatus(200)
            ->assertJsonFragment(['name' => $checklist->name]);
    }

    public function testCreateTask()
    {
        $checklist = CheckList::factory()->create();
        $data = ['name' => $this->faker->word, 'id' => $checklist->id];

        $this->post('/api/tarefa/save_task', $data)
            ->assertStatus(201)
            ->assertJson(['message' => 'Tarefa criada com sucesso']);
    }

    public function testShowTasks()
    {
        $task = Task::factory()->create();

        $this->get('/api/tarefa/mostra_task/' . $task->check_list_id)
            ->assertStatus(200)
            ->assertJsonFragment(['name' => $task->name]);
    }

    public function testEditTask()
    {
        $task = Task::factory()->create();
        $newName = $this->faker->word;

        $data = ['id' => $task->id, 'name' => $newName];

        $this->post('/api/tarefa/edit_task', $data)
            ->assertStatus(200)
            ->assertJson(['message' => 'Tarefa atualizada com sucesso']);

        $this->assertEquals($newName, $task->fresh()->name);
    }

    public function testDeleteTask()
    {
        $task = Task::factory()->create();

        $this->post('/api/tarefa/delete_task/' . $task->id, [])
            ->assertStatus(200)
            ->assertJson(['message' => 'Tarefa excluída com sucesso']);
    }

    public function testCheckTask()
    {
        $task = Task::factory()->create();
        $newStatus = !$task->active;

        $data = ['active' => $newStatus];

        $this->post('/api/tarefa/check_task/' . $task->id, $data)
            ->assertStatus(200)
            ->assertJson(['message' => 'Tarefa marcada como feita com sucesso']);

        $this->assertEquals($newStatus, $task->fresh()->active);
    }
}
