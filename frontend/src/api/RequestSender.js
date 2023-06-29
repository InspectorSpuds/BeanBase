//Ishan Parikh
//Purpose: http request sender class
import axios from 'axios'
require('dotenv').config();

class RequestSender {
  #url;

  constructor() {
    //read info from backendindo.json file
    this.#url = process.env.URL;
  }

  //Preconditions:
  async getAllPosts() {
    const URL_ROUTE = '/getBooks';

    return new axios({
      method: 'get',
      url: `${this.#url}${URL_ROUTE}`,
      params: {}
    })

  }

  async getPost_withID(PID) {

  }


}


export default RequestSender;