import axios from "./axios-common";
class LogoutSrv {
  url = "/funcionario/logout";
  async logout(data) {
    return await axios.post(this.url, data).catch((err) => {
      throw err;
    });
  }
}
export default new LogoutSrv();
