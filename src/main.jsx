import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { Global, ThemeProvider, css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';
import globalStyle from './styles/global';
import theme from './styles/theme';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <Global
        styles={css`
          ${emotionNormalize}
          ${globalStyle}
        `}
      />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
);
