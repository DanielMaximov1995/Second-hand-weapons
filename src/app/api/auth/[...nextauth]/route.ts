import NextAuth from "next-auth";
import {dbConnect} from "@/utils/database/db";
import {authOptions} from "@/utils/authOprions";

dbConnect()

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }