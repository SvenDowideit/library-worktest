using SQLite;

namespace desi_library_api.Models
{
    public class BookContext
    {
        private SQLiteConnection _db;

        public BookContext(List<Book> books)
        {
            var databasePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments), "MyData.db");
            if (Path.Exists(databasePath)) {
                Console.WriteLine("SQLite database found at "+databasePath);
                Console.WriteLine("If you want to start with a new default one, please delete the file");
                _db = new SQLiteConnection(databasePath);

            } else {
                Console.WriteLine("SQLite created and initialised at "+databasePath);
                _db = new SQLiteConnection(databasePath);

                _db.CreateTable<Book>();
                foreach (Book b in books) {
                    _db.InsertOrReplace(b);
                }
            }

        }

        public IEnumerable<Book> GetAll()
        {
            var books = _db.Query<Book>("SELECT * FROM Book");
            return books;
        }

        public Book? GetBook(int id) {
            // NOTE: yup, it took me quite a few working attempts with ToList, and so on, until i finally found FirstOrDefault
            //return _books.FirstOrDefault(a => a.Id == id);
            var book = _db.Table<Book>().Where(b => b.Id.Equals(id));
            if (book.Count() == 0) {    // TODO: I presume there's a better way
                return null;
            }
            return book.First<Book>();
        }

        public IEnumerable<Book> BorrowableBooks()
        {
            //return _books.Where(a => !a.Borrowed).ToList();
            var books = _db.Table<Book>().Where(b => !b.Borrowed);
            return books;
        }

        public IEnumerable<Book> UnBorrowableBooks()
        {
            //return _books.Where(a => a.Borrowed).ToList();
            var books = _db.Table<Book>().Where(b => b.Borrowed);
            return books;
        }

        public Book? AttemptToBorrowBook(Book book)
        {
            book.Borrowed = true;
            _db.InsertOrReplace(book);
            // TODO: yeah, no transactions, and really should re-get to get the real value
            return book;
        }

        public Book? AttemptToReturnBook(Book book)
        {
            book.Borrowed = false;
            _db.InsertOrReplace(book);
            // TODO: yeah, no transactions, and really should re-get to get the real value
            return book;
        }
    }
}
