@extends('layout')

@section('title', 'pensando')

@section('content')
    <div class="row">
        <div class="col-sm-12">
            <label for="selectOpcoes">Escolha uma lista de Tarefas:</label>
        </div>
        <div class="col-sm-9">
            <select class="form-control" id="selectListTask"></select>
        </div>
        <div class="col-sm-3 d-grid gap-2">
            <button id="new_list" class="btn btn-primary"><i class="fa-solid fa-list-check"></i> Criar nova lista de tarefa</button>
        </div>
    </div>
    <div class="container mt-4">
            <div class="card border-primary">
                <div class="card-header bg-primary text-white">
                    <h5 id="title_list" class="mb-0">Tarefa</h5>
                </div>
                <div class="form-group">
                    <input id="name_task" placeholder="Sua tarefa" class="form-control" type="text">
                </div>
                <button id="new_task" type="button" class="btn btn success"> Adicionar tarefa </button>
               <table class="table table-bordered table-borderless">
                    <tbody id="tbody"></tbody>
               </table>
            </div>
    </div>
    <div class="modal" id="addChecklistModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Nova lista de tarefa</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <input id="name_list" type="text" class="form-control">
                </div>
                <div class="modal-footer">
                    <button id="save_list" type="button" class="btn btn-success"> Salvar </button>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="{{ asset('js/task.js?v=1') }}"></script>
@endsection
