const nodemailer = require("nodemailer")

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            post: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
                }
            })
    }

    async SendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: to,
            subject: 'Актвивация аккаунта на ' + process.env.API_URL,
            text: '',
            html: 
                `
                <div>
                    <h1>Для активации перейдите по ссылке:</h1>
                    <a href="${link}"></a>
                </div>
                `
        })
        console.log('SendActivationMail')

    }
}

module.exports = new MailService()