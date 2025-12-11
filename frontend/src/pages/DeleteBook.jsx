import React from 'react'
import { useState } from 'react';
import BackButton from '../components/BackButton';
import axios from 'axios';
import Spinner from '../components/Spinner';
import {  useNavigate , useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export default function DeleteBook() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const{enqueueSnackbar} = useSnackbar();
  const handleDeleteBook = ()=>{
    setLoading(true);
    axios
    .delete(`http://localhost:5000/books/${id}`)
    .then((response)=>{
      setLoading(false);
      enqueueSnackbar('Book deleted successfully!', {variant: 'success'});
      navigate('/');
    })
    .catch((err)=>{
      setLoading(false);
      enqueueSnackbar('An error occurred while deleting the book.', {variant: 'error'});
      console.log(err.message)
    })
  }
  return (
    <div className='p-4'>
  <BackButton/>
  <h1 className="text-3xl my-4">Delete Book</h1>
  {loading ? <Spinner/> : ''}
  
  <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto text-center">
    <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>

    <button 
      className='p-4 bg-red-600 text-white m-8 w-full mx-auto'
      onClick={handleDeleteBook}
    >
      Yes, delete it
    </button>
  </div>
</div>

  )
}
