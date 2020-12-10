const transporter = require('./email.config');

module.exports = {
    async Fgetpassword(user, password) {
        await transporter.sendMail({
            from: '"e-saudeunb" <e-saude@unb.br>', // test
            to: user.email,
            subject: 'Senha',
            html: `<body style="justify-content: flex-start; columns: auto; align-items: center">
                        <img
                            src="https://svgshare.com/i/RUt.svg"
                            alt="Logo"
                            style="
background-color: #0459ae;
width: 500px;
height: 50px;
display: flex;
padding-left: 25px;
"
                        />
                        <h1>
                            Olá ${user.name} ,Sua senha foi alterado no E-SaúdeUNB
</h1>
                        <p>
                            Vim informar que sua senha foi alterada na
                            plataforma E-SaúdeUNB.
<br />
Se foi você. não se preocupe, sua senha foi alterada
com sucesso<br />
                            <h2>Sua senha é: ${password}</h2>
Caso está solicitação não tenha partido por você,
solicitamos que você clique no link abaixo, e altere
sua senha
</p>
                        <a
                            href="http://localhost:3000"
                            style="
background: none;
border: none;
font: 700 1rem Poppins;
color: #0459ae;
cursor: pointer;
display: flex;
align-items: center;
"
                        >Clique Aqui</a
                        >
                        <img
                            src="http://marca.unb.br/img/comemorativa_cor/unb50_comp_cor_preview.jpg"
                            alt="UNB-50anos"
                            style="
width: 500px;
height: 50px;
display: block;
padding-left: 25px;
padding-top: 25px;
"
                        />
                    </body>`
            ,
        });
    },
};
