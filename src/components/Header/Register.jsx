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
        // console.log('google btn clicked')
        signInWithPopup(auth, googleProvider)
            .then(result => {
                console.log('Google Sign In Success:', result.user)
                // navigate('/');
                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL
                }
                fetch('http://localhost:3000/users/', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('data after user save', data);
                    })
            })
            .catch(error => {
                console.log('Google Sign In Error:', error);
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                });
            })
    }

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
                    navigate('/auth/login')
                })

            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            })
    }

    return (
        <div className='flex justify-center min-h-screen items-center'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
                <h2 className='font-semibold text-2xl text-center'>Register your account</h2>
                <form onSubmit={handleRegister} className="card-body">
                    <fieldset className="fieldset">
                        {/* Name */}
                        <label className="label">Name</label>
                        <input name="name" type="text" className="input input-bordered w-full" placeholder="Enter your name" required />
                        {/* Photo URL */}
                        <label className="label">Photo URL</label>
                        <input name='photo' type="text" className="input input-bordered w-full" placeholder="Enter your Photo URL" required />
                        {/* Email */}
                        <label className="label">Email</label>
                        <input name='email' type="email" className="input input-bordered w-full" placeholder="Enter your email address" required />
                        {/* password */}

                        <label className="label">Password</label>
                        <input name='password' type="password" className="input input-bordered w-full" placeholder="Enter your password" required />

                        {/* Show validation message */}
                        {passwordError && (
                            <p className="text-red-600 text-sm mt-2">{passwordError}</p>
                        )}

                        <button type='submit' className="btn btn-primary mt-4">Register</button>

                        <button className='btn btn-primary mt-2' onClick={handleGoogleSignIn}>Sign In With Google</button>

                        <p className='font-semibold text-center pt-5'>Allready Have An Account ? <Link className='text-secondary' to='/auth/login'>Login</Link></p>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Register;