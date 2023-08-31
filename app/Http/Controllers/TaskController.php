<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\CheckList;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TaskController extends Controller
{
    public function index()
    {
        return view('task.index');
    }

    public function saveList(Request $request)
    {
        try {
            $this->validate($request, [
                'name' => 'required|max:255',
            ]);
            $checkList = new CheckList();
            $checkList->name = $request->input('name');
            $checkList->user_id = auth()->user()->id;

            $checkList->save();

            return response()->json(['message' => 'Lista criada com sucesso'], 201);
        } catch (ValidationException $e) {
            return response()->json(['error' => 'Falha nas validações', 'details' => $e->errors()], 400);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Ocorreu um erro ao criar lista'], 500);
        }
    }

    public function showList()
    {
        $checklists = CheckList::select('id', 'name')->where('user_id', auth()->user()->id)->get();

        return response()->json($checklists);
    }

    public function saveTask(Request $request)
    {
        try {
            $this->validate($request, [
                'name' => 'required|max:255',
                'id' => 'required|exists:check_lists,id',
            ]);
            $task = new Task();
            $task->name = $request->input('name');
            $task->check_list_id = $request->input('id');
            $task->save();

            return response()->json(['message' => 'Tarefa criada com sucesso', 'task_id' => $task->id], 201);
        } catch (ValidationException $e) {
            return response()->json(['error' => 'Falha nas validações', 'details' => $e->errors()], 400);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Ocorreu um erro ao salvar a tarefa'], 500);
        }
    }

    public function showTask($id)
    {
        $tasks = Task::select(['id', 'name', 'active'])->where('check_list_id', $id)->get();

        return response()->json($tasks);
    }

    public function editTask(Request $request)
    {
        try {
            $this->validate($request, [
                'id' => 'required|exists:tasks,id',
                'name' => 'required|max:255',
            ]);

            $task = Task::find($request['id']);
            $task->name = $request['name'];
            $task->save();

            return response()->json(['message' => 'Tarefa atualizada com sucesso'], 200);
        } catch (ValidationException $e) {
            return response()->json(['error' => 'Falha nas validações', 'details' => $e->errors()], 400);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Ocorreu um erro ao atualizar a tarefa'], 500);
        }
    }

    public function destroyTask(Request $request)
    {
        try {
            Task::find($request['id'])->delete();

            return response()->json(['message' => 'Tarefa excluída com sucesso'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Ocorreu um erro ao excluir a tarefa'], 500);
        }
    }

    public function checkTask($id, Request $request)
    {
        try {
            $this->validate($request, [
                'active' => 'required|boolean',
            ]);

            $task = Task::find($id);
            $task->active = $request['active'];
            $task->save();

            return response()->json(['message' => 'Tarefa marcada como feita com sucesso'], 200);
        } catch (ValidationException $e) {
            return response()->json(['error' => 'Falha nas validações', 'details' => $e->errors()], 400);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Ocorreu um erro ao marcar a tarefa como feita'], 500);
        }
    }
}
