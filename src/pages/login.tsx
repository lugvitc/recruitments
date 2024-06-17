
import { useContext, useEffect } from 'react';
import Card from '../components/Card';
import { SessionContext, supabase } from '../supabase';
import './mainbg.scss';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const session = useContext(SessionContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (session !== null) {
            navigate("/apply");
        }
    })

    return (
        <section className='main'>
            <main>
                <Card className="flex flex-col gap-4 max-w-80">
                    <span className='text-xl font-semibold'>Authentication</span>
                    <button className='flex items-center rounded-md text-center bg-yellow-400 text-black font-medium hover:bg-black hover:text-white transition-all border border-yellow-400'
                        onClick={() => {supabase.auth.signInWithOAuth({
                            provider: "google",
                            options: {
                                redirectTo: `${window.location.origin}/auth/`
                            }
                        })}}>
                        <div className='bg-yellow-400 p-2 rounded-l-md'><img src='/google.svg' className=' h-8 w-8'/></div>
                        <div className='p-2 w-full'>Continue with Google</div>
                    </button>
                    <span className='text-sm'>Authenticate with your google account to secure your application</span>
                </Card>
            </main>
        </section>
    )
}
