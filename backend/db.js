class DBInitError extends Error {
  constructor(message) {
    super(message);
  }
}

//class: DBHandler
class DBHandler {
  #host
  #user
  #password
  #mysql
  #dbConnection
  #dbInitiailized


  constructor(host, user,  password) {
    this.#mysql = require("mysql")
    this.#host = host
    this.#user = user
    this.#password = password
    this.#dbInitiailized = false
  }

  initDB() {
    this.#dbConnection = this.#mysql.createConnection({
      host: this.#host,
      user: this.#user,
      password: this.#password
    })

    this.#dbConnection.connect((err) => {
      if (err) throw DBInitError("Error connecting to DB");
    })

    this.#dbInitiailized = true;
  }

  closeDB() {
    if(!this.#dbInitiailized) throw new DBInitError("DB not initialized");

    this.#dbConnection.end((err) => {
      if(err) throw DBInitError("Error closing db connection");
    })
  }

  dbIsInitialized() {
    return this.#dbInitiailized
  }

}

exports.DBHandler   = DBHandler;
exports.DBInitError = DBInitError;