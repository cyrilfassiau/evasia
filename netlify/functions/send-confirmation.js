import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event) {
  try {
    const data = JSON.parse(event.body);

    const { name, email, message } = data;

    const response = await resend.emails.send({
      from: "Evasia <onboarding@resend.dev>", // à changer ensuite
      to: email,
      subject: "Nous avons bien reçu votre demande ✨",
      html: `
        <h2>Bonjour ${name},</h2>
        <p>Merci pour votre message 🌿</p>

        <p>Voici un récapitulatif de votre demande :</p>

        <ul>
          <li><strong>Nom :</strong> ${name}</li>
          <li><strong>Email :</strong> ${email}</li>
          <li><strong>Message :</strong> ${message}</li>
        </ul>

        <p>Nous revenons vers vous très rapidement ✈️</p>

        <p>— L’équipe Evasia</p>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, response }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}