const registrationSuccessEmailBody = (userData) => `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #333;
          font-size: 24px;
          margin-bottom: 10px;
        }
        p {
          color: #777;
          font-size: 16px;
          line-height: 1.5;
          margin-bottom: 10px;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
          font-size: 18px;
        }
        .button:hover {
          background-color: #0056b3;
        }
        a {
          color: #007bff;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <p>Hallo ${userData?.user?.name},</p>
        <p>Vielen Dank, dass Sie sich bei smartinserat.net registriert haben. Um Ihr Konto zu aktivieren, verwenden Sie bitte den folgenden Aktivierungscode:</p>
        <h1>${userData?.activationCode}</h1>
        <p>Bitte geben Sie diesen Code innerhalb der nächsten 5 Minuten auf der Aktivierungsseite ein.</p>
        <p>Wenn Sie sich nicht bei smartinserat.net registriert haben, ignorieren Sie bitte diese E-Mail.</p>
        <p>Wenn Sie Fragen haben, kontaktieren Sie uns bitte unter<p/>
        <a href="mailto:kontakt@smartinserat.net">kontakt@smartinserat.net</a>.
      </div>
    </body>
  </html>
`;


module.exports = {
  registrationSuccessEmailBody,
};