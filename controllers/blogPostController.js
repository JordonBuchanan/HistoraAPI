const Mongoose = require('mongoose');
const express = require('express');
const { BlogPostModel } = require('../models');
const HttpStatus = require('../HttpStatus');

///admin middleware

createBlogPost = (req, res) => {
    const body = req.body;
    if(!body){
        return res.status(HttpStatus.badRequest).json({
            success: false,
            error: 'Blog post Must Be Provided',
        });
    }
    if(blogpost.admin.toString() !== req.admin.id ){
        return res.status(HttpStatus.unauthorized).json({ notauthorized: 'Admin not autherized'});
    }
    const blogpost = new BlogPostModel(body)
    if(!blogpost){
        return res.status(HttpStatus.badRequest).json({ success: false, error: err })
    }
    blogpost
        .save()
        .then(() => {
            return res.status(HttpStatus.created).json({
                success: true,
                id: blogpost._id,
                message: 'Blog post Added!',
            })
        })
        .catch(error => {
            return res.status(HttpStatus.badRequest).json({
                error,
                message: "Something Went Wrong. Blog post Not Added."
            })
        })
}

updateBlogPost = async(req, res) => {
    const body = req.body;
    if(!body) {
        return res.status(HttpStatus.badRequest).json({
            success: false,
            error: 'Blog post Not Provided'
        })
    }
    if(blogpost.admin.toString() !== req.admin.id ){
        return res.status(HttpStatus.unauthorized).json({ notauthorized: 'Admin not autherized'});
    }
    BlogPostModel.findOne({ _id: req.params.id }, (err, blogpost) => {
        if(err) {
            return res.status(HttpStatus.notFound).json({
                err,
                messsage: 'Blog post Not Found.',
            })
        }
        blogpost.body = body.body
        blogpost.mainImage = body.mainImage
        blogpost.tags = body.tags
        blogpost.title = body.title
        blogpost.images = body.images
        blogpost
            .save()
            .then(() => {
                return res.status(HttpStatus.OK).json({
                    success: true,
                    id: blogpost._id,
                    message: 'Blog post Updated',
                })
            })
            .catch(error => {
                return res.status(HttpStatus.notFound).json({
                    error,
                    message: "Blog post Not Updated",
                })
            })
    })  
}

deleteBlogPost = async (req, res) => {
    await BlogPostModel.findOneAndDelete({ _id: req.params.id }, (err, blogpost) => {
        if(err) {
            return res.status(HttpStatus.badRequest).json({ success: false, error: err })
        }
        if(blogpost.admin.toString() !== req.admin.id ){
            return res.status(HttpStatus.unauthorized).json({ notauthorized: 'Admin not autherized'});
        }
        if(!blogpost){
            return res
                .status(HttpStatus.notFound)
                .json({ success: false, error: 'Blog post Not Found' })
        }
        return res.status(200).json({ success: true, data: blogpost })
    })
    .catch(err => console.log(err))
}

getBlogPostsById = async (req, res) => {
    await BlogPostModel.findOne({ _id: req.params.id }, (err, blogpost) => {
        if(err){
            return res.status(HttpStatus.badRequest).json({ success: false, error: err })
        }
        if(!blogpost){
            return res 
                .status(HttpStatus.notFound)
                .json({ success: false, error: 'Blog post Not Found' })
        }
        return res.status(HttpStatus.OK).json({ success: true, data: blogpost })
    })
    .catch(err => console.log(err))
}

getBlogPosts = async (req, res) => {
    await BlogPostModel.find({}, (err, blogposts) => {
        if(err){
            return res.status(HttpStatus.badRequest).json({ success: false, error: err })
        }
        if(!blogposts.length){
            return res
                .status(HttpStatus.notFound)
                .json({ success: false, error: 'Blog posts not found '})
        }
        return res.status(HttpStatus.OK).json({ success: true, data: blogposts })
    })
    .sort({date: -1})
    .catch(err => console.log(err))
}

module.exports = {
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    getBlogPosts,
    getBlogPostsById,
}