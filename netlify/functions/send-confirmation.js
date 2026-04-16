import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event) {
  try {
    const data = JSON.parse(event.body);

    const { name, email, message } = data;

    // 📩 EMAIL CLIENT
    await resend.emails.send({
      from: "Evasia <onboarding@resend.dev>",
      to: email,
      subject: "Nous avons bien reçu votre demande ✨",
      html: `
        <h2>Bonjour ${name},</h2>
        <p>Merci pour votre message 🌿</p>

        <p><strong>Votre message :</strong></p>
        <p>${message}</p>

        <p>Nous revenons vers vous très rapidement ✈️</p>
        <p>— L’équipe Evasia</p>
      `,
    });

    // 📩 EMAIL POUR TOI
    await resend.emails.send({
      from: "Evasia <onboarding@resend.dev>",
      to: "hello@evasia.com",
      subject: "Nouveau message reçu 📩",
      html: `
        <h2>Nouveau contact</h2>
        <ul>
          <li><strong>Nom :</strong> ${name}</li>
          <li><strong>Email :</strong> ${email}</li>
          <li><strong>Message :</strong> ${message}</li>
        </ul>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}