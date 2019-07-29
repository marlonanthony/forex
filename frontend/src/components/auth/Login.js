import React, { useState } from 'react'
import { Mutation } from 'react-apollo'

import { MEQUERY } from '../../graphql/queries/me'
import { LOGINMUTATION } from '../../graphql/mutations/login'

export default function Login(props) {
  const [email, setEmail] = useState(''),
        [password, setPassword] = useState('')

  return (
    <Mutation 
      mutation={LOGINMUTATION}
      update={(cache, { data }) => {
        if(!data || !data.login) return 
        cache.writeQuery({
          query: MEQUERY,
          data: { me: data.login }
        })
      }}>
      {(login, { client, error }) => ( 
        <div className='login'>
          <form onSubmit={ async e => {
            e.preventDefault()
            client.clearStore() 
            await login({ variables: { email, password } })
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
            { error &&  <div className='errors'>
                {error.message.split(':')[1].trim()}
              </div> 
            }
            <button type='submit'>Login</button>
          </form>
        </div>
      )}
    </Mutation>
  )
}
