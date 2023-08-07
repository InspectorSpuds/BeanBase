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

  async createPost(Coffee, Post, TasteProfile, UID) {
    console.log(JSON.stringify(Coffee) + '\n' + JSON.stringify(Post) + '\n' + UID)
    const URL_ROUTE = `/Posts/create`
    return axios.post(`${this.url}${URL_ROUTE}`, {
      Coffee: JSON.parse(JSON.stringify(Coffee)),
      Post: JSON.parse(JSON.stringify(Post)),
      TasteProfile: JSON.parse(JSON.stringify(TasteProfile)), 
      UID: UID
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
    const URL_ROUTE = `/User/validateLoginToken`

    return axios.post(`${this.url}${URL_ROUTE}`, {token: token})
  }

}


export default RequestSender;