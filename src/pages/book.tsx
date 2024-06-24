import { ErrorMessage, Field, Form, Formik } from "formik";
import { createContext, Fragment, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { SessionContext, supabase } from "../supabase";
import { departments } from "./apply";
import "./apply.scss";
import "./mainbg.scss";


const CountContext = createContext<number>(0);

function onSumbitFactory(
    sig: number,
    setSig: (arg0: number) => any,
    app: {
        id: number;
        dep: string;
        slot: number | null;
        shortlisted: boolean;
    }[]
) {
    async function onSubmit(values: any, formikBag: any) {
        const promises = Object.entries(values.slots).map((v) => ({
            slot_id: parseInt(v[1] as string),
            applicant: parseInt(v[0]),
        })).map(
            (args) => supabase.rpc("bookslot", args).then(
                (resp) => {
                    console.log(args, resp)
                    if (resp.error !== null) {
                        alert(`Something while booking your slot for \
${departments[(app.find((a) => a.id === args.applicant)?.dep as unknown) as (keyof typeof departments)]} \
${resp.error.code} ${resp.error.message}`);
                        console.log(resp, values);
                    }
                    if (resp.data === false) {
                        alert(`Could not book your slot for ${departments[(app.find((a) => a.id === args.applicant)?.dep as unknown) as (keyof typeof departments)]}. Try again`);
                    }
                }
            )
        )

        await Promise.all(promises)

        setSig(sig + 1);
        Object.keys(values.slots).forEach((sl) => values.slots[sl] = "none");
        formikBag.resetForm({ values: values });

    }
    return onSubmit;
}

export default function Book() {
    const session = useContext(SessionContext);
    const [_app, setApp] = useState<{
        id: number;
        dep: string;
        slot: number | null;
        shortlisted: boolean;
    }[]>([])

    const app = _app.filter((ap) => ap.slot === null && ap.shortlisted === true)

    const [rawSlots, setRawSlots] = useState<{
        capacity: number;
        dep: string;
        id: number;
        timing: string;
    }[]>([])

    const count = app.length;

    const [loaded, setLoaded] = useState(false);

    const [sig, setSig] = useState(0);

    useEffect(() => {
        if (session === null) return
        // This stuff should be in a loader
        supabase
            .from("applicants")
            .select("id,dep,slot,shortlisted")
            .eq("email", session!.user!.email!)
            .then((records) => {
                setApp(records.data || [])
                setLoaded(true);
            });

        supabase
            .from("slots")
            .select()
            .then((records) => {
                setRawSlots(records.data || [])
            })

    }, [session?.user?.email, sig]);

    if (session === null) return <Navigate to={"/auth"} /> // make a protected layout

    // useEffect(() => {
    //     supabase
    //         .from("slots")
    //         .select()
    //         .then((records) => {
    //             setRawSlots(records.data || [])
    //         })

    // }, [sig])
    const islots: any = {}
    app.forEach((ap) => islots[ap.id] = "none");

    return (
      <section className={(session !== null ? "apply" : "") + " main"}>
        <main>
          <CountContext.Provider value={count || 0}>
            {loaded === false ? "Loading, give us a second" : (session !== null ? (
              <div className=" border-2 sm:rounded-md sm:w-fit w-full max-w-[640px] border-[#202020] text-white backdrop-blur-md bg-[#ffffff09]">
                {count !== 0 ? (
                  <Formik
                    initialValues={{
                      slots: islots,
                    }}
                    onSubmit={onSumbitFactory(sig, setSig, app)}
                    validate={(values) => {
                        if (Object.keys(values.slots).length !== app.length) return {slots: "Please select slots for all interviews, kindly contact us if no slots are left."}
                        return {}
                    }}
                  >
                    {
                        ({isSubmitting, isValidating}) => (
                            <Form className="flex flex-col gap-2 p-8 md:w-[400px]" autoComplete="off">
                            {app.map(
                                (ap, idx) => (
                                    <Fragment key={idx}>
                                        <label>
                                            {departments[ap.dep as (keyof typeof departments)]} Interview Slot
                                        </label>
                                        <Field name={`slots.${ap.id}`} as="select">
                                            <option
                                                disabled
                                                value="none"
                                                style={true ? { display: "none" } : {}}
                                            >
                                                None
                                            </option>
                                            {
                                                rawSlots.filter((slot) => {
                                                    return slot.dep === ap.dep && slot.capacity > 0;
                                                }).map(
                                                    (slot, idx) => (
                                                        <option key={idx} value={slot.id}>
                                                            {slot.timing} - {slot.capacity} slots left
                                                        </option>
                                                    )
                                                )
                                            }
                                        </Field>
                                    </Fragment>
                                )
                            )}
                            <div className="text-sm italic text-red-500">
                                <ErrorMessage name="slots" />
                            </div>
                            <button
                                type="submit"
                                className={
                                "rounded-md mt-4 text-center p-2 text-black font-semibold transition-all border max-w-28" +
                                (isSubmitting && !isValidating
                                    ? " bg-yellow-700 border-yellow-700"
                                    : " bg-yellow-400 hover:bg-black hover:text-white border-yellow-400")
                                }
                                disabled={isSubmitting && !isValidating}
                            >
                                {isSubmitting && !isValidating ? "Booking" : "Book"}
                            </button>
                            </Form>
                        )
                    }
                  </Formik>
                ) : (
                  <div className="p-8 text-xl">
                    {
                        _app.filter((ap) => ap.shortlisted === true).length > 0 ?
                        (
                            <>
                                Your slots have been booked
                                <ul className="flex p-2 flex-col gap-2">
                                {_app.map(
                                    (ap, idx) => {
                                        const k = rawSlots.find((sl) => sl.id === ap.slot)
                                        if (k !== undefined) return (
                                            <li key={idx}>
                                            <span className="font-bold">{departments[(k.dep as (keyof typeof departments))]}</span>
                                            <br/><span className="italic">{k.timing}</span>
                                            </li>
                                        )
                                    }
                                )}
                                </ul>
                            </>
                        ) :
                        (<>
                            Unfortunately you weren't shortlisted for interviewing,<br/>
                            but you are still awesome for being passionate about linux {":)"}
                        </>)
                    }
                  </div>
                )}
              </div>
            ) : (
              <div>
                <span className="text-2xl">Not logged in</span>
              </div>
            ))}
          </CountContext.Provider>
        </main>
      </section>
    );
  }