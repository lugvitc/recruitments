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
import { useNavigate } from "react-router-dom";
// import { useEffect, useRef } from 'react';

const departments = {
  management: "Management",
  mms: "Marketing and Sponsorhips",
  cont: "Content",
  tech_dev: "Technical - Development",
  tech_linux: "Technical - Linux",
  tech_cyber: "Technical - Cybersecurity",
  meda_social: "Media - Social Media Management",
  media_des: "Media - Designing and Editing",
  media_photo: "Media - Event Photography",
};

const questions: { [key: string]: (string | any)[] | undefined } = {
  tech_dev: [
    "What is your field of expertise in development?",
    "What development frameworks or technologies do you use? (eg: React, Python. NoSQL etc.)",
    "Links to your github or any hosted projects",
    "Did you notice any issues in this platform or possible ways to make it better? Describe with as technical detail as possible",
    "Any bugfix you did in the past, that demonstrates your problem solving ability.",
  ],
  tech_linux: [
    "What is a swap?",
    "Under what user does /usr/bin/passwd run?",
    "Interpret the permission given by chmod 4776",
    'What is "top -i"?',
    "What is secure boot?",
  ],
  tech_cyber: [
    "What is the name of the family of vulnerabilities arising from invalid escape sequences",
    "Which attack consists of making a malicious request to another website?",
    "A web vulnerability arising from improper sanitisation of user content and use of .innerHtml?",
    "What is a buffer overflow, what capabilities can you gain from this vulnerability?",
    "A process has a secret hash, it takes an input and performs a simple equality check against the hash. What vulnerability can be employed to guess the secret if memory access is not possible?",
  ],

  meda_social: [
    "Share any social media accounts you’ve managed before, if any, can also be a personal account.",
    "How do you plan on managing social media activities along with your academics and other activities?",
    "Propose an idea to increase engagement and followers for the Linux Club’s Instagram.",
    "Any additional information or comments you would like to share?",
  ],
  media_des: [
    "Link to Portfolio and, if available, resume.",
    "What software do you primarily use for designing and editing",
    "Describe a design or editing project you’ve worked on that you are particularly proud of. What was your role, and what were the results? Also, share any links to it. (Fill with NIL if not applicable)",
    "Are you comfortable working under tight deadlines for media projects?",
    "Any additional information or comments you would like to share?",
  ],
  media_photo: [
    "Link to Portfolio and, if available, resume.",
    "Do you have experience in photographing events?",
    "How long are you willing to spend at an event hosted by the Linux Club to film and photograph?",
    "Can you put together engaging, fast-paced reels with lots of personality?",
    "How would you approach capturing good-quality photographs in challenging lighting conditions (say, MG auditorium)?",
    "Any additional information or comments you would like to share?",
  ],

  management: [
    "How would you approach the SWC to request permission to conduct an event? List out all the steps",
    "You missed a chance to connect with your club mates, and now the team has grown closer while you feel like a stranger. Who will you approach to break the ice and fulfil your responsibilities?",
  ],
  mms: [
    "Do you have prior experience in getting sponsors for events?",
    "How would you approach a cybersecurity firm to sponsor a club CTF event?",
    "Do you have prior experience in marketing or managing a marketing team? If so specify what you have worked upon",
    "How would you market an umbrella in summer season?",
  ],
  cont: [
    "How familiar are you with different content formats such as articles, social media posts. Do you have a preference or specialty?",
    "Which type of content attracts the user's eyes in your opinion and why?",
    "Do you have prior experience in writing content for events, blogs and social media handles? If so, specify where you worked.",
  ],
};

const common_questions = [
  "Why do you want to join the Linux Club?",
  "Have you ever used any Linux distro? Whats your favourite distro?",
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
                      Department Preference {index + 1}
                      <br />
                      {pref[index]}
                    </label>
                    <Preference name={`apps.${index}.dep`} req={index === 0} />
                    <Questions dep={app.dep} name={`apps.${index}.questions`} />
                    {index !== 1 ? <hr /> : ""}
                  </div>
                ))
              : ""}

            {values.apps.length + count < 2 && (
              <>
                <label htmlFor="temppref">
                  <h2>Department Preference {values.apps.length + 1}</h2>{" "}
                  {pref[values.apps.length]}
                </label>
                <Preference
                  key={values.apps.length}
                  name="temppref"
                  onChange={(sel: any) => {
                    arrayHelpers.push({ dep: sel.target.value, questions: [] });
                  }}
                  req={values.apps.length !== 1}
                />
              </>
            )}
            {count === 1 ? (
              <div className=" text-green-300 italic">
                You have successfully submitted one preference till now.
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
    values.apps.length === 2 &&
    values.apps[0].dep === values.apps[1].dep
  )
    errors.apps = "Second preference cannot be same as first preference.";
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

export default function Apply() {
  const session = useContext(SessionContext);
  const navigate = useNavigate();
  const [count, setCount] = useState<number | undefined>(undefined);

  const [sig, setSig] = useState(0);

  useEffect(() => {
    if (session === null) {
      navigate("/auth");
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

  return (
    <section className={(session !== null ? "apply" : "") + " main"}>
      <main>
        <CountContext.Provider value={count || 0}>
          {session !== null ? (
            <div className=" border-2 sm:rounded-md sm:w-fit w-full max-w-[640px] border-[#202020] text-white backdrop-blur-md bg-[#ffffff09]">
              {(count || 0) < 2 ? (
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
                <div className="p-8 text-xl">
                  You have completed your application!
                </div>
              )}
            </div>
          ) : (
            <div>
              <span className="text-2xl">Not logged in</span>
            </div>
          )}
        </CountContext.Provider>
      </main>
    </section>
  );
}

