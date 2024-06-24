
import { useContext, useEffect, useState } from 'react';
import Card from '../components/Card';
import { SessionContext, supabase } from '../supabase';
import './mainbg.scss';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik, FormikValues } from 'formik';

function sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
}


export default function Login() {
    const session = useContext(SessionContext);
    const navigate = useNavigate();

    const [sentAt, setSentAt] = useState<number>(-1);
    const [left, setLeft] = useState<number>(-1)

    useEffect(() => {
        if (session !== null) {
            // navigate("/apply");
            navigate("/book");
        }
    })

    return (
        <section className='main'>
            <main>
                <Card className="flex flex-col gap-4 max-w-80">
                    <span className='text-xl font-semibold'>Authentication</span>
                    <div className='flex flex-col gap-2 items-center justify-center'>
                        <Formik initialValues={{email: ""}} onSubmit={function (values: FormikValues,): void | Promise<any> {
                            const promise = supabase.auth.signInWithOtp({
                                email: values.email,
                                options: {
                                    emailRedirectTo: `${window.location.origin}/auth/`
                                }
                            }).then((resp) => {
                                console.log(resp)
                                if (resp.error) {
                                    alert(`Something went wrong: ${resp.error.status} ${resp.error.message}`);
                                    return;
                                }
                                const now = Date.now() / 1000;
                                setSentAt(now);
                                setLeft(60);
                                sleep(60 * 1000 + 1).then(() => {
                                    setSentAt(-1);
                                    setLeft(-1);
                                })

                                const r = () => {
                                    const x = Math.floor(60 - (Date.now() / 1000 - now));
                                    setLeft(x);
                                    if (x > 0) sleep(1000).then(r);
                                }
                                r();
                            })

                            return promise;
                        } }>
                            {({ isSubmitting }) => (
                                <Form className='flex flex-col gap-6 w-full'>
                                    <label htmlFor='email' className='-mb-4 ml-1'>
                                        Email
                                    </label>
                                    <Field type="email" name="email" id="email" placeholder="example@example.com" required></Field>
                                    <button
                                        className={ "flex items-center rounded-md text-center text-black font-semibold transition-all border w-full" + (
                                            (sentAt > 0 || isSubmitting) ? " bg-yellow-700 border-yellow-700" : " bg-yellow-400 hover:bg-black hover:text-white border-yellow-400"
                                        )}
                                        type='submit'
                                        disabled={sentAt > 0 || isSubmitting}
                                    >
                                        <div className={'p-2 rounded-l-md ' + ((sentAt > 0 || isSubmitting) ? "" : " bg-yellow-400")}><img src='/mail.svg' className=' h-8 w-8'/></div>
                                        <div className='p-2 w-full'>Continue with Email</div>
                                    </button>
                                    {sentAt <= 0 && isSubmitting ? (<div className='text-sm'>Sending email...</div>) : ""}
                                    {sentAt > 0 ? (
                                        (<div className='text-sm'>Check you email for login link{ left > 0 ? `, get another link in ${left} seconds` : null } </div>)
                                    ) : null}
                                </Form>
                            )}
                        </Formik>
                        <div className='italic'>or</div>
                        <button className='flex items-center rounded-md text-center bg-yellow-400 text-black font-medium hover:bg-black hover:text-white transition-all border border-yellow-400 w-full'
                            onClick={() => {supabase.auth.signInWithOAuth({
                                provider: "google",
                                options: {
                                    redirectTo: `${window.location.origin}/auth/`
                                }
                            })}}>
                            <div className='bg-yellow-400 p-2 rounded-l-md'><img src='/google.svg' className=' h-8 w-8'/></div>
                            <div className='p-2 w-full'>Continue with Google</div>
                        </button>
                    </div>
                    <span className='text-sm'>Authenticate yourself to secure your application</span>
                </Card>
            </main>
        </section>
    )
}
