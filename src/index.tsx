import './index.scss';
import { StrictMode } from 'react';
import ReactDOMClient from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import I18N from './app/locales/I18N';
import Header from './app/components/header/Header';
import Footer from './app/components/footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error404 from './app/routes/errors/Error404';
import Legal from './app/routes/Legal';
import About from './app/routes/About';
import Contact from './app/routes/Contact';
import { RouteAbout, RouteContact, RouteLegal, RouteRoot } from './app/components/routes';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container);

root.render(
    <StrictMode>
        <I18nextProvider i18n={I18N}>
            <BrowserRouter>
                <Header />
                <div id="app">
                    <Routes>
                        <Route path={RouteRoot} element={<h1>Hello, World !</h1>} />
                        <Route path={RouteAbout} element={<About />} />
                        <Route path={RouteContact} element={<Contact />} />
                        <Route path={RouteLegal} element={<Legal />} />
                        <Route path="*" element={<Error404 />} />
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </I18nextProvider>
    </StrictMode>,
);
