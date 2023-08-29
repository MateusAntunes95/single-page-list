const task = document.getElementById('task_name');
const modal = document.getElementById("addChecklistModal");
const saveList = document.getElementById('save_list')
const closeModalBtn = document.querySelector(".modal-header .close");
const selectListTask = document.getElementById('selectListTask');

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

selectListTask.addEventListener('click', () => {
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
