import React from "react";
import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../Utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Utils/firebase";
import { addUser } from "../Utils/AppSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errmsg, setErrMsg] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(
      email.current.value,
      password.current.value,
      name?.current?.value
    );
    setErrMsg(message);

    if (!isSignIn) {
      // Sign up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://tse4.mm.bing.net/th?id=OIP.lMrEVoSrwybqLrx7M_bthQHaK4&pid=Api&P=0&h=220",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  Email: email,
                  DisplayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {});
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMsg(errorCode + " - " + errorMessage);
        });
    } else {
      // Sign in/login
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMsg("user not found !!");
        });
    }
  };
  const toggleSignUp = () => {
    setIsSignIn(!isSignIn);
  };
  return (
    <div>
      <Header />
      <div className="absolute m-0">
        <img
          src="https://raw.githubusercontent.com/Ninad-arakh/React-Pr/master/ReactFlix_background.jpg"
          className="w-screen h-screen object-cover"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-12 absolute my-32 mx-auto right-0 left-0 text-white bg-black w-3/12 rounded-lg bg-opacity-75 xs:w-full xs:mt-0 xs:pt-24 xs:p-6 xs:bg-opacity-100 xs:h-[100%]  sm:w-6/12 md:w-4/12"
      >
        <h2 className="font-bold text-xl pb-3 xs:text-2xl">
          {isSignIn ? "Sign In" : "Sign up"}
        </h2>
        {!isSignIn && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-2 my-2 h-8 bg-gray-700 w-full rounded px-3"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email"
          className="p-2 my-2 h-8 bg-gray-700 w-full rounded px-3"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 my-2 h-8 bg-gray-700 w-full rounded px-3"
        />
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-
        2 px-4 rounded w-full my-6 h-8"
          onClick={handleButtonClick}
        >
          {isSignIn ? "Sign In" : "Sign up"}
        </button>
        <p className="text-red-500 font-bold py-2">{errmsg}</p>
        <p onClick={toggleSignUp} className="cursor-pointer hover:underline">
          {isSignIn
            ? "New to Netflix? Sign up now"
            : "Already a user? Sign in now"}
        </p>

        <br></br>

        {isSignIn && (
          <>
            <input type="checkbox" />
            <label> Remember me</label>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
