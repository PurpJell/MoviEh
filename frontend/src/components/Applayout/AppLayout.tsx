import React, {ReactNode, Suspense} from 'react';
import {Layout, theme} from 'antd';
import Sidebar from './Sidebar';
import {Outlet} from 'react-router-dom';
import Loading from '../common/Loading';
import Logo from './Logo';

const {Content, Footer, Header} = Layout;

interface AppLayoutProps {
  children?: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({children}) => {
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();

  return (
    <Layout style={{height: '100vh'}}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'left',
          background: 'white',
          padding: '0',
        }}>
        <Logo />
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
          <Footer style={{textAlign: 'center'}}>
            MoviEh ©{new Date().getFullYear()}
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
