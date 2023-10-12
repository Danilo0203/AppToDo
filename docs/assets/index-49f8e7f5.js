(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const p of n.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&i(p)}).observe(document,{childList:!0,subtree:!0});function d(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=d(o);fetch(o.href,n)}})();const v=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="Añadir tareas" autofocus>\r
    </header>\r
\r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
         <!--    <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> -->\r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <!-- selected -->\r
                <a class="filtro" class="selected" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <!-- Change this out with your name and url ↓ -->\r
    <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>`;let y;const S=new Uint8Array(16);function L(){if(!y&&(y=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!y))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return y(S)}const r=[];for(let e=0;e<256;++e)r.push((e+256).toString(16).slice(1));function C(e,t=0){return r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]}const E=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),w={randomUUID:E};function D(e,t,d){if(w.randomUUID&&!t&&!e)return w.randomUUID();e=e||{};const i=e.random||(e.rng||L)();if(i[6]=i[6]&15|64,i[8]=i[8]&63|128,t){d=d||0;for(let o=0;o<16;++o)t[d+o]=i[o];return t}return C(i)}class P{constructor(t){this.id=D(),this.description=t,this.done=!1,this.date=new Date}}const a={All:"all",completed:"Completed",Pending:"Pending"},l={todos:[],filter:a.All},A=()=>{T(),console.log("Iniciando Store 🍍")},T=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=a.All}=JSON.parse(localStorage.getItem("state"));l.todos=e,l.filter.filter},g=()=>{localStorage.setItem("state",JSON.stringify(l))};//! Obtener la tarea
const I=(e=a.All)=>{switch(e){case a.All:return[...l.todos];case a.completed:return l.todos.filter(t=>t.done);case a.Pending:return l.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid`)}};//! Añadir tareas nuevas
const k=e=>{if(!e)throw new Error("Description is required");l.todos.push(new P(e)),g()};//! Cambiar el estado de la tarea: hecho, no hecho
const x=e=>{l.todos=l.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),g()};//! Eliminar una tarea
const U=e=>{l.todos=l.todos.filter(t=>t.id!==e),g()};//! Eliminar tareas completadas
const O=()=>{l.todos=l.todos.filter(e=>!e.done),g()};//! Filtro de tareas
const q=(e=a.All)=>{l.filter=e,g()},F=()=>l.filter,c={addToDo:k,deleteCompleted:O,deleteToDo:U,getCurrenteFilter:F,getTodos:I,initStore:A,loadStore:T,setFilter:q,toggleToDo:x},M=e=>{if(!e)throw Error("A TODO objecto is required");const{done:t,description:d,id:i}=e,o=`
                <div class="view">
                    <input class="toggle" type="checkbox" ${t?"checked":""}>
                    <label>${d}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">`,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",i),e.done&&n.classList.add("completed"),n};let b;const H=e=>{if(b||(b=document.querySelector(e)),!b)throw new Error(`Element ${e} not found`);b.innerHTML=c.getTodos(a.Pending).length};let h;const V=(e,t=[])=>{//! Referencia del HTML
if(h||(h=document.querySelector(e)),!h)throw Error(`Element ${e} not found`);h.innerHTML="",t.forEach(d=>{h.append(M(d))})},m={todoList:".todo-list",newTodoInput:"#new-todo-input",clearCompletedButton:".clear-completed",todoFilters:".filtro",countPending:"#pending-count"},N=e=>{const t=()=>{const s=c.getTodos(c.getCurrenteFilter());V(m.todoList,s),d()},d=()=>{H(m.countPending)};(()=>{const s=document.createElement("div");s.innerHTML=v,document.querySelector(e).append(s),t()})();//! Referencias HTML
const i=document.querySelector(m.newTodoInput),o=document.querySelector(m.todoList),n=document.querySelector(m.clearCompletedButton),p=document.querySelectorAll(m.todoFilters);//!Listeners
i.addEventListener("keyup",s=>{s.keyCode===13&&s.target.value.trim().length!==0&&(c.addToDo(s.target.value),t(),s.target.value="")}),o.addEventListener("click",s=>{const u=s.target.closest("[data-id]");c.toggleToDo(u.getAttribute("data-id")),t()}),o.addEventListener("click",s=>{const u=s.target.closest("[data-id]"),f=s.target.className==="destroy";!u||!f||(console.log(f),c.deleteToDo(u.getAttribute("data-id")),t())}),n.addEventListener("click",()=>{c.deleteCompleted(),t()}),p.forEach(s=>{s.addEventListener("click",u=>{switch(p.forEach(f=>f.classList.remove("selected")),u.target.classList.add("selected"),console.log(u.target.text),u.target.text){case"Todos":c.setFilter(a.All);break;case"Pendientes":c.setFilter(a.Pending);break;case"Completados":c.setFilter(a.completed);break}t()})})};c.initStore();N("#app");
