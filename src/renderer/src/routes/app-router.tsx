import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './private-route'
import { PublicRoute } from './public-route'
import { routes } from './routes'

const Wrapper = {
  private: PrivateRoute,
  public: PublicRoute
}

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, component: Component, link, authType }) => {
          const AuthWrapper = Wrapper[authType]
          return (
            <Route
              path={path}
              key={link}
              element={
                <AuthWrapper>
                  <Component />
                </AuthWrapper>
              }
            />
          )
        })}
      </Routes>
    </BrowserRouter>
  )
}