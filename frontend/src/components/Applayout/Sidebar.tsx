import React from 'react';
import { useNavigate } from "react-router-dom";
import PathConstants from '../../routes/PathConstants';
import { Layout, Menu } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import { 
  HomeOutlined,
  QuestionOutlined
 } from '@ant-design/icons';

const { Sider } = Layout;

const items = [
  {
    key: '1',
    icon: <HomeOutlined />,
    label: 'Home',
    path: PathConstants.HOME,
  },
  {
    key: '2',
    icon: <QuestionOutlined />,
    label: 'Questionnaire',
    path: PathConstants.QUESTIONNAIRE,
  },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (e: MenuInfo) => {
    const clickedItem = items.find(item => item.key === e.key);
    if (clickedItem) {
      navigate(clickedItem.path);
    }
  };

  const currentSelectedKey = items.find(item => window.location.pathname === item.path)?.key ?? '1';

  return (
    <Sider collapsible theme="light">
      <Menu theme="light" mode="inline" items={items} defaultSelectedKeys={[currentSelectedKey]} onClick={handleClick} />
    </Sider>
  )
};

export default Sidebar;
