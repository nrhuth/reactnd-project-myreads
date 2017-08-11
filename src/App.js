import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom'
import MyReads from './MyReads'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
  }

  render() {
    return (
      <div className="app">
            <Route exact path="/" render={() => (    
                <MyReads/>
            )}/>
            <Route path="/search" render={() => (
                <SearchBooks/>
            )}/>
      </div>
    )
  }
}

export default BooksApp
