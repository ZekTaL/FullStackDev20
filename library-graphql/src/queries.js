import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    author
    published
    genres
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_BOOKS_GENRE = gql`
  query allBooks($genre: String!) {
    allBooks(genre: $genre) {
      title
      author
      published
    }
  }
`

export const CURRENT_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook (
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author
      published
      genres
      id
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born)  {
      name
      born
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const BOOK_ADDED = gql`  
  subscription {    
    bookAdded {      
      ...BookDetails    
    }  
  }  
  ${BOOK_DETAILS}
`
