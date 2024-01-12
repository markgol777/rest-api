const express = require('express');
const uuid = require('uuid');
const router = express.Router();

let books = [{
  id: 1,
  author: 'John Doe',
  title: 'JavaScript Book'
},
{
  id: 2,
  author: 'John Doe',
  title: 'Python Book'
},
{
  id: 3,
  author: 'John Doe',
  title: 'Cpp Book'
},
{
  id: 4,
  author: 'John Doe',
  title: 'Rubie Book'
},
{
  id: 5,
  author: 'John Doe',
  title: 'Go Book'
}
];

router.get('/', (req, res) => {
  res.json(books);
})

router.get('/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  const book = books.find(book => book.id == id);
  console.log(book);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({error: `not a valid id ${id}`})
  }

})

router.post('/', (req, res) => {
  const book = {
    id: uuid.v4(),
    title: req.body.title || 'default titlte',
    author: req.body.author || 'default title',
  }
  books.push(book);

  return res.json(book);
})

router.put('/:id', (req, res) => {
  const id = req.params.id;

  for (let i = 0; i < books.length; i++) {
    if (books[i].id == id) {
      books[i].title = req.body.title;
      books[i].author = req.body.author;
    }
  }

  const newBook = books.find(book => book.id == id);

  res.json(newBook);
})

router.delete('/id', (req, res) => {
  const id = req.params.id;

  books = books.filter(book => book.id != id);
  console.log(books);
  const book = books.find(book => book.id == id);

  if (!book) {
    res.json(`book with ${id} was deleted`).status(200);
  } else {
    res.json('something went wrong').status(400)
  }
})

module.exports = router;