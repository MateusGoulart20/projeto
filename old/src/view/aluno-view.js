class AlunoView {
    static createSucess() {//console.log('Aluno criado!\n');}
    static deleteSucess() {//console.log('Aluno deletado!\n');}
    static updateSucess() {//console.log('Aluno atualizado!\n');}
    
    static createFail(error) {console.error('Erro ao cadastrar aluno:', error);}
    static deleteFail(error) {console.error('Erro ao deletar aluno:', error);}
    static updateFail(error) {console.error('Erro ao atualizar aluno:', error);}
    
    static listaSucess(lista) {
        //console.log(lista.map(tarefa => tarefa.dataValues));
        //console.log('Lista recuperada!\n');
    }
    static buscaSucess(aluno) {
        //console.log(aluno.dataValues)
        //console.log('Aluno recuperado!\n');
    }

    static listaFail(error) {console.error('Erro ao listar alunos:', error);}
    static buscaFail(error) {console.error('Erro ao buscar aluno:', error);}
    
}

module.exports = { AlunoView };


 