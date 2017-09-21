import React from 'react';
import { Route } from 'react-router-dom';

import * as BooksAPI from './BooksAPI';
import './App.css';
import Util from './Util';
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';
import PickBookShelf from './PickBookShelf';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  }

  setBookShelf = (book, shelf) => {
    var bookIdx = this.state.books.findIndex(stateBook => stateBook.id === book.id);

    this.setState((state) => {
      if (bookIdx >= 0) {
        state.books[bookIdx].shelf = shelf;
      }
      else {
        book.shelf = shelf;
        state.books.push(book);
      }

      return state;
    });

    BooksAPI.update(book, shelf).then((res) => {

    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks books={this.state.books} setBookShelf={this.setBookShelf} />
        )} />
        <Route path="/pick-book-shelf" render={(routeProps) => {
          var queryParams = Util.getQueryParams(routeProps.location.search);
          var bookId = parseInt(queryParams.bookId, 10);

          return (<PickBookShelf bookId={bookId} goBack={routeProps.history.goBack}/>);
          }} />
        <Route path="/search" render={(routeProps) => {
          var queryParams = Util.getQueryParams(routeProps.location.search);

          return (<SearchBooks searchText={queryParams.text} books={this.state.books} setBookShelf={this.setBookShelf} />);
        }} />
      </div>
    );
  }
}

export default BooksApp
