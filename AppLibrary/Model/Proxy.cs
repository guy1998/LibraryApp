using System;
using MySql.Data.MySqlClient;
using System.Collections.Generic;
using System.Data;
using System.Reflection.Metadata.Ecma335;
using DriniLibraryApp.Model;

public class Proxy
{
    private MySqlConnection connection;
    private string connectionString = "server=sql7.freemysqlhosting.net;database=sql7633782;user=sql7633782;password=s7n1tsjnTz";

    public Proxy()
    {
        connection = new MySqlConnection(connectionString);
    }

    // ----------------Database connection--------------------------
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

    // ------------------ Book methods ---------------------------

    public Book fetchBook (string bookId){
        openConnection();
        string sql = "SELECT * FROM book WHERE id=@bookId";
        MySqlCommand command = new MySqlCommand(sql, connection);
        command.Parameters.AddWithValue("@bookId", bookId);
        string authorName = "";
        Book book = null;
        using (MySqlDataReader reader = command.ExecuteReader())
        {
            if (reader.Read())
            {
                book = new Book
                {
                    id = reader.GetString("id"),
                    title = reader.GetString("title"),
                    description = reader.GetString("description"),
                    imagePath = reader.GetString("imagePath"),
                    createdAt = reader.GetDateTime("createdat"),
                    createdBy = reader.GetString("createdby"),
                    author = null,
                    categories = null
                };
                authorName = reader.GetString("author");
            }
            else
            {
                closeConnection();
                throw new DriniLibraryApp.Model.UserNotFound();
            }
        }

        book.author = getBooksAuthor(authorName);
        book.categories = getBooksCategories(book.id);
        closeConnection();
        return book;
    }
    public Book[] readBooks()
    {
        openConnection();
        string sql = "SELECT * FROM book";
        List<Book> books = new List<Book>();
        List<string> authors = new List<string>();
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
                    createdBy = reader.GetString("createdBy"),
                    categories = null,
                    author = null
                });

                authors.Add(reader.GetString("author"));
            }

            reader.Close();
        }

        for (int i = 0; i < books.Count; i++)
            books[i].categories = getBooksCategories(books[i].id);

        for (int i = 0; i < books.Count; i++)
            books[i].createdBy = fetchBookAdmin(books[i].createdBy).name;

        for (int i = 0; i < books.Count; i++)
            books[i].author = getBooksAuthor(authors[i]);


        closeConnection();
        return books.ToArray();
    }

    public Admin fetchBookAdmin(string username)
    {
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
                return admin;
            }
            else
            {
                throw new DriniLibraryApp.Model.UserNotFound();
            }
        }
    }

    public Author getBooksAuthor(string authorname)
    {
        string sql = "SELECT * FROM author WHERE name=@value";
        MySqlCommand command = new MySqlCommand(sql, connection);
        command.Parameters.AddWithValue("@value", authorname);
        using (MySqlDataReader reader = command.ExecuteReader())
        {
            if (reader.Read())
            {
                Author author = new Author
                {
                    name = reader.GetString("name"),
                    bio = reader.GetString("bio"),
                    createdAt = DateTime.Parse(reader.GetString("createdat")),
                    nrOfBooks = reader.GetInt32("nrOfBooks"),
                    createdBy = reader.GetString("createdBy")
                };
                return author;
            }
            else
            {
                Console.WriteLine("No author found");
            }
        }
        return null;
    }

    public string[] getBooksCategories(string bookId)
    {
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
        return categories.ToArray();
    }

    public void addBook(Book book)
    {
        openConnection();
        string sql = "INSERT INTO book VALUES (@id, @title, @description, @imagepath, @createdat, @createdby, @author)";
        MySqlCommand command = new MySqlCommand( sql, connection);
        command.Parameters.AddWithValue("@id", book.id);
        command.Parameters.AddWithValue("@title", book.title);
        command.Parameters.AddWithValue("@description", book.description);
        command.Parameters.AddWithValue("@imagepath", book.imagePath);
        command.Parameters.AddWithValue("@createdat", book.createdAt);
        command.Parameters.AddWithValue("@createdby", book.createdBy);
        command.Parameters.AddWithValue("@author", book.author.name);
        try
        {
            command.ExecuteNonQuery();
        }catch (MySqlException ex) {
            closeConnection();
            throw new BookAlreadyExists();
        }

        for(int i=0; i<book.categories.Length; i++)
        {
            insertCategory(book.id, book.categories[i]);
        }

        incrementAuthor(book.author.name);
        closeConnection();
    }

    public void insertCategory(string book, string category)
    {
        string sql = "INSERT INTO hascategory VALUES (@name, @id)";
        MySqlCommand command = new MySqlCommand(sql, connection);
        command.Parameters.AddWithValue("@id", book);
        command.Parameters.AddWithValue("@name", category);
        command.ExecuteNonQuery ();
    }

    public void deleteCategories(string id){
        string sql = "DELETE FROM hascategory WHERE bookId = @id";
        MySqlCommand command = new MySqlCommand(sql, connection);
        command.Parameters.AddWithValue("@id", id);
        command.ExecuteNonQuery ();
    }

    public void incrementAuthor(string authorname)
    {
        string sql = "UPDATE author SET nrOfBooks = nrOfBooks + 1 WHERE name = @value";
        MySqlCommand command = new MySqlCommand(sql, connection);
        command.Parameters.AddWithValue("@value", authorname);
        command.ExecuteNonQuery();
    }

    public void deleteBook(Book book){
        openConnection();
        string sql = "DELETE FROM book WHERE id=@id";
        MySqlCommand command = new MySqlCommand(sql, connection);
        command.Parameters.AddWithValue("@id", book.id);
        try{
            int rowsAffected = command.ExecuteNonQuery();
        }catch(MySqlException ex){
            throw ex;
        }

        decrementAuthor(book.author.name);
        closeConnection();
    }

    public void decrementAuthor(string authorname)
    {
        string sql = "UPDATE author SET nrOfBooks = nrOfBooks - 1 WHERE name = @value";
        MySqlCommand command = new MySqlCommand(sql, connection);
        command.Parameters.AddWithValue("@value", authorname);
        command.ExecuteNonQuery();
    }

    public void decrementAuthor1(string bookId){
        string sql = "UPDATE author SET nrOfBooks = nrOfBooks - 1 WHERE name = (SELECT author FROM book WHERE id = @value)";
        MySqlCommand command = new MySqlCommand(sql, connection);
        command.Parameters.AddWithValue("@value", bookId);
        command.ExecuteNonQuery();
    }

    public void editBook(string bookId, string column, string newValue){
        openConnection();
        if(column == "author"){
            decrementAuthor1(bookId);
            incrementAuthor(newValue);
        }
        string sql = "UPDATE book SET " + column + " =@newValue WHERE id=@bookid";
        MySqlCommand command = new MySqlCommand(sql, connection);
        command.Parameters.AddWithValue("@newValue", newValue);
        command.Parameters.AddWithValue("@bookid", bookId);
        command.ExecuteNonQuery();
        closeConnection();
    }

    public void editBookCategories(Book book, string [] newCategories){
        openConnection();
        deleteCategories(book.id);
        for(int i=0; i<newCategories.Length; i++){
            insertCategory(book.id, newCategories[i]);
        }
        closeConnection();
    }


    //------------------Category methods----------------------
    public void addCategory(Category category)
    {
        openConnection();
        string sql = "INSERT INTO category VALUES (@categoryname, @priority, @createdat, @createdby, @ispremium)";
        MySqlCommand command = new MySqlCommand(sql, connection);
        command.Parameters.AddWithValue("@categoryname", category.categoryName);
        command.Parameters.AddWithValue("@priority", category.priority);
        command.Parameters.AddWithValue("@createdat", category.createdAt);
        command.Parameters.AddWithValue("@createdby", category.createdBy);
        if(category.premium)
            command.Parameters.AddWithValue("@ispremium", 1);
        else 
            command.Parameters.AddWithValue("@ispremium", 0);
        try
        {
            int rowsAffected = command.ExecuteNonQuery();
        }catch(MySqlException ex) {
            closeConnection();
            throw new CategoryAlreadyExists();
        }
        closeConnection();
    }

    public void deleteCategory(string categoryName)
    {
        openConnection();
        string sql = "DELETE FROM category WHERE categoryname = @value";
        MySqlCommand command = new MySqlCommand( sql, connection);
        command.Parameters.AddWithValue("@value", categoryName);
        try
        {
            int rowsAffected = command.ExecuteNonQuery();
        }catch (MySqlException ex) {
            closeConnection();
            throw ex;
        }

        closeConnection();
    }

    public void editCategory(string categoryName, string column, string value)
    {
        openConnection();
        string sql = "UPDATE category SET " + column + "=@value WHERE categoryName=@name";
        MySqlCommand command = new MySqlCommand(sql, connection);
        command.Parameters.AddWithValue("@value", value);
        command.Parameters.AddWithValue("@name", categoryName);
        try
        {
            int rowsAffected = command.ExecuteNonQuery();
        }catch(Exception ex) { 
            closeConnection();
            throw ex;
        }

        closeConnection();
    }

    public Category[] readCategories()
    {
        Console.WriteLine("I am reading categories");
        openConnection();
        string sql = "SELECT * FROM category";
        List<Category> categories = new List<Category>();
        MySqlCommand command = new MySqlCommand(sql, connection);
        using(MySqlDataReader reader = command.ExecuteReader())
        {
            while (reader.Read())
            {
                Category category = new Category
                {
                    categoryName = reader.GetString("categoryname"),
                    priority = reader.GetInt32("priority"),
                    createdAt = reader.GetDateTime("createdat"),
                    createdBy = reader.GetString("createdby"),
                    premium = false
                };
                int isPremium = reader.GetInt32("ispremium");
                if(isPremium == 1)
                    category.premium = true;
                categories.Add(category);
                    
            }
        }

        closeConnection();
        return categories.ToArray();
    }

    public Category[] getPremium(){
        openConnection();
        string sql = "SELECT * FROM category WHERE ispremium=1";
        List<Category> premium = new List<Category>();
        MySqlCommand command = new MySqlCommand(sql, connection);
        using(MySqlDataReader reader = command.ExecuteReader()){
            while(reader.Read()){
                premium.Add(new Category{
                    categoryName = reader.GetString("categoryname"),
                    priority = reader.GetInt32("priority"),
                    createdAt= reader.GetDateTime("createdat"),
                    createdBy = reader.GetString("createdby"),
                    premium = true
                });
            }
        }

        closeConnection();
        return premium.ToArray();
    }

    //----------------Admin methods---------------------
    public Admin addAdmin(string name, string username, string password)
    {
        try
        {
            fetchAdmin(username);
            throw new UserAlreadyExists();
        }catch(UserNotFound ex)
        {
            openConnection();
            string sql = "INSERT INTO admin VALUES (@username, @name, @password, './user.png')";
            MySqlCommand command = new MySqlCommand(@sql, connection);
            command.Parameters.AddWithValue("@name", name);
            command.Parameters.AddWithValue("@username", username);
            command.Parameters.AddWithValue("@password", password);
            command.ExecuteNonQuery();
            closeConnection();
        }

        return new Admin { name = name, username = username, password = password, imagePath="./user.png" };
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
                    password = reader.GetString("password"),
                    imagePath = reader.GetString("img_path")
                };
                closeConnection();
                return admin;
            }
            else
            {
                closeConnection();
                throw new DriniLibraryApp.Model.UserNotFound();
            }
        }
    }

    public void editAdmin (string username, string column, string newValue){
        openConnection();
        string sql = "UPDATE admin SET " + column + "= @value WHERE username = @name";
        MySqlCommand command = new MySqlCommand(sql, connection);
        command.Parameters.AddWithValue("@value", newValue);
        command.Parameters.AddWithValue("@name", username);

        try
        {
            int rowsAffected = command.ExecuteNonQuery();  
        }catch(MySqlException ex)
        {
            throw ex;
        }

        closeConnection();
    }

    //-----------Author methods-----------------
    public void addAuthor(Author author)
    {
        openConnection();
        string sql = "INSERT INTO author VALUES(@name, @bio, @nrOfBooks, @createdat, @createdby)";
        MySqlCommand command = new MySqlCommand(sql, connection);
        command.Parameters.AddWithValue("@name", author.name);
        command.Parameters.AddWithValue("@bio", author.bio);
        command.Parameters.AddWithValue("@nrOfBooks", author.nrOfBooks);
        command.Parameters.AddWithValue("@createdat", author.createdAt);
        command.Parameters.AddWithValue("@createdby", author.createdBy);

        try
        {
            int rowsAffected = command.ExecuteNonQuery();
        }
        catch (MySqlException ex)
        {
            throw ex;
        }
        
        closeConnection();
    }

    public void removeAuthor(Author author)
    {
        openConnection();
        string sql = "DELETE FROM author WHERE name = @value";
        MySqlCommand command = new MySqlCommand(sql, connection);
        command.Parameters.AddWithValue("@value", author.name);
        try
        {
            int rowsAffected = command.ExecuteNonQuery();
        }catch(MySqlException ex)
        {
            throw ex;
        }
        
        closeConnection();
    }

    public void editAuthor(Author author, string columnName, string newValue)
    {
        openConnection();
        string sql = "UPDATE author SET " + columnName + "= @value WHERE name = @name";
        MySqlCommand command = new MySqlCommand(sql, connection);
        command.Parameters.AddWithValue("@value", newValue);
        command.Parameters.AddWithValue("@name", author.name);

        try
        {
            int rowsAffected = command.ExecuteNonQuery();  
        }catch(MySqlException ex)
        {
            throw ex;
        }

        closeConnection();
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

}
