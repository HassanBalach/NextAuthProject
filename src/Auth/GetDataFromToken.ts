
import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";



export const getDataFromToken = (request: NextRequest) => {
  try {
    console.log("COOKIED", request.cookies.getAll());
    
    const token = request.cookies.get('token')?.value || "";
    console.log("token:", token);
    
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);
    console.log("decodedToken:", decodedToken);
    

    if (typeof decodedToken === "object" && "userID" in decodedToken) {
      return (decodedToken as JwtPayload).userID;
    } else {
      throw new Error("Invalid token");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
