import { useState } from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import API from "../api/axios";

import { useAuth }
    from "../context/AuthContext";


function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] =
        useState({
            email: "",
            password: "",
        });


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post(
                "/auth/login",
                formData
            );

            login(res.data);

            navigate("/chat");

        } catch (error) {

            console.log(error);

            alert("Login Failed");

        }

    };


    return (
        <div
            className="
        min-h-screen
        flex items-center justify-center
        bg-gradient-to-br
        from-[#0F172A]
        via-[#111827]
        to-[#1E293B]
        overflow-hidden
        relative
      "
        >

            {/* GLOW EFFECTS */}
            <div className="absolute w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full top-10 left-10" />

            <div className="absolute w-72 h-72 bg-violet-500/20 blur-3xl rounded-full bottom-10 right-10" />


            {/* LOGIN CARD */}
            <div
                className="
          relative
          z-10
          w-[400px]
          p-8
          rounded-3xl
          backdrop-blur-2xl
          bg-white/10
          border border-white/10
          shadow-2xl
        "
            >

                <h1
                    className="
            text-4xl
            font-bold
            text-center
            mb-2
            bg-gradient-to-r
            from-cyan-400
            to-violet-500
            bg-clip-text
            text-transparent
          "
                >
                    Welcome Back
                </h1>

                <p className="text-slate-400 text-center mb-8">
                    Login to continue chatting
                </p>


                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="
              w-full
              px-5 py-3
              rounded-2xl
              bg-white/10
              border border-white/10
              text-white
              placeholder:text-slate-400
              outline-none
              focus:ring-2
              focus:ring-cyan-400
              backdrop-blur-xl
            "
                    />


                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="
              w-full
              px-5 py-3
              rounded-2xl
              bg-white/10
              border border-white/10
              text-white
              placeholder:text-slate-400
              outline-none
              focus:ring-2
              focus:ring-cyan-400
              backdrop-blur-xl
            "
                    />


                    <button
                        type="submit"
                        className="
              w-full
              py-3
              rounded-2xl
              bg-gradient-to-r
              from-violet-500
              to-cyan-500
              text-white
              font-semibold
              shadow-xl
              hover:scale-[1.02]
              transition-all duration-300
            "
                    >
                        Login
                    </button>

                </form>


                <p className="text-center text-slate-400 mt-6">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="
              ml-2
              text-cyan-400
              hover:text-cyan-300
            "
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;