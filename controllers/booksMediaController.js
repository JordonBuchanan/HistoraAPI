const { BooksMediaModel } = require('../models');
const { AdminModel } = require('../models');
const HttpStatus = require('../HttpStatus');
const { validateToken } = require('../middleware/validateToken');

getAllBooksMedia = async(req, res) => {
    BooksMediaModel.find()
        .sort({date: -1})
        .then(books => res.json(books))
        .catch(err => res.status(HttpStatus.notFound).json({nobooksfound: 'No books found'}));
};

getBooksMediaById = async(req, res) => {
    BooksMediaModel.findById(req.params.id)
        .then(book => res.json(book))
        .catch(err => res.status(HttpStatus.notFound).json({nobookfound: 'No book found'}));
};

createBooksMedia = async(req, res) => {
    AdminModel.findById(req.body.admin.admin._id).then(function(isAdmin){
        if(!isAdmin){
            return res.sendStatus(HttpStatus.unauthorized);
        }
        let admin ={
            id: req.body.admin.admin._id,
            name: req.body.admin.admin.name,
            email: req.body.admin.admin.email,
            avatar: req.body.admin.admin.avatar
        }

        const body = req.body;
        if(!body){
            return res.status(HttpStatus.badRequest).json({
                success: false,
                error: 'Book Must Be Provided',
            });
        }
        const newBook = BooksMediaModel({
            body: req.body.data.body,
            source: req.body.data.source,
            author: req.body.data.author,
            link: req.body.data.link,
            title: req.body.data.title,
            image: req.body.data.image,
            admin: admin
        });
        newBook.save()
            .then(book => res.json(book));
    });
};

deleteBooksMedia = async(req, res) => {
    AdminModel.findById(req.body.admin.admin._id).then(function(isAdmin){
        if(!isAdmin){
            return res.sendStatus(HttpStatus.unauthorized);
        }
    })
     .then(admin => {
         BooksMediaModel.findById(req.params.id)
            .then(book => { 
                book.remove().then(() => res.json({ success: true }));
            });
        })
        .catch(err => res.status(HttpStatus.notFound).json({ booknotfound: 'Book not found'}));
    };
 
 //Update Post Route
 updateBooksMedia = async(req, res) => {
    AdminModel.findById(req.body.admin.admin._id).then(function(isAdmin){
        if(!isAdmin){
            return res.sendStatus(HttpStatus.unauthorized);
        }
    })
    .then(admin => {
        BooksMediaModel.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedBook){
            BooksMediaModel.findById(req.params.id)
                .then(book => {
                    book.save().then(() => res.json({ success: true }));
                })
        })
        .catch(err => res.status(HttpStatus.notFound).json({ Booknotfound: 'Book not found'}));
    });
 };

 module.exports = {
    createBooksMedia,
    getAllBooksMedia,
    deleteBooksMedia,
    getBooksMediaById,
    updateBooksMedia,
}