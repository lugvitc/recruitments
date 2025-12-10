import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import "./mainbg.scss";
import "./apply.scss";
import {
  createContext,
  Fragment,
  useContext,
  useEffect,
  useState,
} from "react";
import { SessionContext, supabase } from "../supabase";
import { Navigate } from "react-router-dom";
import { rec_open } from ".";
// import { useEffect, useRef } from 'react';

export const departments = {
  management: "Management",
  cont: "Content",
  media: "Media",
  // tech: "Technical",
};

const preferences = 2;

const questions: { [key: string]: (string | any)[] | undefined } = {
  media: [
    "Portfolio Link / Website Link / Work Links. If multiple put everything in a text file, upload to your drive and share the link, make sure access is set to everyone",
    "Why the media department of The Linux Club",
    "List the tools/software you are proficient in (e.g., Adobe Photoshop, Illustrator, Figma, etc.).",
    "Please describe your experience in media-related activities (e.g., design, photography, social media management).",
    "What do you hope to achieve by being part of this team?",
    "How many hours per week can you dedicate to the Linux Club’s media activities?",
    "Describe a time when you faced a creative challenge. How did you overcome it?",
    "How well do you collaborate in a team?",
  ],

  management: [
    "What according to you is expected of a member of the Management Department at Linux Club?",
    "Describe any Previous Managerial Experience, What was your specific role and what was the outcome?",
    "What are the top 3 skills that you possess that would make you a great fit for this role.",
    "Suppose there is an event happening and hardly 2 days are left for the event, and your team is stuck with an implementation of a particular task which is hampering the progress of planning and execution, all the teammates are down and demotivated, none of you have found a feasible solution. What would you do?",
    "A 24 hour hackathon is going on in MG Auditorium, and at around after-dinner (10pm) time, people want to get out of the Auditorium even after repeated instructions. A group of participants are getting very furious. What do you do?",
  ],

  cont: [
    "Why are you interested in joining the Content Team of the Linux Club?",
    "In your opinion, what makes a piece of content engaging and effective? Feel free to provide an example of content that you think exemplifies these qualities",
    "Have you had any previous experience in writing? If yes, please share a Drive link of your work.",
    "Which writing format do you find yourself most confident and comfortable working with ? (eg: short,attractive pieces or long,formal content)",
    "If you were tasked with writing an engaging and informative description for a technical event or hackathon, how would you structure the content to capture the audience’s attention while clearly conveying the necessary details?",
  ],

  tech: [
    "If there was a novel idea that you would like to work on in the distant future (or are working on it right now), what would it be?",
    "If there was something you would want to learn, what would it be?",
    "Links to your profiles/projects (for eg. Github, portfolio website, etc.) if none, write a bit about your technical journey",
    "Share with us your technical interests/motivations",
  ],
};

const notes: { [key: string]: (string | any)[] | undefined } = {
  tech: [
    <div className="font-mono">
      <h3>Technical Subdepartments</h3>
      <ul className=" list-disc text-sm ml-4">
        <li>
          Development - Creating bots, building full stack applications,
          attending hackathons (
          <a href="https://github.com/lugvitc" className="intext">
            github.com/lugvitc
          </a>
          )
        </li>
        <li>
          OS - Ricing, Distrohopping, creating OS derivatives (i use arch btw)
        </li>
        <li>
          Cybersecurity - Attending CTF events, creating questions and
          organising CTF events. (
          <a href="https://ctftime.org/team/303100" className="intext">
            ctftime.org/team/303100
          </a>
          )
        </li>
        <li>
          Embedded Systems - Working with routers, switches, ESP32s, camera
          devices etc.
        </li>
        <li>
          DevOps - Managing and automating the infrastructure of all our
          services online.
          {/* (
          <a href="https://hub.lugvitc.net" className="intext">
            hub.lugvitc.net
          </a>
          ) */}
        </li>
      </ul>
    </div>,
  ],
};

const common_questions = [
  "Why do you want to join the Linux Club?",
  "What other clubs/chapter are you part of? If none, input NA",
];

const pref = [
  "Which department interests you the most in the Club?",
  "Which other department interests you in the Club? (Optional)",
];

function CommonQuestions({ name }: { name: string }) {
  return (
    <>
      {common_questions.map((question, index) => {
        return (
          <Fragment key={index}>
            <label htmlFor={`${name}.${index}`}>{question}</label>
            <Field name={`${name}.${index}`} as="textarea" required rows={3} />
          </Fragment>
        );
      })}
    </>
  );
}

function Questions({ dep, name }: { [key: string]: string }) {
  return (
    <>
      {notes[dep] !== undefined ? notes[dep] : null}
      {questions[dep] !== undefined
        ? questions[dep]!.map((question, index) => {
            return (
              <Fragment key={index}>
                <label htmlFor={`${name}.${index}`}>{question}</label>
                <Field
                  name={`${name}.${index}`}
                  as="textarea"
                  required
                  rows={3}
                />
              </Fragment>
            );
          })
        : ""}
    </>
  );
}

function Preference({ req, ...props }: any) {
  // console.log(onChange)
  return (
    <Field as="select" {...props} defaultValue="none">
      <option
        disabled={req === true}
        value="none"
        style={req === true ? { display: "none" } : {}}
      >
        None
      </option>
      {Object.entries(departments).map(([key, label]) => (
        <option value={key} key={key}>
          {label}
        </option>
      ))}
    </Field>
  );
}

const CountContext = createContext<number>(0);

