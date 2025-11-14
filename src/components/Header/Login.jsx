import React, { useContext, useState } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
    const { signInUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState("");

    const handleLogIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInUser(email, password)
            .then(result => {
                console.log(result);
                e.target.reset();
                navigate('/');
            })
            .catch(error => {
                console.log(error);

                // Show error message
                setErrorMsg("❌ Unauthorized: Incorrect Email or Password");

                // Auto hide after 3 seconds
                setTimeout(() => setErrorMsg(""), 3000);
            });
    };

    return (
        <motion.div
            className="flex justify-center items-center min-h-screen 
            bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 
            px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className="card bg-white w-full max-w-sm shadow-lg rounded-2xl py-6 px-6 border border-gray-200">

                <h2 className='font-bold text-2xl text-center text-gray-800 mb-3'>
                    Login to your account
                </h2>

                {/* ERROR MESSAGE */}
                {errorMsg && (
                    <div className="mb-3 p-2 text-center text-red-600 bg-red-100 border border-red-300 rounded-lg text-sm">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleLogIn} className="card-body p-0 space-y-3">
                    <fieldset className="fieldset">

                        {/* Email */}
                        <label className="label text-gray-600 font-medium">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            className="input input-bordered w-full bg-gray-50 border-gray-300"
                            placeholder="Enter your email address"
                            required
                        />

                        {/* Password */}
                        <label className="label text-gray-600 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="input input-bordered w-full bg-gray-50 border-gray-300"
                            placeholder="Enter your password"
                            required
                        />

                        <div className="flex justify-end mt-1">
                            <button type="button" className="text-sm text-blue-500 hover:text-blue-600">
                                Forgot password?
                            </button>
                        </div>

                        {/* Login Button */}
                        <motion.button
                            type="submit"
                            className="btn btn-primary w-full mt-3 bg-red-500 hover:bg-red-400 border-none"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.96 }}
                        >
                            Login
                        </motion.button>

                        <p className="text-center text-gray-700 text-sm font-medium pt-3">
                            Don't have an account?{" "}
                            <Link to="/auth/register" className="text-blue-600 hover:underline">
                                Register
                            </Link>
                        </p>
                    </fieldset>
                </form>
            </div>
        </motion.div>
    );
};

export default Login;
