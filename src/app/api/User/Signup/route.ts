import { connection } from "@/app/dbConfig/dbConfig";

connection();

import User from "@/Models/User.Modle";
import { NextRequest, NextResponse } from "next/server";
import bcriptjs from 'bcryptjs';
import { sendMail } from "@/Auth/mail";

export async function POST(request: NextRequest) {
    try {

        const bodyRequest = await request.json();
        console.log(bodyRequest);
        const { userName, email, password } = bodyRequest;

        // Check if the user is already verify
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json(
                {
                    Error: "The email is already exist:",
                },
                { status: 400 }
            );
        }

        // Hashing Password

         const salt = bcriptjs.genSaltSync(10);
         const hashPassword = await bcriptjs.hash(password , salt)   

        const newUser = new User({
            userName,
            email,
            password: hashPassword,
        });
        
        await newUser.save();
        const final_User = await User.findOne(newUser._id).select('-password');

        console.log("newUser:", final_User);

        // Varify the email

       await sendMail({email , emailType: "VERIFY" , userId: final_User._id})
      
        

        return NextResponse.json({  
            status: "200",
            successMessage: "User is successfully registered",
            final_User,
        });
    } catch (error: any) {
        console.log("SingUP_Error:", error);
    }
}
