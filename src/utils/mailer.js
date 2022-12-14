const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  host: "smtp.aol.com",
  port: 465,
  secure: true,
  /*auth: {
    user: process.env.AOL_USERNAME,
    pass: process.env.AOL_PASSWORD,
  }, verision obsoleta*/
  providerauth: { user: process.env.AOL_USERNAME }, // user -> important
  pass: process.env.AOL_PASSWORD,
})

exports.verify = async () => {
  const status = await transporter.verify()
  console.log(
    status ? "Connection with email server established" : "something went wrong"
  )
}

exports.welcome = async ({ email, name }) => {
  const styles = {
    title: "color: lightblue",
    colum:
      "font-family:Helvetica,Arial,Helvetica,sans-serif;color:#111111;font-size:14px;line-height:18px;",
    table: "background-color:#e4ebf1;min-width:413px;min-width:320px",
    button:
      "border-radius: 5px;width: 40%;height: 52px;background-color: #22d1b1;color: rgb(255, 255, 255);box-shadow: rgb(0 0 0 / 15%) 0px 4px 31px;text-decoration: none;display: flex;-webkit-box-pack: center;justify-content: center;flex-direction: column;text-align: center;margin:20px;",
  }
  const links = {
    href: "https://makeitreal.camp/",
    logo: "https://res.cloudinary.com/dw9hr6agh/image/upload/v1652726787/regions/logo-white_css_ydezkw.svg",
  }

  await transporter.sendMail({
    from: "Braulio Nole <branoler@aol.com>",
    to: email,
    subject: "Welcome Landscape!",
    // html: '<div style="background-color:goldenrod"><h1 style="color: lightblue">Welcome to Landscape ' + user.name + '</h1></div>',
    html: `
    <div>
    <table cellpadding="0" cellspacing="0" style="${styles.table}" width="100%">
    <tbody>
    <tr height="40">
    <td align="center" bgcolor="#22d1b1" style="font-family:Helvetica,Arial,Helvetica,sans-serif;color:#111111;font-size:14px;line-height:18px;">
    <a href="${links.href}">
    <img alt="Landscape_Logo" src="${links.logo}" width="150" class="CToWUd" height="100">
    </a>
    </td>
    </tr>
    <tr>
    <td align="center" style="${styles.colum} ;padding:0 0 8px;font:500 24px/22px Arial,Helvetica,sans-serif,Fira;color:#0e2f5a;padding:36px 40px 18px" bgcolor="#ffffff">
    <span class="il">Welcome</span> to Landscape
    </td>
    </tr>
    <tr>
    <td bgcolor="#ffffff" align="center" style="${styles.colum};padding:0 0 14px;font:600 14px/18px Arial,Helvetica,sans-serif,Fira;color:#0066b8;border-bottom:1px solid #c7cfd9"></td>
    </tr>
    <tr>
    <td bgcolor="#ffffff" align="center" style="${styles.colum};padding-left:0;padding-right:0;padding:20px 40px 0px;font:500 18px/24px Arial,Helvetica,sans-serif,Fira">
    ${name},
    <br>
    <br>Congratulations! Welcome to Landscape, we love having you as part of our community.
    You can start enjoying Landscape now
    <a href="${links.href}" target="_blank" data-="" style="${styles.button}">Join Landscape
    </a>
    </td>
    </tr>
    </tbody></table>
    </div>
    `,
    text: "Welcome to Landscape, Congratulations! Welcome to Landscape, we love having you as part of our community. You can start enjoying Landscape now",
  })
}
