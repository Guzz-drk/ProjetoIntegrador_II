function ValidaCampoVazio(obj){
    let msg = undefined;

    obj?.forEach(({ atr, value}) => {
        if(!value || value.toString().trim() === '') msg = `O campo ${atr} é obrigatório`});
        return msg;
}
module.exports = ValidaCampoVazio;