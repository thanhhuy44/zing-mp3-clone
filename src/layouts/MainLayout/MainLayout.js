import Header from '~/layouts/components/Header';
import LeftSidebar from '~/layouts/components/LeftSidebar';

function MainLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                <LeftSidebar />
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default MainLayout;
