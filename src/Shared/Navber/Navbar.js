import React, { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import noteKeepImg from "../../Assets/note keep.png"
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
// import { Switch } from '@headlessui/react'

const Navbar = () => {
    const { user, logout, handleTheme, dark } = useContext(AuthContext)

    // modal
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <div>
            <nav className={`${dark ? "bg-[#0F1729] text-white" : "bg-white"} text-gray-700 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 shadow-lg mb-14`}>
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <Link to="/" className="flex items-center">
                        <img src={noteKeepImg} className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Note Keep</span>
                    </Link>
                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
                            <li>
                                <Link to="/" className="bblock py-2 pl-3 pr-4 rounded md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" aria-current="page">Add Task</Link>
                            </li>
                            <li>
                                <Link to="/my-task" className="block py-2 pl-3 pr-4 rounded md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">My Task</Link>
                            </li>
                            <li>
                                <Link to="/completed-task" className="block py-2 pl-3 pr-4 rounded md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Completed Task</Link>
                            </li>



                            {
                                user?.uid ?
                                    <li>
                                        <Link onClick={openModal} className="block py-2 pl-3 pr-4 rounded md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white
                                 md:dark:hover:bg-transparent">Logout</Link>
                                    </li>
                                    :
                                    <>
                                        <li>
                                            <Link to="/sign-up" className="block py-2 pl-3 pr-4 rounded md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white
                                 md:dark:hover:bg-transparent">Sign Up</Link>
                                        </li>
                                        <li>
                                            <Link to="/login" className="block py-2 pl-3 pr-4 rounded md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white
                                 md:dark:hover:bg-transparent">Login</Link>
                                        </li>
                                    </>
                            }

                            {/* togle */}
                            <li>
                                <label className="inline-flex relative items-center cursor-pointer">
                                    <input onClick={handleTheme} type="checkbox" value="" className="sr-only peer" checked={dark} />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    {/* <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span> */}
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* Modal */}
            <ConfirmationModal isOpen={isOpen} closeModal={closeModal}>Are You Sure, You Want To Log Out?</ConfirmationModal>
        </div>
    );
};

export default Navbar;