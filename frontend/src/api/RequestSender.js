//Ishan Parikh
//Purpose: http request sender class
import axios from 'axios'

class RequestSender {
  url;

  constructor() {
    //read info from backendindo.json file
    this.url = "http://localhost:4000";
  }


  async getAllPosts() {
    const URL_ROUTE = '/Posts/getAll';

    return new axios({
      method: 'get',
      url: `${this.url}${URL_ROUTE}`,
      params: {}
    })

  }

  async getPost_withID(PID) {
    const URL_ROUTE = `/Posts/get/${PID}`

    return new axios({
      method: 'get',
      url: `${this.url}${URL_ROUTE}`,
      params: {}
    })
  }

  async createUser(Username, password) {
    const URL_ROUTE = `/User/create`

    return axios.post(`${this.url}${URL_ROUTE}`, {
      Username: Username,
      password: password
    }) 
  }

  async loginUser(Username, password) {
    const URL_ROUTE = `/User/login`

    return axios.post(`${this.url}${URL_ROUTE}`, {
      Username: Username,
      password: password
    })
  }

  async validateUserToken(token) {
    const URL_ROUTE = `/User/login`

    return axios.post(`${this.url}${URL_ROUTE}`, {token: token})
  }

}


export default RequestSender;