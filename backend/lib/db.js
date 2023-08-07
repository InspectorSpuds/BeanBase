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
      password: this.#password,
      multipleStatements: true,
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


  async getPost(PID) {
    //create a promise to create the query
    return new Promise((resolve, reject) => {
      console.log(`SELECT * from CoffeeReviews.Posts where PID=\'${PID}\'`)
      this.#dbConnection.query(`SELECT * from CoffeeReviews.TasteProfile NATURAL JOIN CoffeeReviews.Coffee NATURAL JOIN CoffeeReviews.Posts`, (err, result, fields) => {
        if(err) reject(new DBInitError(err.message));
        resolve(result);
      })
    })
  }

  async getProfile(PID) {
    //create a promise to create the query
    return new Promise((resolve, reject) => {
      this.#dbConnection.query(`use CoffeeReviews; 
                                SELECT * exclude PID from TasteProfile where PID = \'${PID}\';)`, (err, result, fields) => {
        if(err) reject(new DBInitError("Error in Query: Post not found"));
        resolve(result);
      })
    })
  }

  async getUser(name) {
    //create a promise to create the query
    return new Promise((resolve, reject) => {
      this.#dbConnection.query(`SELECT * from CoffeeReviews.User where Username = \'${name}\';`, (err, result, fields) => {
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
      this.#dbConnection.query(`SELECT * FROM CoffeeReviews.Posts`, (err, result, fields) => {
        if(err) reject(new DBInitError("Error getting post cards"));
        resolve(result);
      })
    })
  }

  async createPost(Coffee, Post, TasteProfile, UID) {
    //use a transaction to ensure proper rollback and atomicitiy
    const statementList = [this.createCoffee(Coffee.CID, Coffee.Roaster, Coffee.OriginCountry, Coffee.CoffeeName),
                           this.createTasteProfile(Post.PID, TasteProfile),
                           this.createPost(Post, UID, Coffee.CID)]

    return new Promise((resolve, reject) => {
        this.#dbConnection.beginTransaction(async (err) => {
          //return error if the transaction can't be initialized
          if(err) reject(new DBInitError(err.message))

          //execute all the statements in the list, rolling back the transaction and rejeting on error
          try {
            for(let index = 0; index < statementList.length(); index++) {
              let result = await statementList[index]();
            }
          } catch(db_error) {
            this.#dbConnection.rollback((err) => {reject(new DBInitError(err.message))})
            reject(new DBInitError(db_error.message))
          }
  
          //finish the transaction
          this.#dbConnection.commit((db_error) => {
            this.#dbConnection.rollback((err) => {reject(new DBInitError(err.message))})
            reject(new DBInitError(db_error.message))
          })
          
          resolve("Post successfully created!");
        })
    })
  }

  async createCoffee(CID, Roaster, OriginCountry, CoffeeName) {
    const SQL_STATEMENT = `INSERT INTO CoffeeReviews.Coffee Values(\'${CID}\', \'${Roaster}\', \'${OriginCountry}\',\'${CoffeeName}\');`
  
    return new Promise((resolve, reject) => {
      this.#dbConnection.query(SQL_STATEMENT, (err, result, fields) => {
        if(err) reject(new DBInitError(err.message));
        resolve(true);
      })
    })
  }

  async createTasteProfile(PID, TasteProfile) {
    const SQL_STATEMENT = `INSERT INTO CoffeeReviews.TasteProfile Values(\'${PID}\',
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
    const SQL_STATEMENT = `INSERT INTO CoffeeReviews.Posts Values(\'${Post.PID}\',\'${Post.Title}\',\'${Post.CreationDate}\',\'${Post.Content}\',\'${CID}\',\'${UID}\');`

    return new Promise((resolve, reject) => {
      this.#dbConnection.query(SQL_STATEMENT, (err, result, fields) => {
        if(err) reject(new DBInitError(err.message));
        resolve(true);
      })
    })
  }

  async deletePost(PID) {
    return new Promise((resolve, reject) => {
      this.#dbConnection.query(`DELETE FROM CoffeeReviews.Posts WHERE PID=${PID};`, (err, result, fields) => {
        if(err) reject(new DBInitError(err.message))
        resolve(result)
      })
    })
  }

  async createUser(id, Username, password) {
    return new Promise((resolve, reject) => {
      this.#dbConnection.query(`insert into CoffeeReviews.User values(\'${id}\',\'${Username}\',\'${password}\');`, (err, result, fields) => {
        if(err) console.log(err.message)
        if(err) reject(new DBInitError(err.message))
        resolve(result)
      })
    })
  }

  async checkUser(Username, password) {
    try {
      const result = await new Promise((resolve, reject) => {
        this.#dbConnection.query(`SELECT COUNT(*) as count from CoffeeReviews.User where Username=\'${Username}\' and password=\'${password}\';`, (err, result, fields) => {
          if(err) reject(new DBInitError(err.message))
          resolve(result[0].count > 0)
        })
      })
      return result;
    } catch(error) {
      return false;
    }
  }

  //note: I wouldn't reco using this unless you really need to, somewhat bypasses encapsulation
  async execStmt(stmt) {
    return new Promise((resolve, reject) => {
      this.#dbConnection.query(stmt, (err, result, fields) => {
        if(err) reject(new DBInitError(err.message))
        resolve(result)
      })
    })
  }
}

exports.DBHandler   = DBHandler;
exports.DBInitError = DBInitError;