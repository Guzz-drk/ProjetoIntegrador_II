import axios from "./axios-common";
class LoginSrv {
  url = "/funcionario/login";
  async login(data) {
    return await axios.post(this.url, data).catch((err) => {
      throw err;
    });
  }
}
export default new LoginSrv();
