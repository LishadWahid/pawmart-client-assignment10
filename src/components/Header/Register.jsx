import React, { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

const Register = () => {

    const { createUser, signInUser, } = use(AuthContext);

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log({ name, photo, email, password });

        createUser(email, password)
        .then(result => {
            console.log = result.user;
        })
        .catch(error => {
            console.log(error);
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
                        <input name="name" type="text" className="input" placeholder="Enter your name" required />
                        {/* Photo URL */}
                        <label className="label">Photo URL</label>
                        <input name='photo' type="text" className="input" placeholder="Enter your Photo URL" required />
                        {/* Email */}
                        <label className="label">Email</label>
                        <input name='email' type="email" className="input" placeholder="Enter your email address" required />
                        {/* password */}

                        <label className="label">Password</label>
                        <input name='password' type="password" className="input" placeholder="Enter your password" required />

                        {/* Show validation message */}
                        {/* {passwordError && (
                            <p className="text-red-600 text-sm mt-2">{passwordError}</p>
                        )} */}

                        <button type='submit' className="btn btn-neutral mt-4">Register</button>
                        <p className='font-semibold text-center pt-5'>Allready Have An Account ? <Link className='text-secondary' to='/auth/login'>Login</Link></p>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Register;