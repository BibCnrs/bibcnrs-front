import './App.scss';
import Header from './components/header/Header';
import NavBar from './components/navbar/NavBar';
import {
    RouteAbout,
    RouteArticle,
    RouteDatabase,
    RouteFaq,
    RouteJournal,
    RouteLegal,
    RouteLicences,
    RouteNews,
    RouteResearchData,
    RouteResources,
    RouteRoot,
    RouteTests,
} from './shared/Routes';
import Root from './pages/Root';
import Article from './pages/search/article/Article';
import Journal from './pages/search/journal/Journal';
import Database from './pages/search/database/Database';
import ResearchData from './pages/search/researchdata/ResearchData';
import About from './pages/common/about/About';
import Legal from './pages/common/legal/Legal';
import Error404 from './pages/errors/Error404';
import Footer from './components/footer/Footer';
import Faq from './pages/common/faq/Faq';
import Resources from './pages/common/resources/Resources';
import { initSession } from './services/user/Session';
import { BibContext } from './components/provider/ContextProvider';
import ProtectedRoute from './components/protectedroute/ProtectedRoute';
import Licences from './pages/user/licences/Licences';
import News from './pages/user/news/News';
import Tests from './pages/user/tests/Tests';
import { Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from 'react';

const App = () => {
    const { setLogin } = useContext(BibContext);
    useEffect(() => {
        initSession().then((login) => {
            setLogin(login);
        });
    }, []);
    return (
        <>
            <div className="header-footer">
                <Header />
                <NavBar />
            </div>
            <div id="app-container">
                <Routes>
                    {/* Header route */}
                    <Route path={RouteRoot} element={<Root />} />
                    {/* Navigation route */}
                    <Route path={RouteArticle} element={<Article />} />
                    <Route path={RouteJournal} element={<Journal />} />
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
