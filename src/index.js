let priorities = ['Low', 'Medium', 'High']

document.addEventListener("DOMContentLoaded", () => {
  // your code here
  let form = document.querySelector('form#create-task-form')
  let createNewTaskButton = document.querySelector('input[type="submit"]')
  
  generatePriorityDropdown();
  
  form.addEventListener('submit', e => {
    e.preventDefault()
    let taskName = document.querySelector('input#new-task-description').value
    let priority = document.querySelector('select#new-task-priority').value

    addToTaskList(taskName, priority)
    form.reset()
  })

  function generatePriorityDropdown() {
    let priorityDropdown = document.createElement('select')
    let priorityLabel = document.createElement('label')
    
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

    priorityLabel.setAttribute('for', 'new-task-priority')
    priorityLabel.setAttribute('selected', 'green')
    priorityLabel.textContent = 'Priority: '

    form.insertBefore(priorityLabel, createNewTaskButton)
    form.insertBefore(priorityDropdown, createNewTaskButton)
  }
})

function addToTaskList(taskName, priority){ 
  
  let taskList = document.querySelector('ul#tasks')

  let task = document.createElement('li')
  task.style.color = document.querySelector('select').value

  let deleteBtn = document.createElement('button')
  
  deleteBtn.addEventListener('click', e => {
    e.target.parentNode.remove();
  })

  task.textContent = `${taskName} `
  deleteBtn.textContent = 'X';

  task.appendChild(deleteBtn)
  taskList.appendChild(task)
}

