const jwt = require('jsonwebtoken');
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env


function authMiddleware(request, response, next) {
    try {
        const token = request.headers.authorization;

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
