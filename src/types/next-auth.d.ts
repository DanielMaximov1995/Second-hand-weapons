import {UserModelType} from "@/types/Models";

declare module "next-auth" {

    interface Session {
        user: UserModelType
    }
}