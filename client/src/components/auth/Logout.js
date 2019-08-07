import React from 'react' 
import { useMutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import { MEQUERY } from '../../graphql/queries/me'
import { LOGOUT_MUTATION } from '../../graphql/mutations/logout'

const Logout = props => {
  const [logout] = useMutation(LOGOUT_MUTATION, {
    update: cache => {
      cache.writeQuery({
        query: MEQUERY,
        data: { me: null }
      })
      props.history.push('/')
    }
  })
  
  return <div onClick={() => logout()}>Logout</div>
}

export default withRouter(Logout)