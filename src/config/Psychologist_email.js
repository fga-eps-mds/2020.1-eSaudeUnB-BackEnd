const transporter = require('./email.config');

async function PsyEmail(psychologist) {
    await transporter.sendMail({
        from: '"e-saudeunb" <e-saude@unb.br>',
        to: psychologist.email,
        subject: 'Senha',
        html: `<body style="justify-content: flex-start; columns: auto; align-items: center">
                    <img
                        src="https://svgshare.com/i/RUt.svg"
                        alt="Logo"
                        style="background-color: #0459ae; width: 500px; height: 50px"
                    />
                    <h1>Olá ${psychologist.name} ,bem vindo ao E-SaúdeUNB</h1>
                    <p>
                        Seja bem vindo(a) à plataforma E-Saúde UNB. Seu email foi cadastrado
                        como ${psychologist.bond}, e uma senha aleatória foi gerada para a utilização da
                    plataforma.<br />
                    </p>
                    <h2>Sua senha é: ${psychologist.password}</h2>
                    <p>
                        Esta senha,caso sejá de seu interesse, pode ser alterada dentro da
                        plataforma
                    </p>
                    <p>clique no Botão abaixo para acessar a plataforma</p>
                    <a
                        href="http://localhost:3000"
                        style="
                    background: none;
                    border: none;
                    font: 700 1rem Poppins;
                    color: #0459ae;
                    cursor: pointer;
                    "
                    >Clique Aqui</a
                    >
                </body>`
        ,
    });
}
module.exports = PsyEmail;
