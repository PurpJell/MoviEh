import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import PathConstants from '../../routes/PathConstants';
import {Layout, Menu} from 'antd';
import {
  FormOutlined,
  QuestionOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

const {Sider} = Layout;

const items = [
  {
    key: '1',
    icon: <FormOutlined />,
    label: 'Mood Matcher',
    path: PathConstants.MOOD_MATCHER,
  },
  {
    key: '2',
    icon: <QuestionOutlined />,
    label: 'Questionnaire',
    path: PathConstants.QUESTIONNAIRE,
  },
  {
    key: '3',
    icon: <UnorderedListOutlined />,
    label: 'Liked Films',
    path: PathConstants.LIKED_FILMS,
  },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  useEffect(() => {
    const currentItem = items.find(item => location.pathname === item.path);
    setSelectedKey(currentItem ? currentItem.key : null);
  }, [location.pathname]);

  const handleClick = (e: {key: string}) => {
    const clickedItem = items.find(item => item.key === e.key);
    if (clickedItem) {
      navigate(clickedItem.path);
    }
  };

  return (
    <Sider collapsible theme="light">
      <Menu
        theme="light"
        mode="inline"
        items={items}
        selectedKeys={selectedKey ? [selectedKey] : undefined}
        onClick={handleClick}
      />
    </Sider>
  );
};

export default Sidebar;
