const blogModel = require("../models/blog.model");
const userModel = require("../models/user.model");
const bcrypt = require('bcrypt');

// dashboard
const index = async(req, res) => {
    let currentUser = req.session.user;
    let isUserAuthenticated = req.session.user ? true : false;

    res.render('backend/dashboard/index', {currentUser, isUserAuthenticated});
}

// blog
const blogs = async(req, res) => {
    let isUserAuthenticated = req.session.user ? true : false;

    let blogs = await blogModel.find();
    res.render('backend/blog/index', {blogs, isUserAuthenticated})
}

const createBlog = (req, res) => {
    let isUserAuthenticated = req.session.user ? true : false;

    res.render('backend/blog/create', {isUserAuthenticated})
}

const editBlog = async(req, res) => {
    let isUserAuthenticated = req.session.user ? true : false;

    let blog = await blogModel.findById(req.params.id);

    if(blog) {
      return res.render('backend/blog/edit', {blog, isUserAuthenticated})
    } 

    return res.redirect('/admin/blogs')
}

const storeBlog = async (req, res) => {
    try {
        await blogModel.create({
            title: req.body.title,
            slug: req.body.slug,
            image: req.file ? req.file.path.replace('public', '') : '',
            description: req.body.description,
            status: req.body.status === '1' ? true : false
        })
    
        res.redirect('/admin/blogs')
    } catch (error) {
        console.log(error.message);
    }
   
}

const updateBlog = async (req, res) => {
    try {
        if(req.file) {
            await blogModel.updateOne({_id : req.params.id}, {
                title: req.body.title,
                slug: req.body.slug,
                image: req.file ? req.file.path.replace('public', '') : '',
                description: req.body.description,
                status: req.body.status === '1' ? true : false
            })
        
        }else {
            await blogModel.updateOne({_id : req.params.id}, {
                title: req.body.title,
                slug: req.body.slug,
                description: req.body.description,
                status: req.body.status === '1' ? true : false
            })
        }
    
        res.redirect('/admin/blogs')
        
    } catch (error) {
        console.log(error.message);
    }
   
}

const deleteBlog = async (req, res) => {
    if(req.params.id) {
        await blogModel.deleteOne({_id : req.params.id})

        res.redirect('/admin/blogs')
    }else {
        res.redirect('/admin/blogs')
    }
}

// users
const users = async (req, res) => {
    let isUserAuthenticated = req.session.user ? true : false;

    let users = await userModel.find();
    res.render('backend/user/index', {users, isUserAuthenticated});
}

const createUser = (req, res) => {
    let isUserAuthenticated = req.session.user ? true : false;

    res.render('backend/user/create', {isUserAuthenticated})
}

const editUser = async (req, res) => {
    let isUserAuthenticated = req.session.user ? true : false;

    let user = await userModel.findById(req.params.id);

    if(user) {
      return res.render('backend/user/edit', {user, isUserAuthenticated})
    } 

    return res.redirect('/admin/users')
}

const storeUser = async (req, res) => {
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    
    try {
        await userModel.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            image: req.file ? req.file.path.replace('public', '') : '',
            contact: req.body.contact,
            status: req.body.status === '1' ? true : false
        })
    
        res.redirect('/admin/users')
    } catch (error) {
        console.log(error.message);
    }
}

const updateUser = async(req, res) => {
    try {
        if(req.file) {
            await userModel.updateOne({_id : req.params.id}, {
                name: req.body.name,
                email: req.body.email,
                image: req.file ? req.file.path.replace('public', '') : '',
                contact: req.body.contact,
                status: req.body.status === '1' ? true : false
            })
        
        }else {
            await userModel.updateOne({_id : req.params.id}, {
                name: req.body.name,
                email: req.body.email,
                contact: req.body.contact,
                status: req.body.status === '1' ? true : false
            })
        }
    
        res.redirect('/admin/users')
        
    } catch (error) {
        console.log(error.message);
    }
}

const deleteUser = async(req, res) => {
    if(req.params.id) {
        await userModel.deleteOne({_id : req.params.id})

        res.redirect('/admin/users')
    }else {
        res.redirect('/admin/users')
    }
}


// logout
const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
}

module.exports = {
    index,
    blogs,
    createBlog,
    editBlog,
    updateBlog,
    storeBlog,
    deleteBlog,
    users,
    createUser,
    editUser,
    storeUser,
    updateUser,
    deleteUser,
    logout
}