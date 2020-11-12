/* eslint-disable linebreak-style */
const generatePassword = require('password-generator');
const Joi = require('joi');
// const bcrypt = require('bcryptjs');
const Psychologist = require('../models/Psychologist');
const UserPatient = require('../models/UserPatient');

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
    userImage: Joi.string().allow(''),
}).options({ abortEarly: false });

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

            return res.status(200).json();
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
            return res.status(500).json({ message: 'falha ao dar o update', err });
        }
    },

    async updatePassword(req, res) {
        try {
            const { oldPassword, password } = req.body;

            const user = await Psychologist.findOne({
                email: req.params.email,
            }).select('+password');

            if (user) {
                if (await bcrypt.compare(oldPassword, user.password)) {
                    const token = jwt.sign(
                        { email: user.email },
                        authConfig.secret,
                        {
                            expiresIn: 86400,
                        },
                    );

                    user.password = password;
                    await user.save();

                    return res.status(200).json({
                        user,
                        accessToken: token,
                    });
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
};
