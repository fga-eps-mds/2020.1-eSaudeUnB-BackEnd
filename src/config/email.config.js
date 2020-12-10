const nodemailer = require('nodemailer');

module.exports = {
    async transporter() {
        return (nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'esaudtest@gmail.com',
                pass: 'uR64JhObSqU0',
            },
        }));
    },
};
