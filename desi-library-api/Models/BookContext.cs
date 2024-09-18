using System.ComponentModel;
using SQLite;

namespace desi_library_api.Models
{
    public class BookContext
    {
        private SQLiteConnection _db;

        public BookContext(List<Book> books)
        {
            // TODO: look into how to increase the lifetime of the DB connection (tho re-tryable is nice..)
            var databasePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments), "MyData.db");
            if (Path.Exists(databasePath)) {
                Console.WriteLine("SQLite database found at "+databasePath);
                Console.WriteLine("If you want to start with a new default one, please delete the file");
                _db = new SQLiteConnection(databasePath);

            } else {
                Console.WriteLine("SQLite created and initialised at "+databasePath);
                _db = new SQLiteConnection(databasePath);

                _db.CreateTable<Book>();
                _db.CreateTable<BookBorrowRecs>();
                foreach (Book b in books) {
                    _db.InsertOrReplace(b);
                    if (b.Borrowed) {
                        var rec = new BookBorrowRecs
                        {
                            BookId = b.Id,
                            Borrowed = true,
                            DateTime = DateTime.UtcNow,
                            UserId = 1 // our magic user
                        };
                        _db.InsertOrReplace(rec);
                    }
                }
            }

        }

        public IEnumerable<Book> GetAll()
        {
            // So I'd like to use the join, but it doesn't work, so
            //var books = _db.Query<Book>("SELECT Book.*, BookBorrowRecs.Borrowed as Borrowed from Book LEFT JOIN BookBorrowRecs ON (Book.Id == BookBorrowRecs.BookId)");
            
            var freeBooks = BorrowableBooks();
            var books = new List<Book>(freeBooks);
            var borrowedBooks = UnBorrowableBooks();
            foreach (Book b in borrowedBooks) {
                b.Borrowed = true;
                books.Add(b);
            }

            return books;
        }

        public Book? GetBook(int id) {
            // NOTE: yup, it took me quite a few working attempts with ToList, and so on, until i finally found FirstOrDefault
            //return _books.FirstOrDefault(a => a.Id == id);
            var books = _db.Table<Book>().Where(b => b.Id.Equals(id));
            if (books.Count() == 0) {    // TODO: I presume there's a better way
                return null;
            }
            var borrowed = _db.Table<BookBorrowRecs>().Where(b => b.BookId.Equals(id));
            var book = books.First<Book>();
            if (borrowed.Count() > 0) {    // TODO: I presume there's a better way
                book.Borrowed = true;
            } else {
                book.Borrowed = false;
            }
            
            return book;
        }

        public IEnumerable<Book> BorrowableBooks()
        {
            //return _books.Where(a => !a.Borrowed).ToList();
            //var books = _db.Table<Book>().Where(b => !b.Borrowed);

            var books = _db.Query<Book>("SELECT Book.*, BookBorrowRecs.Borrowed as borrow from Book LEFT JOIN BookBorrowRecs ON (Book.Id == BookBorrowRecs.BookId) WHERE borrow is NULL");

            return books;
        }

        public IEnumerable<Book> UnBorrowableBooks()
        {
            //return _books.Where(a => a.Borrowed).ToList();
            //var books = _db.Table<Book>().Where(b => b.Borrowed);
            var books = _db.Query<Book>("SELECT Book.*, BookBorrowRecs.Borrowed from Book JOIN BookBorrowRecs ON (Book.Id == BookBorrowRecs.BookId)");

            return books;
        }

        public Book? AttemptToBorrowBook(Book book)
        {
            var rec = new BookBorrowRecs
            {
                BookId = book.Id,
                Borrowed = true,
                DateTime = DateTime.UtcNow,
                UserId = 1 // our magic user
            };
            var rows = _db.Insert(rec);
            // TODO: yeah, no transactions, and really should re-get to get the real value
            if (rows != 1) {
                // I hope we're going to be zero...
                return null;    // no, we can't borrow it twice.
            }
            book.Borrowed = true;
            return book;
        }

        public Book? AttemptToReturnBook(Book book)
        {
            var rec = new BookBorrowRecs
            {
                BookId = book.Id,
                Borrowed = true,
                //DateTime = DateTime.UtcNow,
                UserId = 1 // our magic user
            };
            var rows = _db.Delete(rec);
            if (rows != 1) {
                // I hope we're going to be zero...
                return null;    // no, we can't borrow it twice.
            }
            book.Borrowed = false;
            // TODO: yeah, no transactions, and really should re-get to get the real value
            return book;
        }
    }
}
