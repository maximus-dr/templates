class MailPost {
  constructor() {
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
  }

  unsubscribe(listener) {
    this.listeners.delete(listener);
  }

  broadcast(letter) {
    for (const listener of this.listeners) {
      listener(letter);
    }
  }

  send(from, message) {
    this.broadcast({from, message});
  }
}

function spy(letter) {
  console.log(letter);
}

const post = new MailPost();
post.subscribe(spy);

post.send('Kate', 'Hello, Kate! How are you?');
