//Ishan Parikh
//Purpose: http request sender class
import axios from 'axios'



class RequestSender {
  url;

  constructor() {
    //read info from backendindo.json file
    //test url------------
    //this.url = "http://localhost:4000";

    //production url--------
    this.url = String(process.env.REACT_APP_BACKEND_HOSTNAME);
  }


  async getAllPosts() {
    const URL_ROUTE = '/Posts/getAll';

    return new axios({
      method: 'get',
      url: `${this.url}${URL_ROUTE}`,
      params: {}
    })

  }

  async getPostsWithUserID(UID) {
    const URL_ROUTE = `/Posts/getAll/${UID}`

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

  async removePost(PID) {
    const URL_ROUTE = `/Posts/remove/${PID}`

    return new axios({
      method: 'delete',
      url: `${this.url}${URL_ROUTE}`,
      params: {}
    })
  }

  //Preconditions: all information for all db objects should be correct and present
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

  async updatePost(Coffee, Post, TasteProfile, UID) {
    console.log(JSON.stringify(Coffee) + '\n' + JSON.stringify(Post) + '\n' + UID)
    const URL_ROUTE = `/Posts/update`
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