import './style.css';
import { App } from './src/todos/app';
import Store from './src/store/todo.store';
Store.initStore();
App('#app');
    