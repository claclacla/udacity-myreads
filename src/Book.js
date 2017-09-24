import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const Book = function (props) {
  const { book, setBookShelf } = props;

  var bookShelf = book.shelf;

  if (bookShelf === undefined) {
    bookShelf = "none";
  }

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <Link to={"/book/" + book.id}>
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.smallThumbnail + ')' }}></div>
          </Link>
          <div className="book-shelf-changer">
            <select value={bookShelf} onChange={(event) => { setBookShelf(book, event.target.value) }}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{(Array.isArray(book.authors)) && book.authors.map((author, idx) => <div key={idx}>{author}</div>)}</div>
      </div>
    </li>
  );
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  setBookShelf: PropTypes.func.isRequired
}

export default Book