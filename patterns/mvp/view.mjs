
export default class UserView {
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

const render = (html) => {
  const element = document.createElement(`div`);
  element.innerHTML = html;
  return element;
};
