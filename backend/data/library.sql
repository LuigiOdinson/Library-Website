DROP DATABASE IF EXISTS Library;
CREATE DATABASE Library;
USE Library;

CREATE TABLE book (
  id INT AUTO_INCREMENT PRIMARY KEY,
  book_name VARCHAR(50) NOT NULL,
  published_at INT NOT NULL,
  borrowed BOOLEAN DEFAULT false
);

CREATE TABLE genre (
  id INT AUTO_INCREMENT PRIMARY KEY,
  genre_name VARCHAR(50) NOT NULL
);

CREATE TABLE books_genres (
  book_id INT,
  genre_id INT,
  PRIMARY KEY (book_id, genre_id),
  FOREIGN KEY (book_id) REFERENCES book(id) ON DELETE CASCADE,
  FOREIGN KEY (genre_id) REFERENCES genre(id) ON DELETE CASCADE
);

CREATE TABLE author (
  id INT AUTO_INCREMENT PRIMARY KEY,
  author_name VARCHAR(50) NOT NULL
);

CREATE TABLE books_authors (
  book_id INT,
  author_id INT,
  PRIMARY KEY (book_id, author_id),
  FOREIGN KEY (book_id) REFERENCES book(id) ON DELETE CASCADE,
  FOREIGN KEY (author_id) REFERENCES author(id) ON DELETE CASCADE
);

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  birth_date DATE NOT NULL,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  banned BOOLEAN NOT NULL DEFAULT false,
  admin BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE return_option (
  id INT AUTO_INCREMENT PRIMARY KEY,
  return_option_days INT NOT NULL,
  return_option_fine DECIMAL(8, 0) NOT NULL DEFAULT 0
);
INSERT INTO return_option (return_option_days, return_option_fine) VALUES
(7, 5000),
(14, 7000),
(21, 9000);

CREATE TABLE borrow (
  id INT AUTO_INCREMENT PRIMARY KEY,
  book_id INT,
  FOREIGN KEY (book_id) REFERENCES book(id) ON DELETE CASCADE,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
  borrowed_at BIGINT NOT NULL DEFAULT (UNIX_TIMESTAMP(CURRENT_TIMESTAMP(3)) * 1000),
  return_option_id INT,
  FOREIGN KEY (return_option_id) REFERENCES return_option(id) ON DELETE CASCADE,
  returned_at BIGINT DEFAULT NULL,
  borrow_fine DECIMAL(8, 2) DEFAULT 0.00
);

-- views
CREATE VIEW book_genre_author AS
  SELECT 
    book.id,
    book.book_name,
    book.published_at,
    book.borrowed,
    genre.genre_name,
    author.author_name
  FROM book
  JOIN books_genres ON book.id = books_genres.book_id
  JOIN genre ON books_genres.genre_id = genre.id

  JOIN books_authors ON book.id = books_authors.book_id
  JOIN author ON books_authors.author_id = author.id;


CREATE VIEW book_borrow_returnOption AS
  SELECT 
    book_genre_author.id,-- same as book id
    borrow.user_id,
    book_genre_author.book_name,
    book_genre_author.author_name,
    borrow.borrowed_at,
    borrow.returned_at,
    borrow.borrow_fine,
    return_option.return_option_days,
    return_option.return_option_fine
  FROM book_genre_author
  JOIN borrow ON book_genre_author.id = borrow.book_id
  JOIN return_option ON return_option.id = borrow.return_option_id;



-- inserting default genres and authors

INSERT INTO genre (genre_name) VALUES
('Fiction'),
('Science Fiction'),
('Classic'),
('Mystery'),
('Romance');

INSERT INTO author (author_name) VALUES
('F. Scott Fitzgerald'),
('George Orwell'),
('Harper Lee'),
('Jane Austen'),
('J.D. Salinger');
