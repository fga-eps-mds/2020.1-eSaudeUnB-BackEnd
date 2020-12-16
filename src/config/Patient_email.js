const transporter = require('./email.config');

module.exports = {
    async PatientEmail(user) {
        await transporter.sendMail({
            from: '"e-saude UnB" <esaudtest@gmail.com>',
            to: user.email,
            subject: 'Bem vindo ao E-saudeUNB',
            html: `<body style="justify-content: flex-start; columns: auto; align-items: center">
                    <img
                        src="https://svgshare.com/i/RUt.svg"
                        alt="Logo"
                        style="background-color: #0459ae; width: 500px; height: 50px"
                    />
                    <h1>Olá ${user.name} ,bem vindo ao E-SaúdeUNB</h1>
                    <p>
                        Seja bem vindo(a) à plataforma E-Saúde UNB. Seu email foi cadastrado
                        como Paciente.
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
                </body>`,
        });
    },
};
