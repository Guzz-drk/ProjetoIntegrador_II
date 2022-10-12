import axios from "./axios-common";

class TipoServicoSrv {
  url = "/tipoServico";
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

  async alterar(data) {
    return await axios.put(this.url, `/${data}`).catch((err) => {
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
export default new TipoServicoSrv();
