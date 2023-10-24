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

  async getPost(PID) {
    //create a promise to create the query
    return new Promise((resolve, reject) => {
      this.#dbConnection.query(`SELECT *  FROM CoffeeReviews.posts p, CoffeeReviews.tasteprofile t, CoffeeReviews.coffee c where p.PID = \'${PID}\' and p.PID = t.PID and p.CID = c.CID`, (err, result, fields) => {
        if(err) reject(new DBInitError(err.message));
        resolve(result);
      })
    })
  }

  //preconditions: none
  //process: gets all post info for rendering Post cards
  //postconditions; a promise handle to the mysql query results
  //ERROR RESPONSE: DBInitError promise reject if something goes wrong
  async getPosts() {
    return new Promise((resolve, reject) => {
      this.#dbConnection.query(`SELECT * FROM posts`, (err, result, fields) => {
        if(err) reject(new DBInitError("Error getting post cards => " + err));
        resolve(result);
      })
    })
  }

  async getUserPosts(UID) {
    return new Promise((resolve, reject) => {
      this.#dbConnection.query(`SELECT * FROM posts where UID=\'${UID}\'`, (err, result, fields) => {
        if(err) reject(new DBInitError("Error getting user post cards => " + err));
        resolve(result);
      })
    })
  }

  async createEntirePost(Coffee, Post, TasteProfile, UID) {
    //use a transaction to ensure proper rollback and atomicitiy   
    
    return new Promise(async (resolve, reject) => {
      try {
        await this.#dbConnection.promise().query('START TRANSACTION;')
        await this.createCoffee(Coffee.CID, Coffee.Roaster, Coffee.OriginCountry, Coffee.CoffeeName)
        await this.createPost(Post, UID, Coffee.CID)
        await this.createTasteProfile(Post.PID, TasteProfile)
        await this.#dbConnection.promise().query("COMMIT;")
        resolve("Successfully created post")
      } catch(error) {
        await this.#dbConnection.promise().query("ROLLBACK;")
        reject(error.message);
      }
    })
  }

  async createCoffee(CID, Roaster, OriginCountry, CoffeeName) {
    const SQL_STATEMENT = `INSERT INTO CoffeeReviews.coffee Values(\'${CID}\', \'${Roaster}\', \'${OriginCountry}\',\'${CoffeeName}\');`
  
    return new Promise((resolve, reject) => {
      this.#dbConnection.query(SQL_STATEMENT, (err, result, fields) => {
        if(err) reject(new DBInitError(err.message));
        resolve(true);
      })
    })
  }

  async createTasteProfile(PID, TasteProfile) {
    const SQL_STATEMENT = `INSERT INTO CoffeeReviews.tasteprofile Values(\'${PID}\',
                                                           \'${TasteProfile['Finish']}\',
                                                           \'${TasteProfile['Sweet']}\',
                                                           \'${TasteProfile['Acidic']}\',
                                                           \'${TasteProfile['Floral']}\',                                                           
                                                           \'${TasteProfile['Spicy']}\',                           
                                                           \'${TasteProfile['Salty']}\',
                                                           \'${TasteProfile['Berry']}\',
                                                           \'${TasteProfile['Citrus']}\',
                                                           \'${TasteProfile['Stonefruit']}\',
                                                           \'${TasteProfile['Chocolate']}\',
                                                           \'${TasteProfile['Caramel']}\',
                                                           \'${TasteProfile['Smoky']}\',
                                                           \'${TasteProfile['Bitter']}\',
                                                           \'${TasteProfile['Savory']}\',
                                                           \'${TasteProfile['Body']}\',
                                                           \'${TasteProfile['Clean']}\');`

    return new Promise((resolve, reject) => {
      this.#dbConnection.query(SQL_STATEMENT, (err, result, fields) => {
        if(err) reject(new DBInitError(err.message));
        resolve(true);
      })
    })
  }

  async createPost(Post, UID, CID) {
    const SQL_STATEMENT = `INSERT INTO CoffeeReviews.posts Values(\'${Post.PID}\',\'${Post.Title}\',\'${Post.CreationDate}\',\'${Post.Content}\',\'${CID}\',\'${UID}\');`

    return new Promise((resolve, reject) => {
      this.#dbConnection.query(SQL_STATEMENT, (err, result, fields) => {
        if(err) reject(new DBInitError(err.message));
        resolve(true);
      })
    })
  }

  async deletePost(PID, UID) {
    return new Promise(async (resolve, reject) => {
      //check that the user ID matches that of the post
      try {
        //Check post exists first
        const result = await this.getPost(PID);
        if(result[0].count === 0) reject(new DBInitError("Post does not exist"))
        else if(result[0][0].UID !== UID) reject(new DBInitError("Error on deletion: not user's post"))
      } catch(err) {
        reject(new DBInitError(err.message)); 
      }

      //try deleting post
      this.#dbConnection.query(`DELETE FROM CoffeeReviews.posts WHERE PID=\'${PID}\';`, (err, result, fields) => {
        if(err) {
          console.log(err.message);
          reject(new DBInitError(err.message))
        }
        resolve(result)
      })
    })
  }



}

exports.DBHandler   = DBHandler;
exports.DBInitError = DBInitError;