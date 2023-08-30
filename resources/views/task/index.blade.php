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
            <button id="new_list" class="btn btn-dark"><i class="fa-solid fa-list-check"></i> Criar nova lista de tarefa</button>
        </div>
    </div>
    <div id="container" class="container mt-4 " hidden>
            <div class="card border-secondary">
                <div class="card-header bg-secondary text-white">
                    <h5 id="title_list" class="mb-0">Tarefas</h5>
                </div>
                <div class="form-group p-3">
                    <div class="row">
                        <div class="col">
                            <input id="name_task" placeholder="Sua tarefa" class="form-control" type="text">
                        </div>
                        <div class="col-auto">
                            <button id="new_task" type="button" class="btn btn-dark"> <i class="fa-solid fa-plus"></i> Adicionar tarefa </button>
                        </div>
                    </div>
                </div>
                <div class="p-3">
                    <table class="table table-bordered table-striped">
                            <tbody id="tbody"></tbody>
                    </table>
                </div>
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
