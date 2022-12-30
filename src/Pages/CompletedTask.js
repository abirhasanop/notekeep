import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const CompletedTask = () => {

    const [allTasks, setAllTasks] = useState([])
    const [items, setItems] = useState(true)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/task`)
            .then(res => res.json())
            .then(data => {
                setAllTasks(data.data);
            })
    }, [items])

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
        console.log(id);
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
                                        <Link onClick={() => handleNotComplete(_id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline text-sm">Not Complete</Link>
                                        <div className='flex justify-between items-center'>
                                            <h5 className="w-[70%] mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title.length > 15 ? title.slice(0, 15) + "..." : title ? title : "Untitled"}</h5>
                                        </div>

                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description.length > 80 ? description.slice(0, 80) + "..." : description}</p>

                                        <div className='flex justify-between items-center'>

                                            <button className="inline-flex items-center px-3 py-2 h-7 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">
                                                Details
                                                <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                            </button>


                                            <div className='flex items-center gap-2'>

                                                <button onClick={() => handleDelete(_id)}><RiDeleteBin5Fill className='text-3xl text-red-400 hover:text-red-500 cursor-pointer' /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }
                </section>
            </main>
        </>
    );
};

export default CompletedTask;