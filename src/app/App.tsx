import Header from './components/header/Header';
import NavBar from './components/navbar/NavBar';
import {
    RouteAbout,
    RouteArticle,
    RouteDatabase,
    RouteFaq,
    RouteJournal,
    RouteLegal,
    RouteResearchData,
    RouteResources,
    RouteRoot,
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
import { Route, Routes } from 'react-router-dom';

const App = () => {
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
