import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import UserModel from "@/utils/database/models/UserModel";
import bcrypt from "bcryptjs";
import {dbConnect} from "@/utils/database/db";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any) {
                try {
                    const user = await UserModel.findOne({ email: credentials?.email?.toLowerCase() });
                    if (user) {
                        const isPasswordCorrect = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );

                        if(!isPasswordCorrect) {
                            throw new Error("אימייל/סיסמה שגויים!");
                        }

                        return user
                    }
                } catch (err: any) {
                    throw new Error("אימייל/סיסמה שגויים!");
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/',
        error: '/',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user } : any) {
            return { ...token, ...user }
        },
        async session({ session, user, token } : any) {
            const email = token.email
            await dbConnect();
            const getUser = await UserModel.findOne({ email });
            getUser.password = ''
            getUser.fullName = getUser.fullName.trim()
            session.user = getUser
            return getUser
        },
        async signIn() {
            return true
        }
    },
};