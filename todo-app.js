let todos = getTodos() 

const filters = {
    searchText: '',
    hideCompleted:false
}

renderTodos(todos, filters)

document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})
 
document.querySelector('#add-form').addEventListener('submit',(e) => {
    e.preventDefault()
    todos.push({
        id: uuidv4() ,
        text:e.target.elements.addTodo.value,
        completed: false
    })
    saveTodos(todos)
    renderTodos(todos,filters)
    e.target.elements.addTodo.value=''
})

document.querySelector('#check').addEventListener('change',(e) =>{
    filters.hideCompleted=e.target.checked
    renderTodos(todos,filters)
} )
