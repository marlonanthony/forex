import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { MEQUERY } from '../../graphql/queries/me'
import { LOGINMUTATION } from '../../graphql/mutations/login'

export default function Login(props) {
  const [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [login, { error }] = useMutation(LOGINMUTATION, {
          variables: { email, password },
          update: (cache, { data }) => {
            if(!data || !data.login) return 
            cache.reset()
            cache.writeQuery({
              query: MEQUERY,
              data: { me: data.login }
            })
          }
        })

  return (
    <div className='login'>
      <form onSubmit={ async e => {
        e.preventDefault()
        await login()
        props.history.push('/') 
      }}>
        <h2>Login</h2>
        <input
          required
          name='email'
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Enter your email'
        />
        <input
          required
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Enter your password'
        />
        { error && <p>{ error.message }</p> }
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}