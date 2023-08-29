<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\CheckList;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
      return view('task.index');
    }

    public function saveList(Request $request)
    {
        $checkList = new CheckList();
        $checkList->name = $request['name'];

        $checkList->save();

        return response()->json(['valid' => true], 200);
    }

    public function showList()
    {
        $checklists = Checklist::select('id', 'name')->get();

        return response()->json($checklists);
    }

    public function saveTask(Request $request)
    {
        $task = new Task();
        $task->name = $request['name'];
        $task->check_list_id = $request['id'];

        $task->save();

        return response()->json(['valid' => true, 'task_id' => $task->id], 200);
    }

    public function showTask($id)
    {
        $task = Task::select(['id', 'name', 'active'])->where('check_list_id', $id)->get();

        return response()->json($task);
    }

    public function editTask(Request $request)
    {
        $task = Task::find($request['id']);
        $task->name = $request['name'];

        $task->save();

        return response()->json(['valid' => true], 200);
    }

    public function destroyTask(Request $request)
    {
        Task::find($request['id'])->delete();

        return response()->json(['valid' => true], 200);
    }

    public function checkTask($id, Request $request)
    {
        info($request->all());
        $task = Task::find($id);
        $task->active = $request['active'];
        $task->save();

        return response()->json(['valid' => true], 200);

    }
}
