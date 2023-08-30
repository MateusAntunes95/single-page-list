<?php

use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', function(Request $request) {
    $credentials = $request->only(['email', 'password']);

    if (! $token = auth()->attempt($credentials)) {
        abort(401, 'Não autorizado');
    }

    return response()->json([
        'data' => [
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 120
        ]
    ]);
});

Route::controller(TaskController::class)->group(function () {
    Route::get('/tarefa', 'index');
    Route::post('/tarefa/save_list', 'saveList');
    Route::get('/tarefa/atualiza_list', 'showList');
    Route::post('/tarefa/save_task', 'saveTask');
    Route::get('/tarefa/mostra_task/{id}', 'showTask');
    Route::post('/tarefa/edit_task', 'editTask');
    Route::post('/tarefa/delete_task/{id}', 'destroyTask');
    Route::post('/tarefa/check_task/{id}', 'checkTask');
});
