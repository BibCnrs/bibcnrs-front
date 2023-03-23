import { StrictMode } from 'react';
import ReactDOMClient from 'react-dom/client';
import App from './app/App';
import { I18nextProvider } from 'react-i18next';
import I18N from './app/locales/I18N';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container);

root.render(
    <StrictMode>
        <I18nextProvider i18n={I18N}>
            <App />
        </I18nextProvider>
    </StrictMode>,
);
