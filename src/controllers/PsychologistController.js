const generatePassword = require('password-generator');
const Joi = require('joi');
/*
Remove this coment, to user password bcypt to psychologist
const bcrypt = require('bcryptjs');*/
const transporter = require('../config/email.config');
const Psychologist = require('../models/Psychologist');
const UserPatient = require('../models/UserPatient');
const nodemailer = require('nodemailer');

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
            // Remove this coment, to user password bcypt to psychologist
            //const encriptedPassword = bcrypt.hashSync(password, 8);

            const psychologist = await Psychologist.create({
                name,
                lastName,
                email,
                gender,
                bond,
                password/*: encriptedPassword*/,
                phone,
                specialization,
                biography,
                userImage,
            });

              await transporter.sendMail({
                from: '"e-saude UnB" <esaudtest@gmail.com>',
                to: email, 
                subject: "Bem vindo ao E-saudeUNB", 
                text: `A sua senha é ${password}`,
              });
                      
            return res.status(201).json(psychologist);
        } catch (err) {
            console.log(err);
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
            const { password } = req.body;

            const user = await Psychologist.findOne({
                email: req.params.email,
            }).exec();

            user.password = password;

            await user.save();
            return res.status(200).json(user);
        } catch (err) {
            return res
                .status(500)
                .json({ message: 'falha ao atualizar senha' });
        }
    },
};
