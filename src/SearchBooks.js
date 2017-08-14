import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class SearchBooks extends Component {
    static propTypes = {
        onUpdateBook : PropTypes.func,
    }
    
    state = {
        query: '',
        queryResult: []
    }
    
    updateQuery = (query) => {
        this.setState({query: query.trim()})
        BooksAPI.search(query, 20).then(queryResult => {
            this.setState({queryResult})
        })
    }
    
    render() {
        const { onUpdateBook } = this.props
        
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                    type="text" 
                    placeholder="Search by title or author"
                    value={this.state.query}
                    onChange={event => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.queryResult.map(result => (
                  <li key={result.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${result.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                          <select value='' onChange={(event) => onUpdateBook(result, event.target.value)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{result.title}</div>
                      <div className="book-authors">{result.authors}</div>
                    </div>
                  </li>
                  ))}
              </ol>
            </div>
          </div>
        )
    }
}

export default SearchBooks