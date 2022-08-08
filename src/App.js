import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import MainLayout from './layouts/MainLayout';
import store from './redux/store';
import { Provider } from 'react-redux';

function App() {
    useEffect(() => {
        document.title = 'Zing MP3 Clone';
    });
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((publicRoute, index) => {
                            const Layout = publicRoute.layout || MainLayout;
                            const Page = publicRoute.component;
                            return (
                                <Route
                                    key={index}
                                    path={publicRoute.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
