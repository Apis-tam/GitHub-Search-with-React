import axios from "axios";

const api= {
  search: {
    repository: (search) => axios.get(`https://api.github.com/search/repositories?q=${search}`).then(res =>res.data),
    organization: (search) => axios.get(`https://api.github.com/search/organizations?q=${search}`).then(res =>res)
}

}
export default api