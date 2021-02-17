import React, { useState } from 'react'
import {useQuery} from '@apollo/client'
import {ALL_BOOKS} from '../queries'

const Books = (props) => {

  const [filterGenre, setFilterGenre] = useState('')
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  // get the list of unique genres from the book list
  let genreList = []
  books.forEach(book => {
    book.genres.forEach(bookGenre => {
      if (!genreList.includes(bookGenre)) {
        genreList = [...genreList, bookGenre]
      }
    })
  })

  const handleFilterGenre = (event) => {
    setFilterGenre(event.target.value)
  }

  let booksToShow = books
  if (filterGenre !== '')
    booksToShow = books.filter(book => book.genres.includes(filterGenre))

  return (
    <div>
      <h2>Books</h2>
      Selected genre: <b>{filterGenre ? filterGenre : 'All Genres'}</b>
      <p></p>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <br />

      <div className="btn-group">
        <button key="allgenres" value="" onClick={handleFilterGenre}>all genres</button>
        {
          genreList.map(genre => <button key={genre} value={genre} onClick={handleFilterGenre}>{genre}</button>)
        }
      </div>
    </div>
  )
}

export default Books