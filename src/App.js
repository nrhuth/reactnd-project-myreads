import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom'
import MyReads from './MyReads'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
    
    state = {
        books: [],
    }

    componentDidMount() {
        BooksAPI.getAll().then((books)=> {
            this.setState({books})
        })
    }
    
    updateBook = (book, shelf) => {
        this.setState(state => ({
            book: state.books.filter(b => b.id === book.id).map(b => b.shelf = shelf)
        }))
        
        BooksAPI.update(book, shelf)
    }

    render() {
    return (
        <div className="app">
            <Route exact path="/" render={() => (    
                    <MyReads
                        onUpdateBook={this.updateBook}
                        books={this.state.books}
                    />
            )}/>
            <Route path="/search" render={() => (
                    <SearchBooks
                        onUpdateBook={this.updateBook}
                    />
            )}/>
        </div>
        )
    }
}

export default BooksApp
