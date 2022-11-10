function t(t){return t&&t.__esModule?t.default:t}class e{static API_BASE_URL="api/tasks/";static async getAllItems(){return await this.#t("GET")}static async createItem(t){return await this.#t("POST","",t)}static async updateItem(t,e){return await this.#t("PATCH",t,e)}static async deleteItem(t){return await this.#t("DELETE",t)}static async#t(t,s="",i){const n={method:t};i&&(n.headers={"Content-Type":"application/json"},n.body=JSON.stringify(i));const a=await fetch(e.API_BASE_URL+s,n);if(a.ok)return a.json();throw new Error(a.status+" "+a.statusText)}}class s{#e=[];constructor(t){this.id,this.tag,this.options,this.populate(t)}set classList(t){"string"==typeof t&&(t=t.split(" ")),this.#e=[...this.#e,...t]}get classList(){return this.#e}populate(t){t&&Object.assign(this,t)}}class i{#s;#i;constructor(t){this.config=t||new s,this.validateConfig(),this.populateFromConfig()}set id(t){this.element.id=t}get id(){return this.element.id}set element(t){this.#i=t}get element(){return this.#i}set config(t){this.#s=t}get config(){return this.#s}get defaults(){return{tag:"div",id:"",classList:""}}render(t){this.element.innerHTML=t}appendTo(t){return t.appendChild(this.element),this}prependTo(t){return element.prependChild(this.element),this}validateConfig(){this.config.tag=this.config.tag||this.defaults.tag,this.config.id=this.config.id||this.defaults.id,this.config.classList=this.defaults.classList}populateFromConfig(){this.element=document.createElement(this.config.tag),this.id=this.config.id,this.element.classList.add(...this.config.classList)}destroy(){this.element.remove()}}class n extends CustomEvent{static UPDATE="item-update";static CREATE="item-create";static DELETE="item-delete";constructor(t,e){super(t,e)}}class a extends i{constructor(){super(),this.render()}get defaults(){return{tag:"div",id:"loader-spinner",classList:"todo__header-loader"}}render(){super.render('<svg class="loader__spinner" viewBox="0 0 50 50"><circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle></svg>')}show(){this.element.querySelector(".loader__spinner").classList.add("show")}hide(t=0){return new Promise((e=>{setTimeout((()=>{this.element.querySelector(".loader__spinner").classList.remove("show"),e()}),t)}))}}class r extends i{#n;#a;#r;#o;#d;#l;#c=!1;#h;constructor(){super(),this.render()}get defaults(){return{tag:"header",id:"todo-header",classList:"todo__header"}}render(){super.render(t('<h1 class="todo__header-heading">Todo</h1><form> <input type="text" name="title" id="title" required> </form><button class="icon-button--light material-icons-round md-48 todo__header-btn-save" title="Save"> save </button><button class="icon-button--light material-icons-round md-48 todo__header-btn-create" title="Add task"> add_circle </button>')),this.#o=this.element.querySelector("form"),this.#o.addEventListener("submit",(t=>{t.preventDefault(),this.#u()})),this.#d=this.element.querySelector("input"),this.#a=this.element.querySelector(".todo__header-btn-create"),this.#a.addEventListener("click",(()=>this.#m())),this.#r=this.element.querySelector(".todo__header-btn-save"),this.#r.addEventListener("click",(()=>this.#o.requestSubmit())),this.#l=this.element.querySelector(".todo__header-heading"),this.#n=(new a).appendTo(this.element),this.#n.show(),document.addEventListener("click",(t=>{!t.composedPath().includes(this.element)&&this.#c&&this.#m()}))}enable(){this.#n.hide(500).then((()=>this.#a.classList.add("show")))}#u(){const t=new n(n.CREATE,{detail:{title:this.#d.value,done:!1}});document.dispatchEvent(t),this.#d.value="",this.#m()}#m(){this.#c=!this.#c,this.#c?(this.#a.setAttribute("title","Cancel"),this.#h=setTimeout((()=>{this.#d.focus()}),300)):(this.#a.setAttribute("title","Add task"),clearTimeout(this.#h)),this.#d.classList.toggle("show"),this.#a.classList.toggle("mode-cancel"),this.#r.classList.toggle("show"),this.#l.classList.toggle("hide")}}class o extends i{#p;#o;#g;#v;#b;#f;#E;#r;#L=!1;#_;#T;constructor(t){super(t),this.render()}get defaults(){return{tag:"li",id:"todo-list-item",classList:"todo__list-item"}}set _id(t){this.id=t}set title(t){this.#g.value=t}get title(){return this.#g.value}set done(t){this.#p=t,this.#v.innerText=t?"check_circle_outline":"radio_button_unchecked",this.#p?this.#g.classList.add("done"):this.#g.classList.remove("done")}get done(){return this.#p}render(){super.render(t('<button class="icon-button--secondary material-icons-round md-36 todo__list-item-check" title="Task status"> radio_button_unchecked </button><form><input id="title" name="title" required disabled></form><div class="todo__list-item-menu"> <button class="icon-button--grey material-icons-round md-36 todo__list-item-btn-save" title="Save"> save </button> <button class="icon-button--grey material-icons-round md-36 todo__list-item-btn-delete" title="Delete"> remove_circle_outline </button> </div><button class="icon-button--grey material-icons-round md-36 todo__list-item-btn-menu" title="Toggle menu"> more_horiz </button>'));const e=".todo__list-item-";this.#o=this.element.querySelector("form"),this.#o.addEventListener("submit",(t=>{t.preventDefault(),this.#_=!0,this.#k(),this.#S({title:this.title},{title:this.#T})})),this.#g=this.element.querySelector("input"),this.#v=this.element.querySelector(e+"check"),this.#v.addEventListener("click",this),this.#b=this.element.querySelector(e+"menu"),this.#f=this.element.querySelector(e+"btn-menu"),this.#f.addEventListener("click",this),this.#E=this.element.querySelector(e+"btn-delete"),this.#E.addEventListener("click",this),this.#r=this.element.querySelector(e+"btn-save"),this.#r.addEventListener("click",this),document.addEventListener("click",this.#y.bind(this))}populate(t){Object.assign(this,t)}handleEvent(t){switch(!0){case t.target===this.#v:this.#S({done:!this.done},{done:this.done});break;case t.target===this.#r:this.#o.requestSubmit();break;case t.target===this.#E:this.#I();break;case t.target===this.#f:this.#k()}}#y(t){!t.composedPath().includes(this.element)&&this.#L&&this.#k()}#k(){this.#L=!this.#L,this.#g.disabled=!this.#L,this.#L?(this.#T=this.title,this.#_=!1,this.#g.focus()):this.#_||(this.title=this.#T),this.#b.classList.toggle("show"),this.#f.classList.toggle("selected")}#S(t,e){const s=new n(n.UPDATE,{detail:{id:this.id,props:t,prevProps:e}});document.dispatchEvent(s)}#I(){const t=new n(n.DELETE,{detail:this});document.dispatchEvent(t)}destroy(){this.#v.removeEventListener("click",this),this.#f.removeEventListener("click",this),this.#E.removeEventListener("click",this),this.#r.removeEventListener("click",this),document.removeEventListener("click",this.#y.bind(this)),super.destroy()}}class d extends i{#w=[];constructor(){super()}get defaults(){return{tag:"ul",id:"todo-list",classList:"todo__list"}}addItem(t){const e=new o;return e.populate(t),e.appendTo(this.element),this.#w.push(e),e}updateItem(t,e){this.#w.find((e=>e.id===t)).populate(e)}deleteItem(t){const e=this.#w.findIndex((e=>e.id===t));if(-1!==e){this.#w.splice(e,1)[0].destroy()}}}class l extends i{#C;#q;constructor(){super(),this.render()}get defaults(){return{tag:"div",id:"todo",classList:"todo"}}render(){this.#C=new r,this.#C.appendTo(this.element),this.#q=new d,this.#q.appendTo(this.element),document.addEventListener(n.CREATE,(t=>this.#D(t.detail))),document.addEventListener(n.UPDATE,(t=>this.#M(t.detail.id,t.detail.props,t.detail.prevProps))),document.addEventListener(n.DELETE,(t=>this.#A(t.detail))),e.getAllItems().then((t=>{this.#C.enable(),this.#O(t)})).catch((t=>console.error(t)))}#D(t){e.createItem(t).then((t=>this.#q.addItem(t))).catch((t=>{console.error(t)}))}#M(t,s,i){this.#q.updateItem(t,s),e.updateItem(t,s).catch((e=>{this.#q.updateItem(t,i),console.error(e)}))}#A(t){t.element.classList.add("hide"),e.deleteItem(t.id).then((()=>this.#q.deleteItem(t.id))).catch((e=>{t.element.classList.remove("hide"),console.error(e)}))}#O(t){t.forEach((t=>this.#q.addItem(t)))}}class c{static#x;static get instance(){return this.#x||(this.#x=new c),this.#x}constructor(){}run(){(new l).appendTo(document.querySelector("main"))}}c.instance.run();
//# sourceMappingURL=index.74d4eaaa.js.map
