import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/Models/User.Modle";


interface SendMailParams {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

export const sendMail = async ({
  email,
  emailType,
  userId,
}: SendMailParams) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    const verifyNote = `<p>Click <a href="${
      process.env.DOMAIN
    }/verifyemail?token=${hashedToken}">here</a> to ${
      emailType === "VERIFY" ? "verify your email" : "reset your password"
    }
    or copy and paste the link below in your browser. <br> ${
      process.env.DOMAIN
    }/verifyemail?token=${hashedToken}
    </p>`;

    if (emailType === "VERIFY") {

      const verifyEmail = await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
        { new: true }
      );
      console.log("verifyEmail", verifyEmail);
    }
     else if (emailType === "RESET") {
      console.log("Updating user for password reset:", userId);
      console.log("Hashed token:", hashedToken);
       const resetPassword =  await User.findByIdAndUpdate(
        userId,
         {
          forgetPasswordToken: hashedToken,
          forgetPasswordTokenExpiry: Date.now() + 3600000,
       }, { new: true });
       console.log("resetPassword:" , resetPassword);
       
     }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_USERPASSWORD,
      },
    });
    const mailOptions = await transporter.sendMail({
      from: "islamicrule999@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your Password",
      html: verifyNote,
    });

    return mailOptions;
  } catch (error) {}
};
