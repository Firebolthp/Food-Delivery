import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { TbReceipt2 } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function Nav() {
    const { userData } = useSelector(state => state.user)
    const { myShopData } = useSelector(state => state.owner)

    const [showInfo, setShowInfo] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOut = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true })
            dispatch(setUserData(null))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6]'>

            {/* Logo */}
            <h1 className='text-3xl font-bold mb-2 text-[#ff4d2d]'>Vingo</h1>

            {/* Owner Controls */}
            <div className='flex items-center gap-4'>

                {myShopData && (
                    <>
                        {/* Add Item */}
                        <button
                            className='hidden md:flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]'
                            onClick={() => navigate("/add-item")}
                        >
                            <FaPlus size={20} />
                            <span>Add Food Item</span>
                        </button>

                        <button
                            className='md:hidden flex items-center p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]'
                            onClick={() => navigate("/add-item")}
                        >
                            <FaPlus size={20} />
                        </button>

                        {/* Orders */}
                        <div
                            className='hidden md:flex items-center gap-2 cursor-pointer px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium'
                            onClick={() => navigate("/my-orders")}
                        >
                            <TbReceipt2 size={20} />
                            <span>My Orders</span>
                        </div>

                        <div
                            className='md:hidden flex items-center gap-2 cursor-pointer px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d]'
                            onClick={() => navigate("/my-orders")}
                        >
                            <TbReceipt2 size={20} />
                        </div>
                    </>
                )}

                {/* Profile */}
                <div
                    className='w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer'
                    onClick={() => setShowInfo(prev => !prev)}
                >
                    {userData?.fullName?.slice(0, 1)}
                </div>

                {/* Dropdown */}
                {showInfo && (
                    <div className='fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]'>
                        <div className='text-[17px] font-semibold'>
                            {userData?.fullName}
                        </div>

                        <div
                            className='text-[#ff4d2d] font-semibold cursor-pointer'
                            onClick={handleLogOut}
                        >
                            Log Out
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Nav