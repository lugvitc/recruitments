import { SessionContext, supabase } from "../supabase";

import { useContext, useEffect, useState } from "react";
import { OrbitBackground } from "../components/background";
import { Navigate } from "react-router-dom";
import { departments as deplookup } from "./book";



const lookup = Object.assign(deplookup, {
    meda_social: "media",
    media_des: "media",
    media_photo: "media"
})

interface App {
    id: number;
    dep: keyof (typeof lookup);
    selected: boolean;
};

export default function Result() {
    const [loaded, setLoaded] = useState(false);
    const session = useContext(SessionContext);
    const [dep, setDep] = useState<App[]>([]);

    const departments = Array.from((new Set(dep.map((v) => (lookup[v.dep] || "").toLowerCase()))).values());

    useEffect(() => {
        if (session === null) return
        // This stuff should be in a loader
        supabase
            .from("applicants")
            .select("id,dep,selected")
            .eq("email", session!.user!.email!)
            .then((records) => {
                setDep(records.data as App[] || []) // TODO validation
                setLoaded(true);
            });

    }, [session?.user?.email]);

    if (session === null) {
        localStorage.setItem("redirect", "/result");
        return <Navigate to={"/auth"} />
    }

    return (
        <>
            <div className="h-screen fixed top-0 -z-10 w-full">
                <div className=" h-screen w-full bg-transparent">
                    <OrbitBackground />
                </div>
            </div>
            <section className="flex justify-center items-center pb-[var(--nav-height)]">
                <div className={"p-4 bg-[#000000ab] min-w-44 max-w-[340px]"}>
                    {loaded ? (
                    <>
                        <h1 className="text-5xl uppercase font-mono">
                            {
                                departments.length > 0 ? (
                                    <>
                                    You <br />were <br />
                                    <span className=" italic text-yellow-400 font-semibold">
                                        Accepted
                                    </span>
                                    </>
                                ) : (
                                    <>Better Luck <br /><span className=" italic text-yellow-400 font-semibold">next</span> time</>
                                )
                            }

                        </h1>
                        <div className="text-sm">
                            {
                                departments.length > 0 ?
                                (departments.length > 1 ? (
                                    <>
                                        Congratulations! you were accepted into the <span className=" italic text-yellow-400 font-semibold">{departments.slice(1, -1).reduce((acc, v) => acc + ", " + v, departments[0])}</span> and <span className=" italic text-yellow-400 font-semibold">{departments[departments.length - 1]}</span> department
                                        <br/>We are so excited to have you on board, we will contact you soon!
                                    </>
                                ) : (
                                    <>
                                    Congratulations! you were accepted into the <span className=" italic text-yellow-400 font-semibold">{departments[0]}</span> department.
                                    <br/>We are so excited to have you on board, we will contact you soon!
                                    </>
                                )) : (
                                    <>Although you were not accepted this time, you still have a long journey ahead of you. <span className="italic">Stay passionate about the things you love &lt;3</span>
                                    {/* <br/><span className="text-xs">And keep following us for more awesome events to come!</span> */}
                                    </>
                                )
                            }
                        </div>
                    </>) : (
                        "Loading"
                    )}
                </div>
            </section>
        </>
    )
}