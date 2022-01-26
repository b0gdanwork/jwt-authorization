const nodemailer = require("nodemailer")

 class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            post: 587,
            secure: false,
            auth: {
                user: 'testbogdan970@gmail.com',
                pass: '123454321Qw'
                }
            })
    }

    async SendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Актвивация аккаунта на ' + process.env.API_URL,
            text: link,
            html:
                `
                <div>
                    <h1>Для активации перейдите по ссылке:</h1>
                    <a href="${link}">${link}</a>
                </div>
                `
        })
    }
}

module.exports = new MailService()