import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenHelpers from "../../services/token-helpers";

export default function PublicOnlyRoute({ component, ...props }) {
  const Component = component
  return (
    <Route
      {...props}
      render={componentProps => (
        TokenHelpers.hasAuthToken()
          ? <Redirect to={'/'} />
          : <Component {...componentProps} />
      )}
    />
  )
}