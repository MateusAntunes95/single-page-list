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

Route::middleware(['jwt.auth'])->group(function () {
    Route::post('/tarefa/save_list', [TaskController::class, 'saveList']);
    Route::get('/tarefa/atualiza_list', [TaskController::class, 'showList']);
    Route::post('/tarefa/save_task', [TaskController::class, 'saveTask']);
    Route::get('/tarefa/mostra_task/{id}', [TaskController::class, 'showTask']);
    Route::post('/tarefa/edit_task', [TaskController::class, 'editTask']);
    Route::post('/tarefa/delete_task/{id}', [TaskController::class, 'destroyTask']);
    Route::post('/tarefa/check_task/{id}', [TaskController::class, 'checkTask']);
});

Route::get('/tarefa', [TaskController::class, 'index']);
