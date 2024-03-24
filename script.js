const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const tasksList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')
const taskText = document.querySelectorAll('.task-title')
let tasks = []
if(localStorage.getItem("tasks")){
tasks = JSON.parse(localStorage.getItem('tasks'))
tasks.forEach(function(task){
  renderTask(task)
})
}

checkEmptyList()

// ============ ПРОСЛУШКИ ==============================
// Добавление задачи
form.addEventListener('submit', addTask)
// Удаление задачи 
tasksList.addEventListener('click', deleteTask)
// Сдаланная задача
tasksList.addEventListener('click', doneTask)

// ============ ФУНКЦИИ ================================
// ========= addTask ===================================
function addTask(e){
    e.preventDefault()//отмена отправки формы
    if(taskInput.value === '') return
    const taskText = taskInput.value
    const newTask = {
      id: Date.now(),
      text: taskText,
      done: false,
    }
    //Добавляем задачу в массив с задачами
    tasks.push(newTask)
    // Добавляем задучу в хранилище браузера LocalStorage
    saveToLocalStorage()
    // Рендарим задачу на страницу
    renderTask(newTask)
    // Формируем CSS класс
  //   const cssClass = newTask.done ? "task-title done" : "task-title"
  //   const taskHTML = `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
  //                         <span class="${cssClass}">${newTask.text}</span>
  //                         <div class="task-item__buttons">
  //                             <button type="button" data-action="done" class="btn-action button-done">
  //                                 <i class="fa-solid fa-square-check"></i>
  //                             </button>
  //                             <button type="button" data-action="delete" class="btn-action button-delete">
  //                                <i class="fa-solid fa-square-xmark"></i>
  //                             </button>
  //                         </div>
  //                     </li>`
  // tasksList.insertAdjacentHTML('beforeend', taskHTML)//добавляю задачу на страницу 
// очищаю поле ввода и возвращаю на него фокус
  taskInput.value = ''
  taskInput.focus()
// удалаю пустой лист если в списке задач более одного элемента
  // if(tasksList.children.length > 1){
  //   emptyList.classList.add('none')
  // }
  // saveHTMLtoLS() Нe верное использование localStorage
  checkEmptyList()
}
// ========= deleteTask ================================
function deleteTask(e){
if(e.target.dataset.action !== 'delete') return 
    const parentNode = e.target.closest('.list-group-item')
    const id = Number(parentNode.id) 

//====findIndex=========== Находим индекс задачи в массиве для удаления задачи из массива
// const index = tasks.findIndex(function(task){
//  if(task.id === id){
//   return true
//  }
// })
// Удаляем задучу из массива(findIndex)
// tasks.splice(index, 1)
//===filter=============== Удаляем задучу из массива через фильтрацию массива
tasks = tasks.filter(function(task){
  // if(task.id === id){
  //   return false
  // }else {
  //   return true
  // }
 return task.id !== id
})
// Добавляем задучу в хранилище браузера LocalStorage
  saveToLocalStorage()

  parentNode.remove()
// Показывае EmptyList если в нет задач
// if(tasksList.children.length === 1){
//   emptyList.classList.remove('none')
// }
// saveHTMLtoLS() На верное использование localStorage
checkEmptyList()
}
// ========= doneTask ==================================
function doneTask(e){
if(e.target.dataset.action !== 'done') return
  // Меняю цвет кнопки
  const btnColor = e.target.closest('.button-done')
  btnColor.classList.toggle('changeColor')

  const parentNode = e.target.closest('.list-group-item')
  // Определяем ID задачи
  const id = Number(parentNode.id)
  const task = tasks.find(function(task){
    if(task.id === id){
      return true
    }
  })
  task.done = !task.done
  // Добавляем задучу в хранилище браузера LocalStorage
  saveToLocalStorage()

  const taskTitle = parentNode.querySelector('.task-title')
  taskTitle.classList.toggle('done')
  // saveHTMLtoLS() На верное использование localStorage
}
// ========= checkEmptyList ============================
function checkEmptyList(){
  if(tasks.length === 0){
    const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
                               <i class="fa-solid fa-leaf"></i>
                               <div class="empty-list__title">The task list is empty</div>
                           </li>`
    tasksList.insertAdjacentHTML('beforeend', emptyListHTML)
  }
  if(tasks.length > 0){
    const emptyListEl = document.querySelector('#emptyList')
    emptyListEl ? emptyListEl.remove() : null
  }
}
// ========= saveToLocalStorage ========================
function saveToLocalStorage(){
  localStorage.setItem('tasks', JSON.stringify(tasks))
}
// ========= saveToLocalStorage ========================
function renderTask(task){

  const cssClass = task.done ? "task-title done" : "task-title"
  const btnColor = task.done ? "button-done changeColor" : "button-done"

  const taskHTML = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
                          <span class="${cssClass}">${task.text}</span>
                          <div class="task-item__buttons">
                              <button type="button" data-action="done" class="btn-action ${btnColor}">
                                  <i class="fa-solid fa-square-check"></i>
                              </button>
                              <button type="button" data-action="delete" class="btn-action button-delete">
                                 <i class="fa-solid fa-square-xmark"></i>
                              </button>
                          </div>
                      </li>`
                    
  tasksList.insertAdjacentHTML('beforeend', taskHTML)
  const changeBtnColor = function(){
   
  }
  changeBtnColor()
  // const textTask = document.querySelector('.task-title')
  // const btnColor = document.querySelector('.button-done')

 
}

//Не верное использование localStorage
// function saveHTMLtoLS(){
//   localStorage.setItem('tasksHTML', tasksList.innerHTML)
// }
// if(localStorage.getItem('tasksHTML')){
//   tasksList.innerHTML = localStorage.getItem('tasksHTML')
// }