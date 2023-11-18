import { Session } from "next-auth";
import Link from "next/link";
import {signOut} from "next-auth/react";
import {useRouter} from "next/navigation";



const AccountOptions = ({ user , closeAccount }: any) => {
    const router = useRouter()

    const handleSignIn = async () => {
        await signOut({redirect : false})
        closeAccount()
    }

    return (
        <div className='flex flex-wrap'>
            <p className='text-[26px] w-full font-semibold text-center'>{user?.fullName}</p>
            <Link className='w-full hover:bg-secAccent/20 p-2 text-[20px] effect' href='/profile'>פרופיל</Link>
            <Link className='w-full hover:bg-secAccent/20 p-2 text-[20px] effect' href='/my-ads'>המודעות שלי</Link>
            <hr className='my-1 w-full'/>
            <button onClick={handleSignIn} className='w-full hover:bg-secAccent/20 p-2 text-[20px] effect' >התנתקות</button>
        </div>
    );
};

export default AccountOptions;
