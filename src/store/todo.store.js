import { Todo } from '../models/todo.models';

export const Filters = {
	All: 'all',
	completed: 'Completed',
	Pending: 'Pending',
};
const state = {
	todos: [/* new Todo('Hacer tareas de la universidad'), new Todo('No hacer nada'), new Todo('No se que poner xd') */],
	filter: Filters.All,
};

const initStore = () => {
	loadStore();
	console.log('Iniciando Store 🍍');
};

const loadStore = () => {
	if (!localStorage.getItem('state')) return;
	const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state'));
	state.todos = todos;
	state.filter.filter;
};
const saveStateToLocalStorage = () => {
	localStorage.setItem('state', JSON.stringify(state));
};
//! Obtener la tarea
const getTodos = (filter = Filters.All) => {
	switch (filter) {
		case Filters.All:
			return [...state.todos];
		case Filters.completed:
			return state.todos.filter((todo) => todo.done);
		case Filters.Pending:
			return state.todos.filter((todo) => !todo.done);
		default:
			throw new Error(`Option ${filter} is not valid`);
	}
};

//! Añadir tareas nuevas
const addToDo = (description) => {
	if (!description) throw new Error('Description is required');
	state.todos.push(new Todo(description));
	saveStateToLocalStorage();
};

//! Cambiar el estado de la tarea: hecho, no hecho
const toggleToDo = (todoId) => {
	state.todos = state.todos.map((todo) => {
		if (todo.id === todoId) {
			todo.done = !todo.done;
		}
		return todo;
	});
	saveStateToLocalStorage();
};

//! Eliminar una tarea
const deleteToDo = (todoId) => {
	state.todos = state.todos.filter((todo) => todo.id !== todoId);
	saveStateToLocalStorage();
};
//! Eliminar tareas completadas
const deleteCompleted = () => {
	state.todos = state.todos.filter((todo) => !todo.done);
	saveStateToLocalStorage();
};

//! Filtro de tareas
const setFilter = (newFilter = Filters.All) => {
	state.filter = newFilter;
	saveStateToLocalStorage();
};

const getCurrenteFilter = () => {
	return state.filter;
};
export default {
	addToDo,
	deleteCompleted,
	deleteToDo,
	getCurrenteFilter,
	getTodos,
	initStore,
	loadStore,
	setFilter,
	toggleToDo,
};
