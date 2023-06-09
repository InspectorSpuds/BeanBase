//Author: Ishan Parikh
//

const DBHandler = require('./db');

//ECMAJS classes don't really have protected fields, so the best way to simulate the 
//the functionality necessary is through Composition.
class AuthValidator extends DBHandler {
  //the DBHandler object
  #handler

  constructor(host, user,  password) {
    this.#handler = new DBHandler(host, user, passowrd);
  }

  initDB() {
    this.#handler.initDB();
  }

  closeDB() {
    this.#handler.closeDB(); 
  }

  dbIsInitialized() {
    this.#handler.dbIsInitialized();
  }

  async checkCredentials(username, password) {
    try {
      const results = await this.#handler.execStmt(`use CoffeeReviews;
      select r.password from Reviewer r where r.username = ${username} 
                                          and r.password = ${password}`)
      return results.length > 0;
    } catch(e) {
      return false;
    }
  }

  async insertCredentials(username, password, id) {
    return new Promise((resolve, reject) => {
      this.#handler.execStmt(`use CoffeeReviews; insert into Reviewer VALUES(${id},${username},${password}`)
      .then(results => resolve(results))
      .catch(e => reject(e))
    })
  }
}


exports.AuthValidator = AuthValidator;