import React, { Component } from 'react';
import PropTypes from 'prop-types';

// https://facebook.github.io/react/docs/lifting-state-up.html
// https://facebook.github.io/react/docs/lifting-state-up.html#lifting-state-up

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    setBookShelf: PropTypes.func.isRequired
  }

  setBookShelf = (event) => {
    this.props.setBookShelf(this.props.book, event.target.value);
  }

  render() {
    const { book } = this.props;
    
    var bookShelf = book.shelf; 

    if(bookShelf === undefined) {
      bookShelf = "none";
    }

    return (
      <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.smallThumbnail + ')' }}></div>
          <div>
            <select value={bookShelf} onChange={this.setBookShelf}>
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
}

export default Book