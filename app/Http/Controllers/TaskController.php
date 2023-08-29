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

    public function updateList()
    {
        $checklists = Checklist::select('id', 'name')->get();
        return response()->json($checklists);
    }

    public function show(Task $task)
    {
        //
    }

    public function edit(Task $task)
    {
        //
    }

    public function update(Request $request, Task $task)
    {
        //
    }

    public function destroy(Task $task)
    {
        //
    }
}
