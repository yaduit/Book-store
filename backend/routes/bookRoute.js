const express = require('express');
const bookModel = require('../models/bookModel');
const router = express.Router();


router.post('/', async function(req,res){
    let {title,author,publishYear} = req.body;
   try{

   if(!title || !author || !publishYear) return res.status(400).json("send all required fields title,author and publishyear");
   const newBook =await bookModel.create({
    title,
    author,
    publishYear
   })

   return res.status(201).send(newBook)
   }
    catch(err){
    console.log(err.message);
    res.status(500).send(err.message)
   }
});

router.get('/', async function(req,res){
    try{
        const books = await bookModel.find({});
        return res.status(200).json({
            count : books.length,
            data : books
        })
    }catch(err){
        console.log(err.message);
        res.status(500).json({message : err.message});
    }
});


    router.get('/:id', async function(req,res){
    try{
        let {id} = req.params;
        const book = await bookModel.findById(id);
        return res.status(200).json(book)
    }catch(err){
        console.log(err.message);
        res.status(500).json({message : err.message});
    }
});

//for updation//

router.put('/:id', async function(req,res){
    let {title,author,publishYear} = req.body;
    const {id} = req.params;
   try{

   if(!title || !author || !publishYear) return res.status(400).json("send all required fields title,author and publishyear");
    
   
   const result = await bookModel.findByIdAndUpdate(id, req.body);
   if(!result){
       return res.status(404).json({message : "book not found"})
 } else{
    return res.status(200).json({message : "book updated sucessfully"});
 }
   }
    catch(err){
    console.log(err.message);
    res.status(500).json({message:"book not found"})
   }
});

//for deletion//
 router.delete('/:id', async function(req,res){
    const {id} = req.params;
   try{   
   const result = await bookModel.findByIdAndDelete(id, req.body);
   if(!result){
       return res.status(404).json({message : "book not found"})
 } else{
    return res.status(200).json({message : "book deleted sucessfully"});
 }
   }
    catch(err){
    console.log(err.message);
    res.status(500).json({message:"book not found"})
   }
});


module.exports = router