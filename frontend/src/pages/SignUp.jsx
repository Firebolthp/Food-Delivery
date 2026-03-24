import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { serverUrl } from '../App';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { ClipLoader } from "react-spinners"
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function SignUp() {
    const primaryColor = "#ff4d2d";
    const bgColor = "#fff9f6";
    const borderColor = "#ddd";

    const [showPassword, setShowPassword] = useState(false)
    const [role, setRole] = useState("user")
    const navigate = useNavigate()

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mobile, setMobile] = useState("")
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const handleSignUp = async () => {
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signup`, {
                fullName, email, password, mobile, role
            }, { withCredentials: true })

            dispatch(setUserData(result.data))
            setErr("")
        } catch (error) {
            setErr(error?.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleAuth = async () => {
        if (!mobile) return setErr("Mobile no is required")

        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)

        try {
            const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, {
                fullName: result.user.displayName,
                email: result.user.email,
                role,
                mobile
            }, { withCredentials: true })

            dispatch(setUserData(data))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center p-4' style={{ backgroundColor: bgColor }}>
            <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8 border' style={{ border: `1px solid ${borderColor}` }}>

                <h1 className='text-3xl font-bold mb-2' style={{ color: primaryColor }}>Vingo</h1>
                <p className='text-gray-600 mb-8'>Create your account to get started</p>

                {/* Full Name */}
                <div className='mb-4'>
                    <label className='block mb-1'>Full Name</label>
                    <input
                        type="text"
                        className='w-full border px-3 py-2 rounded'
                        placeholder='Enter your name'
                        onChange={(e) => setFullName(e.target.value)}
                        value={fullName}
                    />
                </div>

                {/* Email */}
                <div className='mb-4'>
                    <label className='block mb-1'>Email</label>
                    <input
                        type="email"
                        className='w-full border px-3 py-2 rounded'
                        placeholder='Enter your email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                {/* Mobile */}
                <div className='mb-4'>
                    <label className='block mb-1'>Mobile</label>
                    <input
                        type="tel"   
                        className='w-full border px-3 py-2 rounded'
                        placeholder='Enter mobile number'
                        onChange={(e) => setMobile(e.target.value)}
                        value={mobile}
                    />
                </div>

                {/* Password */}
                <div className='mb-4'>
                    <label className='block mb-1'>Password</label>
                    <div className='relative'>
                        <input
                            type={showPassword ? "text" : "password"}
                            className='w-full border px-3 py-2 rounded pr-10'
                            placeholder='Enter password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <button
                            type="button"  
                            className='absolute right-3 top-2'
                            onClick={() => setShowPassword(prev => !prev)}
                        >
                            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </button>
                    </div>
                </div>

                {/* Role */}
                <div className='mb-4'>
                    <label className='block mb-1'>Role</label>
                    <div className='flex gap-2'>
                        {["user", "owner", "deliveryBoy"].map((r) => (
                            <button
                                key={r}  
                                type="button"
                                className='flex-1 border px-3 py-2 rounded'
                                onClick={() => setRole(r)}
                                style={
                                    role === r
                                        ? { backgroundColor: primaryColor, color: "white" }
                                        : { border: `1px solid ${primaryColor}`, color: primaryColor }
                                }
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sign Up */}
                <button
                    type="button"
                    className='w-full py-2 rounded text-white'
                    style={{ backgroundColor: primaryColor }}
                    onClick={handleSignUp}
                    disabled={loading}
                >
                    {loading ? <ClipLoader size={20} color='white' /> : "Sign Up"}
                </button>

                {err && <p className='text-red-500 text-center mt-2'>*{err}</p>}

                {/* Google */}
                <button
                    type="button"
                    className='w-full mt-4 flex items-center justify-center gap-2 border py-2 rounded'
                    onClick={handleGoogleAuth}
                >
                    <FcGoogle />
                    Sign up with Google
                </button>

                <p className='text-center mt-6 cursor-pointer' onClick={() => navigate("/signin")}>
                    Already have an account? <span style={{ color: primaryColor }}>Sign In</span>
                </p>

            </div>
        </div>
    )
}

export default SignUp