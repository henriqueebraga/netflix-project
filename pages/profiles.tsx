import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false
            }
        }
    }
    return {
        props: {},
    };
}


const Profiles = () => {
    const router = useRouter();
    const { data } = useCurrentUser();
    const user = data?.currentUser;

    return (
        <div className="flex items-center h-full justify-center">
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-6xl text-white text-center">Who is watching?</h1>
                <div className="flex item-center justify-center gap-8 mt-10">
                    <div onClick={() => {router.push('/')}}>
                        <div className="group flex-row w-44 mx-auto">
                            <div 
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    w-44 
                                    h-44 
                                    rounded-md
                                    border-2
                                    border-transparent
                                    group-hover:cursor-pointer
                                    group-hover:border-white
                                    overflow-hidden
                                    "                          
                            >
                                <img src="/images/default-profile.png" alt="Profile" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-center text-2xl mt-4 group-hover:text-white">
                                    {user?.name}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profiles