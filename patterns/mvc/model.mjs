
export default class UserModel {
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
