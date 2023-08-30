const task = document.getElementById('task_name');
const modal = document.getElementById("addChecklistModal");
const saveList = document.getElementById('save_list')
const closeModalBtn = document.querySelector(".modal-header .close");
const selectListTask = document.getElementById('selectListTask');
const titleList = document.getElementById('title_list');
const tbody = document.getElementById('tbody');
const modalLogin = document.getElementById('modal_login');
const closeModalLogin = document.getElementById('fechar_modal_login');
let id = null;
var token = null;

document.getElementById('new_list').addEventListener('click', () => {
    if (!token){
        modalLogin.style.display = "block";
        return;
    }

    modal.style.display = "block";
});

closeModalBtn.addEventListener("click", function() {
    modal.style.display = "none";
});

closeModalLogin.addEventListener("click", function() {
    modalLogin.style.display = "none";
});

saveList.addEventListener('click', () => {
    const url = '/api/tarefa/save_list';
    const data = {
        name: document.getElementById('name_list').value,
        };

        axios.post(url, data)
      .then(response => {
        Swal.fire('Feito!', 'A lista foi criada com sucesso', 'success')
        modal.style.display = "none";
      })
});

selectListTask.addEventListener('focus', () => {
    axios.get('/api/tarefa/atualiza_list')
    .then(response => {
        populateSelectListTask(selectListTask, response.data);
    })
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
    document.getElementById('container').hidden = false;
    titleList.innerHTML = selectListTask.selectedOptions[0].textContent;
    id = selectListTask.selectedOptions[0].value;
    tbody.innerHTML = '';
    const url = `/api/tarefa/mostra_task/${id}`;

    axios.get(url)
      .then(response => {
        data = response.data;
        data.forEach(item => {
            adicionaTask(item.name, item.id, item.active);
        })
      })
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

    const url = '/api/tarefa/save_task';
    const data = {
        name: document.getElementById('name_task').value,
        id: id,
        };
    axios.post(url, data)
      .then(response => {
        adicionaTask(document.getElementById('name_task').value, response.data.task_id);
      })
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
    addChecked(tr, td, active);
    addEdit(tr, td);
    addDestroy(tr, td);
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

    td.appendChild(input);
    addEventEdit()
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
        const url = '/api/tarefa/edit_task';
        const data = {
            name: elementoPai.querySelector('.input-name').value,
            id: elementoPai.querySelector('.id-task').value,
            };
        axios.post(url, data)
          .then(response => {
            elementoPai.querySelector('.input-name').hidden = true;
            elementoPai.querySelector('.name').hidden = false;
            elementoPai.querySelector('.name').innerHTML =  elementoPai.querySelector('.input-name').value;
          })
    });
}

function addDestroy(tr, td) {
    tr.appendChild(td);
    let input = document.createElement('button');
    input.setAttribute('class', 'btn btn-danger m-1 fa fa-remove delete-task');

    td.appendChild(input);
    addEventDestroy();
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
            const url = `/api/tarefa/delete_task/${elementoPai.querySelector('.id-task').value}`;

        axios.post(url)
              .then(response => {
                Swal.fire(
                    'Deleted!',
                    'Tarefa foi deletada.',
                    'success'
                  )
                elementoPai.innerHTML = '';
              })
        }
      })
}

function addChecked(tr, td, active) {
    tr.appendChild(td);
    let input = document.createElement('button');
    let activeClass = active ? 'btn-primary' : 'btn-secondary';
    input.setAttribute('class', 'btn ' + activeClass + ' m-1 fa-solid fa-check check-task');
    input.checked = active;

    td.appendChild(input);

    addEventChecked();
}

function addEventChecked() {
     document.querySelectorAll('.check-task').forEach(task => {
        task.addEventListener('click', checkTask);
     })
}

function checkTask(e) {
    if (e.target.classList.contains('btn-secondary')) {
        e.target.classList.remove('btn-secondary');
        e.target.classList.add('btn-primary');
    } else {
        e.target.classList.remove('btn-primary');
        e.target.classList.add('btn-secondary');
    }

    bool = e.target.classList.contains('btn-primary');

    const elementoPai = e.target.parentNode.parentNode;
    const url = `/api/tarefa/check_task/${elementoPai.querySelector('.id-task').value}`;
    const data = {
        active: bool,
        };
    axios.post(url, data)
      .then(response => {
      })
}
