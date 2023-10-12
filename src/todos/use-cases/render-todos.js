import { Todo } from '../../models/todo.models';
import { createTodoHtml } from './create-todo-html';
let element;
/**
 *
 * @param {String} elementId
 * @param {Todo} todos
 */
export const renderTodos = (elementId, todos = []) => {
	//! Referencia del HTML
	if (!element) element = document.querySelector(elementId);
	if (!element) throw Error(`Element ${elementId} not found`);
	element.innerHTML = '';
	todos.forEach((todo) => {
		element.append(createTodoHtml(todo));
	});
};
