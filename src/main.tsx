import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './variables.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import './i18n';

const basename = import.meta.env.VITE_BASENAME || '/';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <HashRouter basename={basename}>
        <App />
      </HashRouter>
    </Auth0Provider>
  </StrictMode>,
);
