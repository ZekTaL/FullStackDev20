import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const EditAuthor = (props) => {
  const [born, setBorn] = useState('')

  const [ editAuthor, result ] = useMutation(EDIT_AUTHOR, {
    refetchQueries:  [{query: ALL_AUTHORS }],
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    }
  })

  const authors = props.authors

  const submit = (event) => {
    event.preventDefault()

    const selectElement = document.getElementById("selectAuthor");
    const selectedAuthor = selectElement.value;

    editAuthor({ variables: { name: selectedAuthor, born: Number(born) } })
    setBorn('')
  }

  useEffect(() => {   
      if (result.data && result.data.editAuthor === null) {      
          props.setError('author not found')    
        }  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.data])

  return (
    <div>
      <h2>Edit Author</h2>

      <form onSubmit={submit}>
        <div>
          name <select id="selectAuthor">
            {authors.map(author => <option value={author.name}>{author.name}</option> )}
          </select>
        </div>
        <div>
          born <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>Update Author</button>
      </form>
    </div>
  )
}

export default EditAuthor