import React from 'react';
import { useState } from 'react';
import { BsCardImage } from "react-icons/bs"
import { MdAddCircle } from "react-icons/md"
import { RiDeleteBin5Fill } from "react-icons/ri"
import SmallLoader from '../Shared/Loader/SmallLoader';


const Home = () => {
    const [image, setImage] = useState('')
    const [imageLoading, setImageLoading] = useState(false)
    console.log(process.env.REACT_APP_SERVER_URL);

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const title = form.title.value
        const task = form.task.value
        const taskImage = image
        console.log(title, task, taskImage);


        fetch()
    }

    const handleImageChange = (e) => {
        setImageLoading(true)
        const image = e.target.files[0]
        const formData = new FormData()
        formData.append("image", image)

        const url = `https://api.imgbb.com/1/upload?key=8af7531b01d2cfca606fd32789cd1f67`

        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                setImage(data.data.display_url)
                setImageLoading(false)
            })
            .catch(err => {
                console.error(err)
                setImageLoading(false)
            })
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className='p-4 w-1/3 mx-auto shadow-lg shadow-gray bg-white rounded-md'>
                <input name="title" type="text" className='pl-0 text-gray-500 font-semibold border-none text-lg focus:ring-0' placeholder='Title' /> <br />
                <input name="task" type="text" className='pl-0 text-gray-500 border-none mt-1 focus:ring-0' placeholder='Add Your Task' />

                <div className='flex justify-between items-center'>
                    <label htmlFor='image'>
                        <input onChange={handleImageChange} name='taskImage' id='image' className='hidden' type="file" />
                        {
                            imageLoading ?
                                <SmallLoader />
                                :
                                image ? <img className='w-24 h-14' src={image} alt="" />
                                    : <BsCardImage className='text-gray-500 text-2xl cursor-pointer' />

                        }
                    </label>
                    <div className='flex items-center'>
                        <button type='reset'><RiDeleteBin5Fill className='text-4xl mx-1 text-red-400 cursor-pointer' /></button>
                        <button><MdAddCircle className='text-4xl mx-1 text-green-400 cursor-pointer' /></button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Home;