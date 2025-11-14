import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import Swal from 'sweetalert2';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const googleProvider = new GoogleAuthProvider();

const Register = () => {

    const { createUser, logOut } = use(AuthContext);
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                console.log('Google Sign In Success:', result.user);

                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL
                };
                fetch('https://pawmart-server-sandy.vercel.app/users/', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => console.log('data after user save', data));
                navigate('/');
            })
            .catch(error => {
                console.log('Google Sign In Error:', error);
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                });
            });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setPasswordError('');

        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log({ name, photo, email, password });

        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const isLengthValid = password.length >= 6;

        if (!hasUppercase) {
            setPasswordError('Password must contain at least one uppercase letter.');
            return;
        }
        if (!hasLowercase) {
            setPasswordError('Password must contain at least one lowercase letter.');
            return;
        }
        if (!isLengthValid) {
            setPasswordError('Password must be at least 6 characters long.');
            return;
        }

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log('Register User', user);
                logOut().then(() => {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Account created successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    navigate('/auth/login');
                });
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            });
    };

    return (
        <div
            className="flex justify-center items-center min-h-screen 
            bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 
            px-4"
        >
            <div className="card bg-white w-full max-w-sm shadow-lg rounded-2xl py-6 px-6 border border-gray-200">
                <h2 className="font-bold text-2xl text-center text-gray-800 mb-3">
                    Register your account
                </h2>

                <form onSubmit={handleRegister} className="card-body p-0 space-y-3">
                    <fieldset className="fieldset">
                        {/* Name */}
                        <label className="label text-gray-600 font-medium">Name</label>
                        <input
                            name="name"
                            type="text"
                            className="input input-bordered w-full bg-gray-50 border-gray-300"
                            placeholder="Enter your name"
                            required
                        />

                        {/* Photo URL */}
                        <label className="label text-gray-600 font-medium">Photo URL</label>
                        <input
                            name="photo"
                            type="text"
                            className="input input-bordered w-full bg-gray-50 border-gray-300"
                            placeholder="Enter your Photo URL"
                            required
                        />

                        {/* Email */}
                        <label className="label text-gray-600 font-medium">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="input input-bordered w-full bg-gray-50 border-gray-300"
                            placeholder="Enter your email address"
                            required
                        />

                        {/* Password */}
                        <label className="label text-gray-600 font-medium">Password</label>
                        <input
                            name="password"
                            type="password"
                            className="input input-bordered w-full bg-gray-50 border-gray-300"
                            placeholder="Enter your password"
                            required
                        />

                        {/* Show validation message */}
                        {passwordError && (
                            <p className="text-red-600 text-sm mt-2">{passwordError}</p>
                        )}

                        <button type="submit" className="btn btn-primary w-full mt-3 bg-red-500 hover:bg-red-400 border-none">
                            Register
                        </button>

                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="btn w-full mt-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2"
                        >
                            <img
                                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                alt="Google Logo"
                                className="w-5 h-5"
                            />
                            Sign in with Google
                        </button>

                        <p className="text-center text-gray-700 text-sm font-medium pt-3">
                            Already have an account?{" "}
                            <Link to="/auth/login" className="text-blue-600 hover:underline">
                                Login
                            </Link>
                        </p>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Register;
