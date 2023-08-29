const task = document.getElementById('task_name');
const modal = document.getElementById("addChecklistModal");
const saveList = document.getElementById('save_list')
const closeModalBtn = document.querySelector(".modal-header .close");
const selectListTask = document.getElementById('selectListTask');
const titleList = document.getElementById('title_list');
const tbody = document.getElementById('tbody');
let id = null;


document.getElementById('new_list').addEventListener('click', () => {
    modal.style.display = "block";
});

closeModalBtn.addEventListener("click", function() {
    modal.style.display = "none";
});

saveList.addEventListener('click', () => {
    const url = '/tarefa/save_list';
    const method = 'POST';
    const data = {
        name: document.getElementById('name_list').value,
        };


    ajaxRequest(url, method, data)
      .then(response => {
        Swal.fire('Feito!', 'A lista foi criada com sucesso', 'success')
        modal.style.display = "none";
      })
      .catch(error => {
      });
});

selectListTask.addEventListener('focus', () => {
    const url = '/tarefa/atualiza_list';
    const method = 'GET';

    ajaxRequest(url, method)
      .then(response => {
        populateSelectListTask(selectListTask, response);
      })
      .catch(error => {
      });
})

function populateSelectListTask(selectElement, data) {
    selectElement.innerHTML = '';

    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name;
        selectElement.appendChild(option);
    });
}

selectListTask.addEventListener('change', (e) => {
    titleList.innerHTML = selectListTask.selectedOptions[0].textContent;
    id = selectListTask.selectedOptions[0].value;
    tbody.innerHTML = '';

    const url = `/tarefa/mostra_task/${id}`;
    const method = 'GET';

    ajaxRequest(url, method)
      .then(response => {
        response.forEach(item => {
            adicionaTask(item.name, item.id, item.active);
        })
      })
      .catch(error => {
      });
})

document.getElementById('new_task').addEventListener('click', saveTask);


function saveTask() {
    if (document.getElementById('name_task').value == null) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Não pode adicionar tarefa vazia!',
          })

          return
    }
    const url = '/tarefa/save_task';
    const method = 'POST';
    const data = {
        name: document.getElementById('name_task').value,
        id: id,
        };
        ajaxRequest(url, method, data)
      .then(response => {
        Swal.fire('Feito!', 'A tarefa foi criada com sucesso', 'success');
        adicionaTask(document.getElementById('name_task').value, response.task_id);
      })
      .catch(error => {
      });

}

function adicionaTask(name, id = null, active = false) {
    let tr = document.createElement('tr');
    tbody.appendChild(tr);
    addName(tr, name, id);
    addElement(tr, active)

}

function addElement(tr, active) {
    let td = document.createElement('td');
    tr.appendChild(td);
    addEdit(tr, td);
    addDestroy(tr, td);
    addChecked(tr, td, active);
}
function addName(tr, name, id) {
    let td = document.createElement('td');
    td.classList.add('col-md-10');
    tr.appendChild(td);
    let input = document.createElement('p');
    input.setAttribute('class', 'name');
    input.innerHTML = name;

    let input2 = document.createElement('input');
    input2.setAttribute('class', 'form-control input-name');
    input2.setAttribute('value', name);
    input2.setAttribute('hidden', 'true');

    let input3 = document.createElement('input')
    input3.setAttribute('class', 'id-task');
    input3.setAttribute('value', id);
    input3.setAttribute('hidden', 'true');


    td.appendChild(input);
    td.appendChild(input2);
    td.appendChild(input3);
    document.getElementById('name_task').value = '';
}

function addEdit(tr, td) {
    tr.appendChild(td);
    let input = document.createElement('button');
    input.setAttribute('class', 'btn btn-success m-1 fa fa-edit edit-task');
    addEventEdit()

    td.appendChild(input);
}

function addEventEdit() {
    document.querySelectorAll('.edit-task').forEach(task => {
        task.addEventListener('click', editTask);
    });
}

function editTask(e) {
    const elementoPai = e.target.parentNode.parentNode;
    elementoPai.querySelector('.input-name').hidden = false;
    elementoPai.querySelector('.name').hidden = true;
    elementoPai.querySelector('.input-name').focus();

    elementoPai.querySelector('.input-name').addEventListener('blur', () => {
        const url = '/tarefa/edit_task';
        const method = 'POST';
        const data = {
            name: elementoPai.querySelector('.input-name').value,
            id: elementoPai.querySelector('.id-task').value,
            };
            ajaxRequest(url, method, data)
          .then(response => {
            elementoPai.querySelector('.input-name').hidden = true;
            elementoPai.querySelector('.name').hidden = false;
            elementoPai.querySelector('.name').innerHTML =  elementoPai.querySelector('.input-name').value;
          })
          .catch(error => {
          });
    });
}

function addDestroy(tr, td) {
    tr.appendChild(td);
    let input = document.createElement('button');
    input.setAttribute('class', 'btn btn-danger m-1 fa fa-remove delete-task');
    addEventDestroy();

    td.appendChild(input);
}

function addEventDestroy() {
    document.querySelectorAll('.delete-task').forEach(task => {
        task.addEventListener('click', destroyTask);
    });
}

function destroyTask(e) {
    const elementoPai = e.target.parentNode.parentNode;
    Swal.fire({
        title: 'Você tem certeza?',
        text: "Você não poderá reverter essa ação!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, delete!'
      }).then((result) => {
        if (result.isConfirmed) {
            const url = `/tarefa/delete_task/${elementoPai.querySelector('.id-task').value}`;
            const method = 'POST';

                ajaxRequest(url, method)
              .then(response => {
                Swal.fire(
                    'Deleted!',
                    'Tarefa foi deletada.',
                    'success'
                  )
                elementoPai.innerHTML = '';
              })
              .catch(error => {
              });
        }
      })
}

function addChecked(tr, td, active) {
    tr.appendChild(td);
    let input = document.createElement('input');
    input.setAttribute('class', 'check-task');
    input.setAttribute('type', 'checkbox');
    input.checked = active;

    addEventChecked();

    td.appendChild(input);
}

function addEventChecked() {
     document.querySelectorAll('.check-task').forEach(task => {
        task.addEventListener('change', checkTask);
     })
}

function checkTask(e) {
    let bool = null;
    if (e.target.checked) {
        bool = true;
    } else {
        console.log('entrou aq?');
        bool = false;
    }
    const elementoPai = e.target.parentNode.parentNode;
    const url = `/tarefa/check_task/${elementoPai.querySelector('.id-task').value}`;
    const method = 'POST';
    const data = {
        active: bool,
        };
        ajaxRequest(url, method, data)
      .then(response => {
      })
      .catch(error => {
      });
}
