import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useReducer, useRef, useState } from 'react';
import auth from '../../firebase.init';
import { Link } from 'react-router-dom';

const Login = () => {
    const [success, setSuccess] = useState(false);
    const [loginError, setLogInError] = useState('');
    const emailRef = useRef();


    const handleLogin = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const pass = e.target.pass.value;
        console.log(email, pass);

        //reset status
        setSuccess(false);
        setLogInError('');

        //login user
        signInWithEmailAndPassword(auth, email, pass)
        .then((userCrediantial) => {
            console.log(userCrediantial.user);

            if(!userCrediantial.user.emailVerified){
                setLogInError("Please varify first!");
                return;
            }else {
                setSuccess(true);
            }

        })
        .catch(error => {
            console.log("Error", error.message);
            setLogInError(error.message);
        })
    }
    

    const forgetPass = () => {
        console.log("Give me email address", emailRef.current.value);
        const email = emailRef.current.value;
        if(!email){
            console.log("Please provide a valid email!");
        }else {
            sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log("Password Reset Email sent, please check");
            })
            .catch(error => {
                console.log("Error", error);
            })
        }
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name='email' ref={emailRef} placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name='pass' placeholder="password" className="input input-bordered" required />
                <label onClick={forgetPass} className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            <p className='text-xs text-center p-1 hover:bg-slate-400 hover:text-black transition-all cursor-pointer'>new to this website <Link to='/signup'>sign up</Link> </p>
            {
                success && <p className='bg-green-500 p-2 text-black'>User Log in Successfull</p>
            }
            {
                loginError && <p className='bg-red-500 p-2 text-white'>{loginError}</p>
            }
          </div>
        </div>
      </div>
    );
};

export default Login;