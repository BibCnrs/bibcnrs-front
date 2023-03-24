import './index.scss';
import { StrictMode } from 'react';
import ReactDOMClient from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import I18N from './app/locales/I18N';
import Header from './app/components/header/Header';
import Footer from './app/components/footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error404 from './app/pages/errors/Error404';
import Legal from './app/pages/Legal';
import About from './app/pages/About';
import Contact from './app/pages/Contact';
import { RouteAbout, RouteContact, RouteLegal, RouteRoot } from './app/shared/Routes';
import NavBar from './app/components/navbar/NavBar';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container);
const theme = createTheme({
    typography: {
        fontFamily: '"DM Sans","Helvetica Neue",Helvetica,Arial,sans-serif',
    },
});

root.render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <I18nextProvider i18n={I18N}>
                <BrowserRouter>
                    <div id="head">
                        <Header />
                        <NavBar pageIndex={0} />
                    </div>
                    <div id="app">
                        <Routes>
                            <Route path={RouteRoot} element={<h1>Hello, World !</h1>} />
                            <Route path={RouteAbout} element={<About />} />
                            <Route path={RouteContact} element={<Contact />} />
                            <Route path={RouteLegal} element={<Legal />} />
                            <Route path="*" element={<Error404 />} />
                        </Routes>
                    </div>
                    <div>
                        <Footer />
                    </div>
                </BrowserRouter>
            </I18nextProvider>
        </ThemeProvider>
    </StrictMode>,
);
