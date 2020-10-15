import React, {useState} from 'react'

const LoginForm = ({ login }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 

  const handleLogin = (event) => {    
    event.preventDefault()    
    console.log('logging in with', username, password)  
    login({
      username: username,
      password: password
    })    
   
    setUsername('')      
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
      </div>
        <button type="submit">LOGIN</button>
      </form>
    </div>
  )
}

export default LoginForm