
export default class UserView {
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

const render = (html) => {
  const element = document.createElement(`div`);
  element.innerHTML = html;
  return element;
};