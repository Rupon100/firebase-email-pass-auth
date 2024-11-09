import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import auth from '../../firebase.init';
import { useState } from 'react';
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";


const Signup = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [eye, setEye] = useState(false);

    const handleSignUp = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const pass = e.target.pass.value
        const terms = e.target.terms.checked;
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        console.log(email, pass, terms, name, photo);

        // reset error and status
        setErrorMsg('');
        setSuccess(false);


        if(!terms){
            setErrorMsg('please accept out terms and consition');
            return
        }
        
        if(pass.length < 6){
            setErrorMsg('pass should be 6 char:)');
            return;
        }

        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
        if(!passwordPattern.test(pass)){
            setErrorMsg('please set at least 1 upper case,1 lower case, 1 special character!');
            return
        }else{
            setSuccess(true)
        }


        //create user with email and pass
        createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredintial) => {
            console.log(userCredintial.user)
            setSuccess(true);

            // send varification email  to user
            sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log("Varification email send");
            });

            // update profile information
            const profile = {
                displayName: name,
                photoURL: photo
            }
            updateProfile(auth.currentUser, profile)
            .then(() => {
                console.log("User profile update");
            })
            .catch(error => {
                console.log('profile update error', error);
            })

        })
        .catch(error => {
            console.log("Error", error.message);
            setErrorMsg(error.message);
            setSuccess(false);
        })
    };


    return (
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col ">
        <h1 className='text-4xl font-bold'>Signup</h1>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSignUp} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" name='name' placeholder="Name" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input type="text" name='photo' placeholder="photo url" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>

                <input type={eye ? "text" : "password"} name='pass' placeholder="password" className="input input-bordered" required />

                <button type='button' onClick={() => setEye(!eye)} className='btn btn-xs absolute right-4 top-12'>
                  {
                    eye ? <FaEye /> :  <FaEyeSlash />
                  }
                </button>

                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-2">
                  <input type="checkbox" name='terms' className="checkbox" />
                  <span className="label-text">Accept terms & condition</span>
                </label>
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary">Sign up</button>
              </div>

              

            </form>
          </div>
          {
            errorMsg ? <p className='text-sm font-semibold text-red-600'>{errorMsg}</p> : <p></p>
          }
          {
            success && <p className='bg-green-500 p-2 text-black'>Succesfully sign up :)</p>
          }
        </div>
      </div>
    );
};

export default Signup;