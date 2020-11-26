const generatePassword = require('password-generator');
const Joi = require('joi');
//  remove coment when use bcrypt in psychologist
// const bcrypt = require('bcryptjs');
const Psychologist = require('../models/Psychologist');
const UserPatient = require('../models/UserPatient');
const transporter = require('../config/email.config');

const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),

    lastName: Joi.string()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: false })
        .required(),

    specialization: Joi.string()
        .required(),

    biography: Joi.string()
        .allow('')
        .min(0)
        .max(300),

    gender: Joi.string()
        .allow('')
        .max(1)
        .required(),

    bond: Joi.string()
        .allow(''),

    phone: Joi.number()
        .allow(''),

    userImage: Joi.string()
        .allow(''),
}).options({ abortEarly: false });

const schemaUpdatePasswordPsy = Joi.object({
    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

});

module.exports = {
    async store(req, res) {
        try {
            const password = generatePassword(8, false);
            const {
                name,
                lastName,
                email,
                specialization,
                biography,
                phone,
                gender,
                bond,
                userImage,
            } = req.body;

            const psyUser = await Psychologist.findOne({ email });
            const user = await UserPatient.findOne({ email });

            if (psyUser || user) {
                return res.status(200).json(psyUser);
            }

            const { error, value } = schema.validate({
                name,
                lastName,
                email,
                specialization,
                biography,
                phone,
                gender,
                bond,
                userImage,
            });

            if (error) {
                return res.status(203).json({ value, error });
            }

            // const encriptedPassword = bcrypt.hashSync(password, 8);

            const psychologist = await Psychologist.create({
                name,
                lastName,
                email,
                gender,
                bond,
                password,
                phone,
                specialization,
                biography,
                userImage,
            });

            await transporter.sendMail({
                from: '"e-saudeunb" <e-saude@unb.br>',
                to: email,
                subject: 'Senha',
                html: `<body style="justify-content: flex-start; columns: auto; align-items: center">
                    <img
                        src="https://svgshare.com/i/RUt.svg"
                        alt="Logo"
                        style="background-color: #0459ae; width: 500px; height: 50px"
                    />
                    <h1>Olá ${name} ,bem vindo ao E-SaúdeUNB</h1>
                    <p>
                        Seja bem vindo(a) à plataforma E-Saúde UNB. Seu email foi cadastrado
                        como ${bond}, e uma senha aleatória foi gerada para a utilização da
                    plataforma.<br />
                    </p>
                    <h2>Sua senha é: ${password}</h2>
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

            return res.status(201).json(psychologist);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },

    async show(req, res) {
        try {
            const { email } = req.params;
            const user = await Psychologist.findOne({ email });

            return res.status(200).json(user);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async index(req, res) {
        try {
            const users = await Psychologist.find();
            return res.status(200).json(users);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },

    async destroy(req, res) {
        try {
            const { email } = req.params;

            await Psychologist.deleteOne({ email });

            return res.status(200).json('Psychologist Remove');
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },

    async update(req, res) {
        try {
            const {
                name,
                lastName,
                gender,
                bond,
                phone,
                specialization,
                biography,
                userImage,
            } = req.body;

            const { email } = req.params;
            const user = await Psychologist.findOne({
                email,
            }).exec();

            if (name) {
                user.name = name;
            }
            if (lastName) {
                user.lastName = lastName;
            }
            if (email) {
                user.email = email;
            }
            if (gender) {
                user.gender = gender;
            }
            if (bond) {
                user.bond = bond;
            }
            if (phone) {
                user.phone = phone;
            }
            if (specialization) {
                user.specialization = specialization;
            }
            if (biography) {
                user.biography = biography;
            }
            if (userImage) {
                user.userImage = userImage;
            }

            const { error, value } = schema.validate({
                name,
                lastName,
                email,
                gender,
                bond,
                phone,
                specialization,
                biography,
                userImage,
            });

            if (error) {
                return res.status(203).json({ value, error });
            }
            await user.save();
            return res.status(200).json(user);
        } catch (err) {
            return res
                .status(500)
                .json({ message: 'falha ao dar o update', err });
        }
    },

    async updatePassword(req, res) {
        try {
            const { oldPassword, password } = req.body;
            const user = await Psychologist.findOne({ email: req.params.email });
            if (user) {
                if (oldPassword === user.password) {
                    // const encriptedPassword = bcrypt.hashSync(password, 8);

                    const { error, value } = schemaUpdatePasswordPsy.validate({
                        password,
                    });
                    if (error) {
                        return res.status(203).json({ value, error });
                    }

                    user.password = password;
                    await user.save();
                    return res.status(200).json({ user });
                }
                return res.status(400).json({ message: 'Senha Incorreta' });
            }
            throw new Error({ err: 'Usuário não encontrado' });
        } catch (err) {
            return res
                .status(500)
                .json({ message: 'falha ao atualizar senha' });
        }
    },
    async ForgetPass(req, res) {
        try {
            const password = generatePassword(8, false);
            const user = await Psychologist.findOne({ email: req.params.email });
            if (user) {
                // const encriptedPassword = bcrypt.hashSync(password, 8);
                user.password = password; // encriptedPassword;
                user.ForgetPassWord = 1;
                await user.save();
                await transporter.sendMail({
                    from: '"e-saudeunb" <e-saude@unb.br>',
                    to: user.email,
                    subject: 'Senha',
                    html: `<body style="justify-content: flex-start; columns: auto; align-items: center">
                        <table border="2" cellpadding="0" cellspacing="0">
                            <td>
                                <table border="25" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <img
                                            src="https://svgshare.com/i/RUt.svg"
                                            alt="Logo"
                                            style="
                                                background-color: #0459ae;
                                                width: 500px;
                                                height: 50px;
                                                display: block;
                                                padding-left: 25px;
                                                "
                                        />
                                    </tr>
                                    <tr>
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
                                                "
                                        >Clique Aqui</a
                                        >
                                    </tr>
                                    <tr>
                                        <img
                                            src="http://marca.unb.br/img/comemorativa_cor/unb50_comp_cor_preview.jpg"
                                            alt="UNB-50anos"
                                            style="
                                            background-color: #0459ae;
                                            width: 500px;
                                            height: 50px;
                                            display: block;
                                            padding-left: 25px;
                                            "
                                        />
                                    </tr>
                                </td>
                                </table>
                                </td>
                                </table>
                                </body>
                                `,
                });
                return res.status(200).json({ user });
            }
            throw new Error({ err: 'Usuário não encontrado' });
        } catch (err) {
            return res
                .status(500)
                .json({ message: 'falha ao dar o gerar nova senha' });
        }
    },
};
