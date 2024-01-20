'use strict'
import Book from '../models/book';

Book.find({}, function (err, books) {
    if (err) {
        console.log(err);
    } else {
        console.log(books);
    }
});