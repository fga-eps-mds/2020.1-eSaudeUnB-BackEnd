const transporter = require('./email.config');
const UserPatient = require('../models/UserPatient');

module.exports = {
    async waitinglist(emailPatient, position) {
        const user = await UserPatient.findOne({ email: emailPatient });
        await transporter.sendMail({
            from: '"e-saudeunb" <e-saude@unb.br>',
            to: emailPatient,
            subject: 'Lista de Espera',
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
                            Olá ${user.name} ${user.lastName} 
</h1>
                        <p>
                            Nos recebemos sua solicitação de atendimento
<br />
você é o(a) ${position} na lista de espera<br />
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
