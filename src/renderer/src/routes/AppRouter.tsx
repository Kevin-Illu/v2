import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage, SigInPage, SignUpPage } from '@renderer/pages'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SigInPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
