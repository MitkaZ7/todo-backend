import nodemailer from 'nodemailer'
class MailService {
  constructor(){
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })
  }

  async sendActvationLink(to, link){
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Активация аккаунта my-own-todo-list',
      text: '',
      html: `
      <div>
        <h2>Для активации аккаунта перейдите по ссылке:</h2>
          <a href='${link}'>${link}</a>
      </div>
      `
    })
  }
}
export default new MailService();
