import './index.scss';
import { StrictMode } from 'react';
import ReactDOMClient from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import I18N from './app/locales/I18N';
import Header from './app/components/header/Header';
import Footer from './app/components/footer/Footer';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container);

root.render(
    <StrictMode>
        <I18nextProvider i18n={I18N}>
            <Header />
            <Footer />
        </I18nextProvider>
    </StrictMode>,
);
