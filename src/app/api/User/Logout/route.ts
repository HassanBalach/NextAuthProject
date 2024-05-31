import { connection } from "@/app/dbConfig/dbConfig";

connection();

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const respone = NextResponse.json({
      message: "Loggout successfully:",
      success: true,
    });

    respone.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return respone
  } catch (error: any) {
    console.log("Error", error);
    return NextResponse.json({ error: error.message });
  }
}
