class UserView {
    static userCreated() {
        //console.log('Usuário criado!');
    }

    static errorCreateUser(error) {
        console.error('Error ao criar usuário!', error);
    }
}

module.exports = { UserView };