import React, { useEffect, useState } from 'react'
import { FaLocationDot, FaPlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { TbReceipt2 } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';
import { setSearchItems, setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function Nav() {
    const { userData, currentCity, cartItems } = useSelector(state => state.user)
    const { myShopData } = useSelector(state => state.owner)

    const [showInfo, setShowInfo] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [query, setQuery] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const role = userData?.role   // ✅ central role

    const handleLogOut = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true })
            dispatch(setUserData(null))
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearchItems = async () => {
        try {
            const result = await axios.get(
                `${serverUrl}/api/item/search-items?query=${query}&city=${currentCity}`,
                { withCredentials: true }
            )
            dispatch(setSearchItems(result.data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (query) handleSearchItems()
        else dispatch(setSearchItems(null))
    }, [query])

    return (
        <div className='w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6]'>

            {/* 🔍 USER SEARCH (MOBILE) */}
            {role === "user" && showSearch && (
                <div className='w-[90%] h-[70px] bg-white shadow-xl rounded-lg flex items-center gap-[20px] fixed top-[80px] left-[5%] md:hidden'>
                    <div className='flex items-center w-[30%] px-[10px] border-r-2 border-gray-400'>
                        <FaLocationDot className="text-[#ff4d2d]" />
                        <div className='truncate text-gray-600'>{currentCity}</div>
                    </div>
                    <input
                        type="text"
                        placeholder='search delicious food...'
                        className='w-full px-2 outline-none'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            )}

            {/* LOGO */}
            <h1 className='text-3xl font-bold text-[#ff4d2d]'>Vingo</h1>

            {/* 🔍 USER SEARCH (DESKTOP) */}
            {role === "user" && (
                <div className='hidden md:flex w-[40%] h-[70px] bg-white shadow-xl rounded-lg items-center'>
                    <div className='flex items-center w-[30%] px-3 border-r-2'>
                        <FaLocationDot className="text-[#ff4d2d]" />
                        <span className='truncate'>{currentCity}</span>
                    </div>
                    <input
                        type="text"
                        placeholder='search food...'
                        className='w-full px-3 outline-none'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            )}

            {/* RIGHT SECTION */}
            <div className='flex items-center gap-4'>

                {/* 🔍 MOBILE SEARCH ICON */}
                {role === "user" && (
                    showSearch
                        ? <RxCross2 onClick={() => setShowSearch(false)} className='md:hidden text-[#ff4d2d]' />
                        : <IoIosSearch onClick={() => setShowSearch(true)} className='md:hidden text-[#ff4d2d]' />
                )}

                {/* 👤 OWNER UI */}
                {role === "owner" && (
                    <>
                        {myShopData && (
                            <button onClick={() => navigate("/add-item")} className='flex items-center gap-1 bg-[#ff4d2d]/10 text-[#ff4d2d] p-2 rounded'>
                                <FaPlus /> Add Item
                            </button>
                        )}

                        <button onClick={() => navigate("/my-orders")} className='flex items-center gap-1 bg-[#ff4d2d]/10 text-[#ff4d2d] p-2 rounded'>
                            <TbReceipt2 /> Orders
                        </button>
                    </>
                )}

                {/* 🛒 USER UI */}
                {role === "user" && (
                    <>
                        <div onClick={() => navigate("/cart")} className='relative cursor-pointer'>
                            <FiShoppingCart className='text-[#ff4d2d]' />
                            <span className='absolute -top-2 -right-2 text-[#ff4d2d]'>
                                {cartItems?.length}
                            </span>
                        </div>

                        <button onClick={() => navigate("/my-orders")} className='bg-[#ff4d2d]/10 text-[#ff4d2d] px-3 py-1 rounded'>
                            My Orders
                        </button>
                    </>
                )}

                {/* PROFILE */}
                <div
                    className='w-10 h-10 bg-[#ff4d2d] text-white flex items-center justify-center rounded-full cursor-pointer'
                    onClick={() => setShowInfo(!showInfo)}
                >
                    {userData?.fullName?.[0]}
                </div>

                {/* DROPDOWN */}
                {showInfo && (
                    <div className='absolute top-[80px] right-[10px] bg-white shadow-xl p-4 rounded'>
                        <div>{userData?.fullName}</div>
                        <div onClick={handleLogOut} className='text-[#ff4d2d] cursor-pointer'>
                            Logout
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Nav