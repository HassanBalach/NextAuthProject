import { connection } from "@/app/dbConfig/dbConfig";

connection();

import User from "@/Models/User.Modle";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    console.log("reqbody", reqbody);
    const { token } = reqbody;
    console.log("Token", token);
    const currentTime = Date.now();
    console.log("currentTime:", currentTime);
    




    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: currentTime },
    });
    console.log("verifyToken" , token);
    console.log("User befor if" , user);
    
    
    

    if (!user) {
      return NextResponse.json({ error: "Invalid Token user is not found" }, { status: 500 });
    }

    console.log("User", user);
    user.isVerify = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({
      message: "User is successfully verified:",
      success: true,
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
    console.log("Error", error);
    
  }
}
