import './App.scss';
import ProtectedRoute from './components/internal/ProtectedRoute';
import { BibContext } from './components/internal/provider/ContextProvider';
import Footer from './components/pages/footer/Footer';
import Header from './components/pages/header/Header';
import About from './pages/common/about/About';
import Faq from './pages/common/faq/Faq';
import Legal from './pages/common/legal/Legal';
import Resources from './pages/common/resources/Resources';
import Error404 from './pages/errors/Error404';
import Root from './pages/Root';
import Article from './pages/search/article/Article';
import Database from './pages/search/database/Database';
import Publication from './pages/search/publication/Publication';
import ResearchData from './pages/search/researchdata/ResearchData';
import History from './pages/user/history/History';
import Licences from './pages/user/licences/Licences';
import News from './pages/user/news/News';
import Tests from './pages/user/tests/Tests';
import { initSession } from './services/user/Session';
import {
    RouteAbout,
    RouteArticle,
    RouteDatabase,
    RouteFaq,
    RouteHistory,
    RoutePublication,
    RouteLegal,
    RouteLicences,
    RouteNews,
    RouteResearchData,
    RouteResources,
    RouteRoot,
    RouteTests,
} from './shared/Routes';
import { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

const App = () => {
    const { setLogin } = useContext(BibContext);
    useEffect(() => {
        initSession().then((login) => {
            setLogin(login);
        });
    }, [setLogin]);
    return (
        <>
            <div className="header-footer">
                <Header />
            </div>
            <div id="app-container">
                <Routes>
                    {/* Header route */}
                    <Route path={RouteRoot} element={<Root />} />
                    {/* Navigation route */}
                    <Route
                        path={RouteArticle}
                        element={
                            <ProtectedRoute>
                                <Article />
                            </ProtectedRoute>
                        }
                    />
                    <Route path={RoutePublication} element={<Publication />} />
                    <Route path={RouteDatabase} element={<Database />} />
                    <Route path={RouteResearchData} element={<ResearchData />} />
                    <Route path={RouteFaq} element={<Faq />} />
                    <Route path={RouteResources} element={<Resources />} />
                    {/* Protected route */}
                    <Route
                        path={RouteLicences}
                        element={
                            <ProtectedRoute>
                                <Licences />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={RouteTests}
                        element={
                            <ProtectedRoute>
                                <Tests />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={RouteNews}
                        element={
                            <ProtectedRoute>
                                <News />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={RouteHistory}
                        element={
                            <ProtectedRoute>
                                <History />
                            </ProtectedRoute>
                        }
                    />
                    {/* Footer route */}
                    <Route path={RouteAbout} element={<About />} />
                    <Route path={RouteLegal} element={<Legal />} />
                    {/* Error route */}
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </div>
            <div className="header-footer">
                <Footer />
            </div>
        </>
    );
};

export default App;
