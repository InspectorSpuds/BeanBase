//Author: Ishan Parihk
//Purpose: Singleton class implementation for a mysql statement executor that pools connections
//Need: fs, mysql2

const fs = require('fs')
const mysql = require("mysql2")

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
  #port
  #ssl
  #dbConnection
  #dbInitiailized

  //preconditions: host (string) is the url of the local db
  //process: local testing db construction (don't use in production)
  //constructor(host, user,  password) {
  //  this.#host = host
  //  this.#user = user
  //  this.#password = password
  //  this.#dbInitiailized = false
  //  this.#port = null
  //  this.#ssl = null
  //}

  //preconditions: host (string) is the url of the remote db, 
  //               port must be an int, ssl_path must be a valid ssl path
  //process: remote db connection constructor for mysql
  constructor(host, userr,  password, port, ssl_path) {
    this.#host = host
    this.#user = userr
    this.#password = password
    this.#dbInitiailized = false
    this.#port = port
    this.#ssl = ssl_path
  }
  
  initDB() {
    //create a connection pool
    this.#dbConnection = mysql.createPool({
      connectionLimit: 100,
      host: this.#host,
      user: this.#user,
      password: this.#password,
      port: this.#port,
      database: "CoffeeReviews",
      ssl: {
        ca:fs.readFileSync("us-east-2-bundle.pem")
      },
      maxIdle: 100, 
      idleTimeout: 80000,
      waitForConnections: true,
      enableKeepAlive: true, 
      connectTimeout: 100000,
      multipleStatements: true,
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

  async createUser(id, Username, password) {
    return new Promise((resolve, reject) => {
      this.#dbConnection.query(`insert into CoffeeReviews.user values(\'${id}\',\'${Username}\',\'${password}\');`, (err, result, fields) => {
        if(err) console.log(err.message)
        if(err) reject(new DBInitError(err.message))
        resolve(result)
      })
    })
  }

  async checkUser(Username, password) {
    try {
      const result = await new Promise((resolve, reject) => {
        this.#dbConnection.query(`SELECT COUNT(*) as count from CoffeeReviews.user where Username=\'${Username}\' and password=\'${password}\';`, (err, result, fields) => {
          if(err) reject(new DBInitError(err.message))
          resolve(result[0].count > 0)
        })
      })
      return result;
    } catch(error) {
      return false;
    }
  }

}

exports.DBHandler   = DBHandler;
exports.DBInitError = DBInitError;