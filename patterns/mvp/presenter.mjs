import UserModel from "./model.mjs";
import UserView from "./view.mjs";

export default class UserPresenter {
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
