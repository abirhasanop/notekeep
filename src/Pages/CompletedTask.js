import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import BigLoder from '../Shared/Loader/BigLoder';
// Modal Import
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import ModalDetails from '../Shared/ModalDetails/ModalDetails';
import DropdownMenu from '../Components/DropdwnMenu/DropdownMenu';

const CompletedTask = () => {
    const { user } = useContext(AuthContext)

    const [allTasks, setAllTasks] = useState([])
    const [items, setItems] = useState(true)
    const [loading, setLoading] = useState(true)
    const [task, setTask] = useState('')
    // Modal Starts
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal(task) {
        setIsOpen(true)
        setTask(task)
    }
    // Modal ends

    useEffect(() => {
        setLoading(true)
        fetch(`${process.env.REACT_APP_SERVER_URL}/task?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setAllTasks(data.data);
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
                setLoading(false)
            })
    }, [items, user?.email])

    const handleDelete = (id) => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/task/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                setItems(!items)
                toast.success(data.message)
            })
            .catch(err => {
                console.log(err);
            })
    }


    const handleNotComplete = (id) => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/task?id=${id}&status=${"incomplete"}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then(res => res.json())
            .then(data => {
                setItems(!items)
                console.log(data);
                toast.success(data.message)
            })
            .catch(err => {
                console.log(err);
            })

    }




    if (loading) {
        return <BigLoder />
    }



    return (
        <>
            <main className='w-[70%] mx-auto'>
                <section className='flex flex-wrap gap-7'>
                    {
                        allTasks?.map((task, i) => {
                            const { img, title, description, _id, status } = task
                            return (
                                status === "complete" &&

                                <div div key={i} className="w-72 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700" >

                                    <img className="rounded-t-lg w-full h-44" src={img} alt="" />


                                    <div className="p-5">
                                        <div className=''>
                                            <h5 className="w-[70%] mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title.length > 15 ? title.slice(0, 15) + "..." : title ? title : "Untitled"}</h5>
                                        </div>

                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description.length > 80 ? description.slice(0, 80) + "..." : description}</p>

                                        <div className='flex justify-between items-center'>

                                            <button
                                                onClick={() => openModal(task)}
                                                className="inline-flex items-center px-3 py-2 h-7 text-sm font-medium text-center text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 cursor-pointer">
                                                Details
                                                <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                            </button>


                                            <div className='flex items-center gap-2'>
                                                <DropdownMenu
                                                    handleDelete={() => handleDelete(_id)}
                                                    handleNotComplete={() => handleNotComplete(_id)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }
                </section>
                {/* Modal Ui */}
                <ModalDetails isOpen={isOpen} closeModal={closeModal} task={task} />
            </main>
        </>
    );
};

export default CompletedTask;