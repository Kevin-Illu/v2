import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes'
import { MainRouterProvider } from './router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Theme>
      <MainRouterProvider />
    </Theme>
  </React.StrictMode>
)
