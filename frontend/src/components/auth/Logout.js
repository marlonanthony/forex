import React from 'react' 
import { Mutation } from 'react-apollo'
import { Redirect } from 'react-router-dom'

import { MEQUERY } from '../../graphql/queries/me'
import { LOGOUT_MUTATION } from '../../graphql/mutations/logout'

const Logout = () => (
  <Mutation
    mutation={LOGOUT_MUTATION}
    update={cache => {
      cache.writeQuery({
        query: MEQUERY,
        data: { me: null }
      })
      return <Redirect to='/' />
    }}>
    { logout => <div onClick={logout}>Logout</div> }
  </Mutation>
)

export default Logout