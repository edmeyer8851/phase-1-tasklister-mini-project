// waits until the DOM has finished loading before running the script
document.addEventListener("DOMContentLoaded", () => {
  
  // variables
  let form = document.querySelector('#create-task-form')
  let createNewTaskButton = document.querySelector('input[type="submit"]')
  let priorityDropdown = document.createElement('select')
  let priorityLabel = document.createElement('label')
  let userField = document.createElement('input')
  let userLabel = document.createElement('label')
  let priorities = ['Low', 'Medium', 'High']
  
  // generates the priority dropdown
  generatePriorityDropdown();

  //generates the user field
  generateUserField();
  
  // adds event listener for when the create new task button is clicked
  form.addEventListener('submit', e => {
    // prevents the screen from refreshing
    e.preventDefault()

    // assigns our task data fields to variables for later reference
    let taskName = document.querySelector('input#new-task-description').value
    let priority = document.querySelector('select#new-task-priority').value
    let user = document.querySelector('input#new-task-user').value

    // gives our task data to the function that handles adding them to the list
    addToTaskList(taskName, priority, user)

    // clears the form so we can add more tasks easily
    form.reset()
  })

  // function that handles generating the task priority dropdown
  function generatePriorityDropdown() {
    
    // gives our dropdown a label
    priorityLabel.textContent = ' Priority: '
    
    // sets the id attribute of the dropdown element
    priorityDropdown.id = 'new-task-priority'

    // iterates though the number of priority options given (3 in this case) and
    // 1. creates the option
    // 2. sets the text attribute of the option element
    // 3. assigns the option a color value depending on the priority
    // 4. adds the option to the dropdown element
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

    // inserts the dropdown and label into the form before the Create New Task button
    form.insertBefore(priorityLabel, createNewTaskButton)
    form.insertBefore(priorityDropdown, createNewTaskButton)
  }

  // function that handles generating the user field
  function generateUserField(){
    
    userLabel.textContent = 'User: '
  
    userField.type = 'text'
    userField.id = 'new-task-user'
    userField.placeholder = 'user'

    form.insertBefore(userLabel, document.querySelector('label#new-task-description'))
    form.insertBefore(userField, document.querySelector('label#new-task-description'))
  }
})

// function that handles adding new tasks to the list
function addToTaskList(taskName, priority, user){ 
  
  // get our task list and generate a new task
  let taskList = document.querySelector('ul#tasks')
  let task = document.createElement('li')
  
  // sets text color of the task depending on the priority
  task.style.color = priority

  // creates delete button and adds event listener
  let deleteBtn = document.createElement('button')
  deleteBtn.textContent = 'X';
  
  deleteBtn.addEventListener('click', e => {
    e.target.parentNode.remove();
  })

  // creates edit button and adds event listener
  let editBtn = document.createElement('button')
  
  // flag variable that allows us to change the text content of the edit button each time it's clicked
  let taskEditable = false
  editBtn.textContent = 'Edit'

  // when the edit button is clicked:
  // 1. the editability of the task content is toggled
  // 2. flips the taskEditable flag
  // 3. changes the textContent of the button depending on whether or not it's currently editable
  editBtn.addEventListener('click', e => {
    task.contentEditable = !taskEditable
    taskEditable = !taskEditable
    editBtn.textContent = taskEditable ? 'Done' : 'Edit'
  });

  // interpolates variables for readability
  task.textContent = `${user} needs to ${taskName}. `
  
  // appends our buttons to the task
  task.appendChild(editBtn)
  task.appendChild(deleteBtn)

  // appends the new task to the task list
  taskList.appendChild(task)
}

