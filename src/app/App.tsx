import Header from './components/header/Header';
import NavBar from './components/navbar/NavBar';
import {
    RouteAbout,
    RouteArticle,
    RouteDatabase,
    RouteJournal,
    RouteLegal,
    RouteResearchData,
    RouteRoot,
} from './shared/Routes';
import Root from './pages/Root';
import Article from './pages/article/Article';
import Journal from './pages/journal/Journal';
import Database from './pages/database/Database';
import ResearchData from './pages/researchdata/ResearchData';
import About from './pages/about/About';
import Legal from './pages/legal/Legal';
import Error404 from './pages/errors/Error404';
import Footer from './components/footer/Footer';
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
                    {/* Header route route */}
                    <Route path={RouteRoot} element={<Root />} />
                    {/* Navigation route */}
                    <Route path={RouteArticle} element={<Article />} />
                    <Route path={RouteJournal} element={<Journal />} />
                    <Route path={RouteDatabase} element={<Database />} />
                    <Route path={RouteResearchData} element={<ResearchData />} />
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
