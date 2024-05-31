import { connection } from "@/app/dbConfig/dbConfig";

connection();

import User from "@/Models/User.Modle";
import { NextRequest, NextResponse } from "next/server";
import bcriptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    console.log("ReqBody in logged:", reqbody);
    const { email, password } = reqbody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "Invalid Email, it is not present" });
    }
    console.log("user:", user);

    const validPassword = await bcriptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ error: "Invalid Passwrod" });
    }

    console.log("validPassword:", validPassword);

    const tokenPayload = {
      userID: user._id,
      userName: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, {
      expiresIn: 60 * 60,
    });
    console.log("Token:", token);

    const response = NextResponse.json({
      message: "Login successfully",
      success: true,
    });
    
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    console.log("Error:", error);
    return NextResponse.json({ Error: error.message });
  }
}
