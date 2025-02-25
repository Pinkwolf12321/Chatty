// user.js
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

const users = [];

module.exports = { User, users };
