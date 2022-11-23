let priorities = ['Low', 'Medium', 'High']

document.addEventListener("DOMContentLoaded", () => {
  // your code here
  let form = document.querySelector('#create-task-form')
  let createNewTaskButton = document.querySelector('input[type="submit"]')
  let priorityDropdown = document.createElement('select')
  let priorityLabel = document.createElement('label')
  let userField = document.createElement('input')
  let userLabel = document.createElement('label')
  
  generatePriorityDropdown();
  generateUserField();
  
  form.addEventListener('submit', e => {
    e.preventDefault()
    let taskName = document.querySelector('input#new-task-description').value
    let priority = document.querySelector('select#new-task-priority').value
    let user = document.querySelector('input#new-task-user').value


    addToTaskList(taskName, priority, user)
    form.reset()
  })

  function generatePriorityDropdown() {
    
    priorityLabel.selected = 'green'
    priorityLabel.textContent = ' Priority: '
    
    priorityDropdown.id = 'new-task-priority'

    priorities.forEach(priority => {
      let option = document.createElement('option')
      option.text = priority

      switch(priority){
        case 'Low':
          option.value = 'Green'
          break;
        case 'Medium':
          option.value = 'Yellow'
          break;
        case 'High':
          option.value = 'Red'
          break;
      }
      priorityDropdown.appendChild(option)
    })

    form.insertBefore(priorityLabel, createNewTaskButton)
    form.insertBefore(priorityDropdown, createNewTaskButton)
  }

  function generateUserField(){
    
    userLabel.textContent = 'User: '
  
    userField.type = 'text'
    userField.id = 'new-task-user'
    userField.placeholder = 'user'

    form.insertBefore(userLabel, document.querySelector('label#new-task-description'))
    form.insertBefore(userField, document.querySelector('label#new-task-description'))
  }
})

function addToTaskList(taskName, priority, user){ 
  
  let taskList = document.querySelector('ul#tasks')
  let task = document.createElement('li')
  
  task.style.color = priority

  // creates delete button and adds event listener
  let deleteBtn = document.createElement('button')
  deleteBtn.textContent = 'X';
  
  deleteBtn.addEventListener('click', e => {
    e.target.parentNode.remove();
  })

  // creates edit button and adds event listener
  let editBtn = document.createElement('button')
  let taskEditable = false
  editBtn.textContent = 'Edit'

  editBtn.addEventListener('click', e => {
    task.contentEditable = !taskEditable
    taskEditable = !taskEditable
    editBtn.textContent = taskEditable ? 'Done' : 'Edit'
  });

  task.textContent = `${user} needs to ${taskName}. `
  
  task.appendChild(editBtn)
  task.appendChild(deleteBtn)
  taskList.appendChild(task)
}

