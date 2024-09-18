#nullable disable
using System;
using SQLite;

namespace desi_library_api.Models
{
    [Table("Book")]	
    public class Book
    {
        [PrimaryKey, AutoIncrement]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public string Language { get; set; }
        public int Pages { get; set; }

        // In database, it will be in a seperate table with the fields for date and time of borrowal and return, and the used who borroed etc.
        // but for the easiness to complete this test, I just implemented a flag in this book class.
        // TODO: I thought there was a way to implement getters, but they'd need access to the DB, so..
        [Ignore]
        public bool Borrowed { get; set; }
    }

    // Class defined to show how it will be if it is in database
    // (If no record in this table for a book id, which means the book is available )
    [Table("BookBorrowRecs")]
    public class BookBorrowRecs
    {
        public DateTime DateTime { get; set; }
        public int UserId { get; set; }
        [PrimaryKey]
        public int BookId { get; set; }
        public bool Borrowed { get; set; } // true for borrowed, and false if it is returned 
    }


    // Dto for transferring the basic information about a book.
    public class SimpleBookDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public bool Borrowed { get; set; }
    }
}
