import { connection } from "@/app/dbConfig/dbConfig";

connection();

import User from "@/Models/User.Modle";
import { NextRequest, NextResponse } from "next/server";

import { getDataFromToken } from "@/Auth/GetDataFromToken";

export async function GET(request: NextRequest) {
  try {
   
    console.log("incoming_Cookies:", request.cookies);
    
    const userId = getDataFromToken(request);
    console.log("userId:", userId);
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return NextResponse.json({ Error: "User is not found" });
    }
    return NextResponse.json({ Message: "User found", data: user });
  } catch (error: any) {
    console.log("Error:", error);
    return NextResponse.json({ error: error.message });
  }
}
