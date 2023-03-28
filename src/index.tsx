import './index.scss';
import { StrictMode } from 'react';
import ReactDOMClient from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import I18N from './app/shared/locales/I18N';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import Header from './app/components/header/Header';
import NavBar from './app/components/navbar/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
    RouteAbout,
    RouteArticle,
    RouteContact,
    RouteDatabase,
    RouteJournal,
    RouteLegal,
    RouteResearchData,
    RouteRoot,
} from './app/shared/Routes';
import Article from './app/pages/article/Article';
import Journal from './app/pages/journal/Journal';
import Database from './app/pages/database/Database';
import ResearchData from './app/pages/researchdata/ResearchData';
import About from './app/pages/about/About';
import Contact from './app/pages/contact/Contact';
import Legal from './app/pages/legal/Legal';
import Error404 from './app/pages/errors/Error404';
import Footer from './app/components/footer/Footer';
import Root from './app/pages/Root';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container);
const theme = createTheme({
    typography: {
        fontFamily: '"DM Sans", sans-serif',
    },
});

root.render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <I18nextProvider i18n={I18N}>
                <BrowserRouter>
                    <div id="head">
                        <Header />
                        <NavBar />
                    </div>
                    <div id="app-container">
                        <Routes>
                            {/* Header route route */}
                            <Route path={RouteRoot} element={<Root />} />
                            {/* Navigation route */}
                            <Route path={RouteArticle} element={<Article />} />
                            <Route path={RouteJournal} element={<Journal />} />
                            <Route path={RouteDatabase} element={<Database />} />
                            <Route path={RouteResearchData} element={<ResearchData />} />
                            {/* Footer route */}
                            <Route path={RouteAbout} element={<About />} />
                            <Route path={RouteContact} element={<Contact />} />
                            <Route path={RouteLegal} element={<Legal />} />
                            {/* Error route */}
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
