import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, renderPendingTodo } from './use-cases';
const elementIDs = {
	todoList: '.todo-list',
	newTodoInput: '#new-todo-input',
	clearCompletedButton: '.clear-completed',
	todoFilters: '.filtro',
	countPending: '#pending-count',
};
/**
 *
 * @param {String} elementId
 */
export const App = (elementId) => {
	const displayTodo = () => {
		const todos = todoStore.getTodos(todoStore.getCurrenteFilter());
		renderTodos(elementIDs.todoList, todos);
		updatePendigCount();
	};
	const updatePendigCount = () => {
		renderPendingTodo(elementIDs.countPending);
	};
	// Cuando la funcion App() se llama
	(() => {
		const app = document.createElement('div');
		app.innerHTML = html;
		document.querySelector(elementId).append(app);
		displayTodo();
	})();
	//! Referencias HTML
	const newDescriptionInput = document.querySelector(elementIDs.newTodoInput);
	const todoListUL = document.querySelector(elementIDs.todoList);
	const clearCompletedButton = document.querySelector(elementIDs.clearCompletedButton);
	const filterLIs = document.querySelectorAll(elementIDs.todoFilters);

	//!Listeners
	newDescriptionInput.addEventListener('keyup', (event) => {
		if (event.keyCode !== 13) return;
		if (event.target.value.trim().length === 0) return;
		todoStore.addToDo(event.target.value);
		displayTodo();
		event.target.value = '';
	});
	todoListUL.addEventListener('click', (e) => {
		const element = e.target.closest('[data-id]');
		todoStore.toggleToDo(element.getAttribute('data-id'));
		displayTodo();
	});
	todoListUL.addEventListener('click', (e) => {
		const element = e.target.closest('[data-id]');
		const elementDestroy = e.target.className === 'destroy';
		if (!element || !elementDestroy) return;
		console.log(elementDestroy);
		todoStore.deleteToDo(element.getAttribute('data-id'));
		displayTodo();
	});
	clearCompletedButton.addEventListener('click', () => {
		todoStore.deleteCompleted();
		displayTodo();
	});
	filterLIs.forEach((element) => {
		element.addEventListener('click', (e) => {
			filterLIs.forEach((el) => el.classList.remove('selected'));
			e.target.classList.add('selected');
			console.log(e.target.text);
			switch (e.target.text) {
				case 'Todos':
					todoStore.setFilter(Filters.All);
					break;
				case 'Pendientes':
					todoStore.setFilter(Filters.Pending);
					break;
				case 'Completados':
					todoStore.setFilter(Filters.completed);
					break;
			}
			displayTodo();
		});
	});
};
