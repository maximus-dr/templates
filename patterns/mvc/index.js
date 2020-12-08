const render = (html) => {
  const element = document.createElement(`div`);
  element.innerHTML = html;
  return element;
};


// Model
class UserModel {
  constructor(data) {
    this.listeners = new Set();
    this.data = data;
  }

  subscribe(listener) {
    this.listeners.add(listener);
  }

  broadcast() {
    for (const listener of this.listeners) {
      listener(this);
    }
  }

  get name() {
    return this.data.name;
  }

  set name(name) {
    this.data.name = name;
    this.broadcast();
  }

  get lastName() {
    return this.data.lastName;
  }
}


// View
class UserView {
  constructor(model) {
    this.model = model;
  }

  getContent() {
    return `
      <span>Name:</span>
      <span>${this.model.name}</span>
      <span>${this.model.lastName}</span>
    `;
  }

  update() {
    this.content.innerHTML = this.getContent();
  }

  get template() {
    return `
      <div class="content">
        ${this.getContent()}
      </div>
      <div>
        <label>Name:<input value="${this.model.name}"></label>
      </div>
    `;
  }

  get element() {
    if (!this._el) {
      this._el = render(this.template);
      this.bind();
    }
    return this._el;
  }

  bind() {
    this.content = this.element.querySelector(`.content`);
    const input = this.element.querySelector(`input`);

    input.addEventListener(`input`, () => {
      this.onNameChange(input.value);
    });
  }
  
  onNameChange(name) {
    
  }
}


// Controller
class UserController {
  init() {
    this.model = new UserModel({
      name: `Luigi`,
      lastName: `Mario`
    });
    this.view = new UserView(this.model);
    this.model.subscribe(() => this.view.update());
    this.view.onNameChange = (name) => this.model.name = name;

    document.body.append(this.view.element);
  }
}

const controller = new UserController();
controller.init();
