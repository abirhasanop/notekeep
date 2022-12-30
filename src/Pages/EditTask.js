import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BsCardImage } from 'react-icons/bs';
import { MdAddCircle } from 'react-icons/md';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import SmallLoader from '../Shared/Loader/SmallLoader';

const EditTask = () => {
    const { data } = useLoaderData()
    const { description, img, title } = data


    const { user } = useContext(AuthContext)
    const [image, setImage] = useState(img)
    const [imageLoading, setImageLoading] = useState(false)
    const [taskLoading, setTaskLoading] = useState(false)





    const handleSubmit = (e) => {
        setTaskLoading(false)
        e.preventDefault()
        const form = e.target
        const title = form.title.value
        const description = form.description.value
        const taskImage = image
        const task = { title, description, img: taskImage, status: "incomplete", email: user?.email }
        console.log(task);

        if (!taskImage) {
            // toast.success("Please upload an image")
            toast('Please Upload An Image!', {
                icon: '⚠️',
            });
            return
        }


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
                <input defaultValue={title} name="title" type="text" className='w-[70%] pl-0 text-gray-500 font-semibold border-none text-lg focus:ring-0' placeholder='Title' /> <br />
                <input defaultValue={description} name="description" type="text" className='pl-0 text-gray-500 border-none mt-1 focus:ring-0' placeholder='Add Your Task' required />

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
                        {/* <button type='reset'><RiDeleteBin5Fill className='text-4xl mx-1 text-red-400 cursor-pointer' /></button> */}
                        {
                            taskLoading ? <SmallLoader />
                                : <a href='_' className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        }
                    </div>
                </div>
            </div>
        </form>
    );
};

export default EditTask;