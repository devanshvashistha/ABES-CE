import React from 'react'
import Book from './component/book'
import './App.css'

function App() {
  return (
    <div id="adi">
      <Book title="Math" price = {200} />
      <Book title="Physics" price = {500} />
      <Book title="Chemistry" price = {900} />
    </div>
  )
}

export default App