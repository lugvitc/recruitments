import { ErrorMessage, Field, Form, Formik } from "formik";
import { createContext, Fragment, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { SessionContext, supabase } from "../supabase";
import { departments } from "./apply";
import "./apply.scss";
import "./mainbg.scss";


const CountContext = createContext<number>(0);

// const released: Set<string> = new Set(["cont", "mms"]);

interface App {
    id: number;
    dep: string;
    slot: number | null;
    shortlisted: boolean;
};

interface Slot {
    capacity: number;
    dep: string;
    id: number;
    timing: string;
};

function SlotSelect({ap, rawSlots}: {ap: App, rawSlots: Slot[]}) {
    const slots = rawSlots.filter((slot) => {
        return slot.dep === ap.dep && slot.capacity > 0;
    });

    if (ap.slot !== null) {
        const k = rawSlots.find((sl) => sl.id === ap.slot)
        return (
            <div>Your slot has been booked for <span className="italic">{k!.timing}</span></div>
        )
    }

    if (ap.shortlisted === false) {
        if (rawSlots.find((slot) => slot.dep === ap.dep) === undefined) return (
            <div>We are yet to release the result for this department</div>
        )
        else return (
            <div>Unfortunately you weren't shortlisted</div>
        )
    }

    if (slots.length === 0) {
        if (rawSlots.find((slot) => slot.dep === ap.dep) !== undefined) return (
            <div>No slots left, please contact us.</div>
        )
        else return (
            <div>You were shortlisted, check back later to book your slot</div>
        )
    }

    return (
        <Field name={`slots.${ap.id}`} as="select">
            <option
                disabled
                value="none"
                style={true ? { display: "none" } : {}}
            >
                None
            </option>
            {
                slots.map(
                    (slot, idx) => (
                        <option key={idx} value={slot.id}>
                            {slot.timing} - {slot.capacity} slots left
                        </option>
                    )
                )
            }
        </Field>
    )
}

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
        const promises = Object.entries(values.slots).filter((ent) => ent[1] != "none").map((v) => ({
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
    const [_app, setApp] = useState<App[]>([])

    // const app = _app.filter((ap) => ap.slot === null && ap.shortlisted === true)
    const app = _app;

    const [rawSlots, setRawSlots] = useState<Slot[]>([])

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
            .order("id", {ascending: true})
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
                        if (Object.values(values.slots).filter((v) => v !== "none").length === 0) return {slots: "Please select atleast one slot for booking"}
                        return {}
                    }}
                  >
                    {
                        ({isSubmitting, isValidating}) => (
                            <Form className="flex flex-col gap-2 p-8 md:w-[400px]" autoComplete="off">
                            {app.map(
                                (ap, idx) => (
                                    <Fragment key={idx}>
                                        <label htmlFor={`slots.${ap.id}`}>
                                            {departments[ap.dep as (keyof typeof departments)]} Interview Slot
                                        </label>
                                        <SlotSelect ap={ap} rawSlots={rawSlots}/>
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
                  <div className="p-8 text-lg">
                    It seems like you haven't applied. You can't participate in the interviews.
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