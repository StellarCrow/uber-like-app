class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, userId, room) {
    const user = {
      id,
      userId,
      room,
    };
    this.users.push(user);
    return user;
  }

  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }

  removeUser(id) {
    const user = this.getUser(id);
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }
}

module.exports = new Users();
