CREATE TABLE admin (
    username VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (username)
);

CREATE TABLE category (
    categoryname VARCHAR(100) NOT NULL,
  	priority INT NOT NULL,
  	createdat DATE,
    createdby VARCHAR(255) NOT NULL,
  	PRIMARY key (categoryname),
  	FOREIGN KEY (createdby) REFERENCES admin (username)
);

CREATE TABLE author(
	name VARCHAR(255) NOT NULL,
  	bio VARCHAR(255) NOT NULL,
  	nrOfBooks INT NOT NULL,
  	createdat DATE NOT NULL,
  	createdby VARCHAR(255) NOT NULL,
  	PRIMARY KEY (name),
  	FOREIGN KEY (createdby) REFERENCES admin (username)
);

CREATE TABLE book (
   	id VARCHAR(100) NOT NULL,
  	title VARCHAR(255) NOT NULL,
  	description TEXT NOT NULL,
  	imagepath VARCHAR(255) NOT NULL,
   	createdat DATE not NULL,
  	createdby VARCHAR(255) NOT NULL,
  	author VARCHAR(255) NOT NULL,
  	PRIMARY KEY (id),
  	FOREIGN KEY (createdby) REFERENCES admin (username),
    FOREIGN KEY (author) REFERENCES author (name)
);

CREATE TABLE hascategory (
   	categoryname VARCHAR(100) NOT NULL,
  	bookId VARCHAR(100) not NULL,
  	FOREIGN KEY (bookId) REFERENCES book (id),
  	FOREIGN KEY (categoryname) REFERENCES category (categoryname)
);
