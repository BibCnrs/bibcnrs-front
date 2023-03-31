import './index.scss';
import I18N from './app/shared/locales/I18N';
import Header from './app/components/header/Header';
import NavBar from './app/components/navbar/NavBar';
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
import LocalizedThemeProvider from './app/components/utils/LocalizedThemeProvider';
import ExceptedError from './app/pages/errors/ExceptedError';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import ReactDOMClient from 'react-dom/client';
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container);
const queryClient = new QueryClient();

root.render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <I18nextProvider i18n={I18N}>
                <LocalizedThemeProvider>
                    <BrowserRouter>
                        <div id="head">
                            <Header />
                            <NavBar />
                        </div>
                        <div id="app-container">
                            <Routes>
                                {/* Header route route */}
                                <Route
                                    path={RouteRoot}
                                    element={
                                        <ExceptedError>
                                            <Root />
                                        </ExceptedError>
                                    }
                                />
                                {/* Navigation route */}
                                <Route
                                    path={RouteArticle}
                                    element={
                                        <ExceptedError>
                                            <Article />
                                        </ExceptedError>
                                    }
                                />
                                <Route
                                    path={RouteJournal}
                                    element={
                                        <ExceptedError>
                                            <Journal />
                                        </ExceptedError>
                                    }
                                />
                                <Route
                                    path={RouteDatabase}
                                    element={
                                        <ExceptedError>
                                            <Database />
                                        </ExceptedError>
                                    }
                                />
                                <Route
                                    path={RouteResearchData}
                                    element={
                                        <ExceptedError>
                                            <ResearchData />
                                        </ExceptedError>
                                    }
                                />
                                {/* Footer route */}
                                <Route
                                    path={RouteAbout}
                                    element={
                                        <ExceptedError>
                                            <About />
                                        </ExceptedError>
                                    }
                                />
                                <Route
                                    path={RouteContact}
                                    element={
                                        <ExceptedError>
                                            <Contact />
                                        </ExceptedError>
                                    }
                                />
                                <Route
                                    path={RouteLegal}
                                    element={
                                        <ExceptedError>
                                            <Legal />
                                        </ExceptedError>
                                    }
                                />
                                {/* Error route */}
                                <Route path="*" element={<Error404 />} />
                            </Routes>
                        </div>
                        <div>
                            <Footer />
                        </div>
                    </BrowserRouter>
                </LocalizedThemeProvider>
            </I18nextProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    </StrictMode>,
);
