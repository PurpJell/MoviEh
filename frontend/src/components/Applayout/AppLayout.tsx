import React, {ReactNode, Suspense} from 'react';
import {Button, Layout, theme} from 'antd';
import Sidebar from './Sidebar';
import {Outlet, useNavigate} from 'react-router-dom';
import Loading from '../common/Loading';
import Logo from './Logo';
import PathConstants from '../../routes/PathConstants';
import {useAuth} from '../../AuthContext';
import UserMenu from './UserMenu';

const {Content, Footer, Header} = Layout;

interface AppLayoutProps {
  children?: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({children}) => {
  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();

  const handleLoginClick = () => {
    navigate(PathConstants.LOGIN);
  };

  return (
    <Layout style={{height: '100vh'}}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'white',
          padding: '0 2% 0  0',
          justifyContent: 'space-between',
        }}>
        <Logo />
        {isAuthenticated ? (
          <UserMenu />
        ) : (
          <Button
            type="primary"
            onClick={handleLoginClick}
            style={{marginLeft: 'auto'}}>
            Login
          </Button>
        )}
      </Header>
      <Layout>
        <Sidebar />
        <Layout>
          <Content
            style={{
              margin: '24px',
              textAlign: 'center',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflowY: 'auto',
            }}>
            <Suspense fallback={<Loading />}>{children ?? <Outlet />}</Suspense>
          </Content>
          <Footer
            style={{
              background: colorBgContainer,
              maxHeight: '50px',
              height: '4vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            MoviEh ©{new Date().getFullYear()}
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
