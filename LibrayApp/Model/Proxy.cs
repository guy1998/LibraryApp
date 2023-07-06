using System;
using MySql.Data.MySqlClient;
using System.Collections.Generic;

public class Proxy
{
    private MySqlConnection connection;
    private string connectionString = "server=localhost;database=Library;user=root;password=Aldrin/117";

    public Proxy()
    {
        connection = new MySqlConnection(connectionString);
    }

    public void openConnection()
    {
        try
        {
            connection.Open();
            Console.WriteLine("Database connection established.");
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error connecting to the database: " + ex.Message);
        }
    }

    public void closeConnection()
    {
        try
        {
            connection.Close();
            Console.WriteLine("Database connection closed.");
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error closing the database connection: " + ex.Message);
        }
    }

    public Author[] readAuthors(){
        openConnection();
        string sql = "SELECT * FROM author";
        List<Author> authors = new List<Author>();
        MySqlCommand command = new MySqlCommand(sql, connection);
        
        using(MySqlDataReader reader = command.ExecuteReader()){
            while(reader.Read()){
                authors.Add(
                    new Author{
                        name = reader.GetString("name"),
                        bio = reader.GetString("bio"),
                        createdAt = reader.GetDateTime("createdat"),
                        nrOfBooks = reader.GetInt32("nrOfBooks"),
                        createdBy = reader.GetString("createdby")
                    }
                );
            }
        }

        closeConnection();
        return authors.ToArray();
    }

    public Book[] readBooks()
    {
        openConnection();
        string sql = "SELECT * FROM book";
        List<Book> books = new List<Book>();
        MySqlCommand command = new MySqlCommand(sql, connection);
        using (MySqlDataReader reader = command.ExecuteReader())
        {
            while (reader.Read())
            {
                books.Add(new Book
                {
                    id = reader.GetString("id"),
                    title = reader.GetString("title"),
                    description = reader.GetString("description"),
                    imagePath = reader.GetString("imagePath"),
                    createdAt = DateTime.Parse(reader.GetString("createdat")),
                    createdBy = fetchAdmin(reader.GetString("createdby")).name,
                    author = getBooksAuthor(reader.GetString("id")),
                    categories = getBooksCategories(reader.GetString("id"))
                });
            }
        }
        closeConnection();
        return books.ToArray();
    }

    public Admin fetchAdmin(string username)
    {
        openConnection();
        string sql = "SELECT * FROM admin WHERE username=@value";
        MySqlCommand command = new MySqlCommand(sql, connection);
        command.Parameters.AddWithValue("@value", username);
        using (MySqlDataReader reader = command.ExecuteReader())
        {
            if (reader.Read())
            {
                Admin admin = new Admin
                {
                    username = reader.GetString("username"),
                    name = reader.GetString("name"),
                    password = reader.GetString("password")
                };
                closeConnection();
                return admin;
            }
            else
            {
                Console.WriteLine(("No admin found"));
            }
        }
        closeConnection();
        return null;
    }

    public Author getBooksAuthor(string bookId)
    {
        openConnection();
        string sql = "SELECT * FROM author WHERE bookid=@value";
        MySqlCommand command = new MySqlCommand(sql, connection);
        command.Parameters.AddWithValue("@value", bookId);
        using (MySqlDataReader reader = command.ExecuteReader())
        {
            if (reader.Read())
            {
                Author author = new Author
                {
                    name = reader.GetString("name"),
                    bio = reader.GetString("bio"),
                    createdAt = DateTime.Parse(reader.GetString("createdat")),
                    nrOfBooks = reader.GetInt32("nrofbooks"),
                    createdBy = fetchAdmin(reader.GetString("createdby")).name
                };
                closeConnection();
                return author;
            }
            else
            {
                Console.WriteLine("No author found");
            }
        }
        closeConnection();
        return null;
    }

    public string[] getBooksCategories(string bookId)
    {
        openConnection();
        List<string> categories = new List<string>();
        string sql = "SELECT categoryname FROM hascategory WHERE bookId=@value";
        MySqlCommand command = new MySqlCommand(sql, connection);
        command.Parameters.AddWithValue("@value", bookId);
        using (MySqlDataReader reader = command.ExecuteReader())
        {
            while (reader.Read())
            {
                categories.Add(reader.GetString("categoryname"));
            }
        }
        closeConnection();
        return categories.ToArray();
    }

    public void addBook()
    {

    }

    public void addCategory()
    {

    }

    public void addAdmin()
    {

    }

    public void addAuthor()
    {

    }
}
