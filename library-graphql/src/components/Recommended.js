import React from 'react'
import {useQuery} from '@apollo/client'
import {ALL_BOOKS_GENRE, CURRENT_USER} from '../queries'

const Recommended = (props) => {

  const { data: currentUser } = useQuery(CURRENT_USER, {fetchPolicy: 'no-cache'})
  const favoriteGenre = currentUser?.me?.favoriteGenre
  const { data: allBooksGenre } = useQuery(ALL_BOOKS_GENRE, { 
    skip: !favoriteGenre,
    variables: { genre: favoriteGenre }
  })

  if (!props.show) {
    return null
  }

  if (!allBooksGenre)
  return <div></div>

  if (allBooksGenre.loading)  {
    return <div>loading...</div>
  }
  
  const booksToShow = allBooksGenre.allBooks

  return (
    <div>
      <h2>Books</h2>
      Books in your favorite genre: <b>{favoriteGenre}</b>
      <p></p>

      {
        booksToShow.length === 0
        ? <div><b>No books in your favorite genre</b></div>
        : <table>
            <tbody>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Published</th>
              </tr>
              {booksToShow.map(a =>
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author}</td>
                  <td>{a.published}</td>
                </tr>
              )}
            </tbody>
          </table>
      }
      </div>
  )
}

export default Recommended