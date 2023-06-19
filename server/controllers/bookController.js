const Book=require('../models/bookModel')


// Create a new book
exports.postBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.json(savedBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating book' });
  }
};

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving books' });
  }
};

// Get a specific book
exports.getBookById = async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;

    const books = await Book.find({
      $or: [
        { title: { $regex: new RegExp(searchTerm, 'i') } },   // Search by title (case-insensitive)
        { author: { $regex: new RegExp(searchTerm, 'i') } },  // Search by author (case-insensitive)
        { year: searchTerm }                               // Search by year
      ]
    });

    if (books.length === 0) {
      return res.status(404).json({ error: 'No books found' });
    }
    console.log(books[0])
    return res.json(books[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  console.log('updating')
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(updatedBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating book' });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  console.log("deleting")
  try {
    const deletedBook = await Book.findByIdAndRemove(id);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting book' });
  }
};

// bookController.js

// const Book = require('../models/book');

exports.getBooksBySearch = async (req, res) => {
  const { query } = req.query;

  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
      ],
    });
    res.json(books);
  } catch (error) {
    console.error('Error searching books:', error);
    res.status(500).json({ error: 'An error occurred while searching books' });
  }
};
