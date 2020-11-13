const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: 'shany67@ethereal.email',
        pass: 'Ywbd6VXefbM7g45aVe',
    },
});

module.exports = transporter;
