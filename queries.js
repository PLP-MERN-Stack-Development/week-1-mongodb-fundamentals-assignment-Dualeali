// Find all books in a specific genre
db.books.find({ genre: 'Programming' })

// Find books published after a certain year
db.books.find({ published_year: { $gt: 2010 } })

// Find books by a specific author
db.books.find({ author: 'Robert C. Martin' })

// Update the price of a specific book
db.books.updateOne({ title: 'Clean Code' }, { $set: { price: 35 } })

// Delete a book by its title
db.books.deleteOne({ title: 'Old Book Title' })


// Books in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// Projection: show only title, author, price
db.books.find({}, { title: 1, author: 1, price: 1 })

// Sorting: price ascending
db.books.find().sort({ price: 1 })

// Sorting: price descending
db.books.find().sort({ price: -1 })

// Pagination: 5 books per page
db.books.find().limit(5).skip(0) // page 1
db.books.find().limit(5).skip(5) // page 2
// Average price by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

// Author with most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])

// Group books by decade
db.books.aggregate([
  {
    $group: {
      _id: {
        $concat: [
          { $substr: ["$published_year", 0, 3] },
          "0s"
        ]
      },
      count: { $sum: 1 }
    }
  }
])
// Index on title
db.books.createIndex({ title: 1 })

// Compound index on author + published_year
db.books.createIndex({ author: 1, published_year: 1 })

// Use explain() to show index use
db.books.find({ title: 'Clean Code' }).explain("executionStats")
