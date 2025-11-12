import React, { use } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const googleProvider = new GoogleAuthProvider();

const Login = () => {
    
    const { signInUser } = use(AuthContext);
    
    const handleGoogleSignIn = () => {
        // console.log('google btn clicked')
        signInWithPopup(auth, googleProvider)
            .then(result => {
                console.log(result)
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            })
    }

    const navigate = useNavigate();

    const handleLogIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log({ email, password });

        signInUser(email, password)
            .then(result => {
                console.log(result.user);
                e.target.reset();
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            })
    }


    return (
        <div className='flex justify-center min-h-screen items-center' initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} >
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
                <h2 className='font-semibold text-2xl text-center'>Login your account</h2>
                <form onSubmit={handleLogIn} className="card-body">
                    <fieldset className="fieldset">

                        {/* email address */}
                        <label className="label">Email address</label>
                        <input type="email" name='email' className="input input-bordered w-full" placeholder="Enter your email address" required />

                        {/* password */}
                        <label className="label">Password</label>
                        <input type="password" name='password' className="input input-bordered w-full" placeholder="Enter your password" required />

                        <div>
                            <button
                                type="button"
                                className="link link-hover text-blue-500"
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* {error && <p className='text-red-400 text-xs'>{error}</p>} */}

                        <motion.button
                            type="submit"
                            className="btn btn-primary mt-2 px-4 py-1 text-sm rounded-md relative overflow-hidden"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            whileHover={{
                                scale: 1.03,
                                y: -1,
                                boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
                            }}
                            whileTap={{
                                scale: 0.96,
                                y: 0,
                            }}
                        >
                            <span className="relative z-10">Login</span>

                            {/* subtle light sweep */}
                            <motion.span
                                className="absolute top-0 left-[-80%] w-[50px] h-full bg-white/10 rotate-12"
                                animate={{ left: ["-80%", "130%"] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2.8,
                                    ease: "easeInOut",
                                }}
                            />
                        </motion.button>

                        <button className='btn btn-primary mt-2' onClick={handleGoogleSignIn}>Sign In With Google</button>

                        <p className='font-semibold text-center pt-5'>Don't Have An Account ? <Link className='' to='/auth/register'>Register</Link></p>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Login;