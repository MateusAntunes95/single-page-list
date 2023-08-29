<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

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

