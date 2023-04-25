const user=require('../models/userModel');
const category=require('../models/categoryModel');
const product=require('../models/productModel');
const admin=require('../models/adminModel');
const address=require('../models/addressModel');
const bcrypt=require('bcrypt');
const { findOne } = require('../models/userModel');
const multer=require("multer");
const bodyParser = require('body-parser');
var cartList=0;

//<<<<<<<<<<<<<<<<<<<<   bcrypt >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const securePassword= async(password)=>{ try {
    const passwordHash = await bcrypt.hash(password,9);
    return passwordHash;
 } catch (error) {
     console.log(error.message);
     }}



 //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<get add address page  >>>>>>>>>>>>>>>>>>>>>>>>>>>
    
    const addaddresspage=async(req,res)=>{
        try {
            res.render('addAddress',{user1:true})
            
        } catch (error) {
            console.log(error.message);
            
        }
    }
     
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< adding address >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


const addnewaddress = async (req, res) => {
    try {
        const userid= req.session.user_id;
    const body=req.body;
        addressData=await address.findOne({userId:userid}).lean()
        if(addressData){
       await address.findOneAndUpdate({userId:userid},{$push:{address:body}})
       res.redirect('/selectaddress')
       
   }else{
          await address.create({userId:userid,address:body})
           res.redirect('/selectaddress')
       
        
          }
    } catch (error) {
      console.log(error.message);
      res.render("error500");
    }
  };


  const selectaddress = async(req,res)=>{
    try {

      const userid= req.session.user_id;
     
    const useraddress=await address.find({userId:userid}).lean()
      res.render('selectAddress',{user1:true,user:true,useraddress})
    } catch (error) {
      console.log(error.message);
      res.render("error500");
    }
  }

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< selecting address >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


  const selectaddressis=async(req,res)=>{
    try {
      a=req.query.index
      
      const userid= req.session.user_id;
    const select=  await address.findOne({userId:userid}).lean()
    const selectedAddress=select.address[a]
const cartList=req.session.cartlist
const totalAmount=req.session.totalAmount

     res.render('checkout',{user:true,user1:true,selectedAddress,cartList,totalAmount})
    } catch (error) {
      console.log(error.message);
      res.render("error500");
    }
  }




  
 module.exports={
    addaddresspage,
    addnewaddress,
    selectaddress,
    selectaddressis,
   
 } 