import React from 'react'
import { useState } from 'react';
import BackButton from '../components/BackButton';
import axios from 'axios';
import Spinner from '../components/Spinner';
import {  useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export default function CreateBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  const handleSaveBook = () => {
    setLoading(true); // start loading

    const data = {
      title,
      author,
      publishYear: Number(publishYear)
    };

    axios
      .post('http://localhost:5000/books', data)   // <-- POST instead of GET
      .then((response) => {
        setLoading(false);
        enqueueSnackbar('Book created successfully!', {variant: 'success'});
        navigate('/');
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar('An error occurred while creating the book.', {variant: 'error'});
        console.log(err.message);
      });
  };

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? <Spinner/> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input type="text"
          value={title}
          onChange={(e)=> setTitle(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
           />
        </div>

         <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input type="text"
          value={author}
          onChange={(e)=> setAuthor(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
           />
        </div>

        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input type="text"
          value={publishYear}
          onChange={(e)=> setPublishYear(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
           />
        </div>
        <button className='p-2 bg-sky-300 m-8'onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  )
}
