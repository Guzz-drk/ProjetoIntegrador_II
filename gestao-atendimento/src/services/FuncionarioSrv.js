import axios from "./axios-common";

class FuncionarioSrv {
  url = "/funcionario";
  async listar() {
    return await axios.get(this.url).catch((err) => {
      throw err;
    });
  }
  async incluir(data) {
    return await axios.post(this.url, data).catch((err) => {
      throw err;
    });
  }
  async alterar({ idfuncionario, ...data }) {
    return await axios
      .put(`${this.url}/${idfuncionario}`, { ...data })
      .catch((err) => {
        throw err;
      });
  }
  async excluir(id) {
    return await axios.delete(`${this.url}/${id}`).catch((err) => {
      throw err;
    });
  }
  async obterPeloId(id) {
    return await axios.get(`${this.url}/${id}`).catch((err) => {
      throw err;
    });
  }
}
export default new FuncionarioSrv();
