class NotaFiscalView {
    static createSucess() {//console.log('Nota fiscal criada!\n');}
    static deleteSucess() {//console.log('Nota fiscal deletada!\n');}
    static updateSucess() {//console.log('Nota fiscal atualizada!\n');}
    
    static createFail(error) {console.error('Erro ao cadastrar nota fiscal:', error);}
    static deleteFail(error) {console.error('Erro ao deletar nota fiscal:', error);}
    static updateFail(error) {console.error('Erro ao atualizar nota fiscal:', error);}
    
    static listaSucess(lista) {
        //console.log(lista.map(tarefa => tarefa.dataValues));
        //console.log('Lista recuperada!\n');
    }
    static buscaSucess(notafiscal) {
        //console.log(notafiscal.dataValues)
        //console.log('Nota fiscal recuperado!\n');
    }

    static listaFail(error) {console.error('Erro ao listar notas fiscal:', error);}
    static buscaFail(error) {console.error('Erro ao buscar nota fiscal:', error);}
    
    static notFind(){//console.log('O que foi buscado não foi encontrado.')}
}

module.exports = { NotaFiscalView };


 