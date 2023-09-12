const jwt = require('jsonwebtoken');
<<<<<<< HEAD
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

=======
>>>>>>> 20dca36645aea160833785cf405846b68d2ddd29

function authMiddleware(request, response, next) {
    try {
        const token = request.headers.authorization;
<<<<<<< HEAD

=======
        
>>>>>>> 20dca36645aea160833785cf405846b68d2ddd29
        if (token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(
                accessToken,
                process.env.TOKEN_SECRET,
                (error, user) => {
                    if (error) {
                        return response.status(401).json({
                            error: 'Usuário não autorizado!'
                        });
                    }
                    request.userId = user.id;
                    next();
                }
            );
        }
    } catch (error) {
        return response.status(500).json({
            error: `Erro interno: ${error}`
        });
    }
}

module.exports = { authMiddleware };
