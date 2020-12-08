import UserModel from "./model.mjs";
import UserView from "./view.mjs";


export default class UserController {
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
