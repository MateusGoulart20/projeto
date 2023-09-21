class MoradorView {
    static createSucess() {//console.log('Morador criado!\n');}
    static deleteSucess() {//console.log('Morador deletado!\n');}
    static updateSucess() {//console.log('Morador atualizado!\n');}
    
    static createFail(error) {console.error('Erro ao cadastrar morador:', error);}
    static deleteFail(error) {console.error('Erro ao deletar morador:', error);}
    static updateFail(error) {console.error('Erro ao atualizar morador:', error);}
    
    static listaSucess(lista) {
        //console.log(lista.map(tarefa => tarefa.dataValues));
        //console.log('Lista recuperada!\n');
    }
    static buscaSucess(morador) {
        //console.log(morador.dataValues)
        //console.log('Morador recuperado!\n');
    }

    static listaFail(error) {console.error('Erro ao listar moradores:', error);}
    static buscaFail(error) {console.error('Erro ao buscar morador:', error);}
    static invalid() {console.error('Entrada inválida');};
}

module.exports = { MoradorView };


 