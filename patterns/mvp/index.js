const render = (html) => {
  const element = document.createElement(`div`);
  element.innerHTML = html;
  return element;
};

class UserModel {
  constructor(data) {
    this.listeners = new Set();
    this.data = data;
  }

  subscribe(listener) {
    this.listeners.add(listener);
  }

  notifyAll() {
    for (const listener of this.listeners) {
      listener(this);
    }
  }

  get name() {
    return this.data.name;
  }

  set name(name) {
    this.data.name = name;
    this.notifyAll();
  }

  get familyName() {
    return this.data.familyName;
  }
}

class UserView {
  constructor(model) {
    this.model = model;
  }

  renderContent() {
    return `<span>Name:</span><span class="name">${this.model.name}</span>
    <span>${this.model.familyName}</span>`;
  }

  changeName(name) {
    this.nameElement.textContent = name;
  }

  get template() {
    return `
<div class="content">
  ${this.renderContent()}
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
    this.nameElement = this.element.querySelector(`.name`);
    const input = this.element.querySelector(`input`);

    input.addEventListener(`input`, () => {
      this.onNameChange(input.value);
    });
  }
  
  onNameChange(name) {
    
  }
}

class UserPresenter {
  constructor() {
    this.model = new UserModel({
      name: `Luigi`,
      familyName: `Mario`
    });
    
  }

  init() {
    this.view = new UserView(this.model);
    this.view.onNameChange = (name) => {
      this.model.name = name;
    };
    
    this.model.subscribe(() => this.view.changeName(this.model.name));

    const body = document.body;
    body.insertBefore(this.view.element, body.children[0]);
  }
}

const cntrl = new UserPresenter();
cntrl.init();