function Application({ values, isSubmitting, isValidating }: any) {
  const session = useContext(SessionContext);
  const count = useContext(CountContext);

  return (
    <Form className="flex flex-col gap-2 p-8" autoComplete="off">
      <div>Applying with email {session!.user.email}</div>
      <label htmlFor="name">Name</label>
      <Field name={`name`} required />
      <label htmlFor="regno">Registration Number</label>
      <Field name={`regno`} required />
      <label htmlFor="contact">Contact number</label>
      <Field name={`contact`} type="tel" required />
      <CommonQuestions name="common_questions" />

      <hr />

      <FieldArray name="apps">
        {(arrayHelpers) => (
          <div className="flex flex-col gap-2">
            {values.apps && values.apps.length > 0
              ? values.apps.map((app: any, index: number) => (
                  <div key={index} className="flex flex-col gap-2">
                    <label htmlFor={`apps.${index}.dep`}>
                      Department Preference
                      {/* {index + 1} */}
                      <br />
                      {pref[index]}
                    </label>
                    <Preference name={`apps.${index}.dep`} req={index === 0} />
                    <Questions dep={app.dep} name={`apps.${index}.questions`} />
                    {index !== preferences - 1 ? <hr /> : ""}
                  </div>
                ))
              : ""}

            {values.apps.length + count < preferences && (
              <>
                <label htmlFor="temppref">
                  <h2>
                    Department Preference
                    {/* {values.apps.length + 1} */}
                  </h2>{" "}
                  {pref[values.apps.length]}
                </label>
                <Preference
                  key={values.apps.length}
                  name="temppref"
                  onChange={(sel: any) => {
                    arrayHelpers.push({ dep: sel.target.value, questions: [] });
                  }}
                  req={values.apps.length !== preferences - 1}
                />
              </>
            )}
            {count > 0 ? (
              <div className=" text-green-300 italic">
                You have successfully submitted {count} preferences till now.
              </div>
            ) : null}
          </div>
        )}
      </FieldArray>
      <div className="text-sm italic text-red-500">
        <ErrorMessage name="apps" />
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
        {isSubmitting && !isValidating ? "Submitting" : "Submit"}
      </button>
    </Form>
  );
}

function validateForm(values: any) {
  const errors: any = {};
  if (values.apps.length === 0)
    errors.apps = "Please fill atleast one department preference";
  else if (
    new Set(values.apps.map((a: any) => a.dep)).size !== values.apps.length
  )
    errors.apps = "Cannot have duplicate prefrences";
  else if (values.apps.length > preferences)
    errors.apps = `Cannot have more than ${preferences} prefrences`;
  return errors;
}

function onSumbitFactory(
  sig: number,
  setSig: (arg0: number) => any,
  session: any,
) {
  async function onSubmit(values: any, formikBag: any) {
    console.log("onSubmit <-", ...arguments);
    // formikBag.setSubmitting(true);

    const common: any = {};
    common.email = session.user.email;
    common.contact = values.contact;
    common.name = values.name;
    common.regno = values.regno.trim().toLowerCase();

    // const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    // await sleep(2000);

    const rows = values.apps
      .filter(
        (app: any) =>
          app.dep !== "none" && app.dep !== undefined && app.dep !== null,
      )
      .map((app: any) => ({
        ...common,
        dep: app.dep,
        formdata: {
          questions: Object.fromEntries(
            questions[app.dep]!.map((q, i) => [q, app.questions[i]]),
          ),
          common_questions: Object.fromEntries(
            common_questions.map((q, i) => [q, values.common_questions[i]]),
          ),
        },
      }));

    const resp = await supabase.from("applicants").insert(rows).select();

    if (resp.error !== null) {
      alert("Something went wrong while submitting your application!");
      console.log(resp, rows, values, session);
    } else {
      setSig(sig + 1);
      values.apps = [];
      formikBag.resetForm({ values: values });
      if (sig > 2) {
        console.log("End of the world");
      }
    }
  }

  return onSubmit;
}

// const open = true;

export default function Apply() {
  const session = useContext(SessionContext);
  // const navigate = useNavigate();
  const [count, setCount] = useState<number | undefined>(undefined);

  const [sig, setSig] = useState(0);

  useEffect(() => {
    // alert(session)
    if (session === null) {
      // navigate("/auth");
      return;
    }
    supabase
      .from("applicants")
      .select("email")
      .eq("email", session!.user!.email!)
      .then((records) => {
        setCount(records.data?.length);
      });
  }, [session?.user?.email, sig]);

  if (session === null) {
    localStorage.setItem("redirect", "/apply");
    return <Navigate to={"/auth"} />;
  }

  return (
    <section className={(session !== null ? "apply" : "") + " main"}>
      <main>
        <CountContext.Provider value={count || 0}>
          {rec_open ? (
            session !== null ? (
              <div className=" border-2 sm:rounded-md sm:w-fit w-full max-w-[640px] border-[#202020] text-white backdrop-blur-md bg-[#ffffff09]">
                {(count || 0) < preferences ? (
                  <Formik
                    initialValues={{
                      apps: [],
                      name: session?.user?.user_metadata?.full_name || "",
                      common_questions: [],
                    }}
                    onSubmit={onSumbitFactory(sig, setSig, session)}
                    validate={validateForm}
                  >
                    {Application}
                  </Formik>
                ) : (
                  <div className="p-8">
                    <h1 className="mb-2 text-xl font-bold">Success</h1>
                    <p>
                      Your application was received, keep an eye on your mail
                      box, we will email you regarding your shortlisting, don't
                      miss it!
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <span className="text-2xl">Not logged in</span>
              </div>
            )
          ) : (
            <div className=" border-2 sm:rounded-md sm:w-fit w-full max-w-[640px] border-[#202020] text-white backdrop-blur-md bg-[#ffffff09] p-8">
              Applications have been closed, thank you for your interest.
            </div>
          )}
        </CountContext.Provider>
      </main>
    </section>
  );
}
