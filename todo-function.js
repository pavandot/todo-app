//Read Localstorage for Todos
const getTodos =() => {
    const todoJSON=localStorage.getItem('todos')
	try {
		return todoJSON  ? JSON.parse(todoJSON) : []
	} catch(e) {
		return []
	}
}

//remove todos 
const removeTodos = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    if(todoIndex>-1) {
        todos.splice(todoIndex , 1)
    }
}

// checkbox to mark todo completed or not
const isTodoCompleted = (id) => {
    const todo=todos.find((todo) => todo.id === id)
    if(todo) {
        todo.completed=!todo.completed
    }

}

//Genarate DOM elements
const genrateDOM=(todo) => {
    const divTodo=document.createElement('div')
    const checkBox= document.createElement('input')
    const textEl = document.createElement('span')
    const button = document.createElement('button')
    //Ssetup for checkbox
    checkBox.setAttribute('type', 'checkbox')
    checkBox.checked = todo.completed
    divTodo.appendChild(checkBox)
    checkBox.addEventListener('change', () => {
        isTodoCompleted(todo.id)
        saveTodos(todos)
        renderTodos(todos,filters)
    })
    // setup text element
    textEl.textContent = todo.text
    divTodo.appendChild(textEl)
    //setup button
    button.textContent='x'
    divTodo.appendChild(button)
    button.addEventListener('click' , () => {
        removeTodos(todo.id)
        saveTodos(todos)
        renderTodos(todos , filters)
    })
    return divTodo
}

//Render todo List
const renderTodos = (todos, filters) => {
    const filteredTodos = todos.filter((todo) => {
        const searchTextmatch= todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompleted=!filters.hideCompleted || !todo.completed
        return searchTextmatch && hideCompleted
    })

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    document.querySelector('#todos').innerHTML = ''

    document.querySelector('#todos').appendChild(getSummaryDOM(incompleteTodos))

    filteredTodos.forEach((todo) => {
        const p = genrateDOM(todo)
        document.querySelector('#todos').appendChild(p)
    })
}

// Get Summary Dom
const getSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary
}

// save todos to localstorage
const saveTodos=function(todos) {
    localStorage.setItem('todos' , JSON.stringify(todos))
}
