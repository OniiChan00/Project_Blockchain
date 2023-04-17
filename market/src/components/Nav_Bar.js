import { AppstoreOutlined, UserOutlined,ShopOutlined,LoginOutlined,ContainerOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import {useNavigate } from 'react-router-dom';


const items = [
    {
        label: 'Market',
        key: '/',
        icon: <ShopOutlined />
        
    },
   ,
    {
        label: 'inventory',
          key: '/inventory',
        icon: <AppstoreOutlined />,
            
         
    },
    {
        label: 'profile',
          key: '/profile',
        icon: <UserOutlined/>,
            
         
    },
    {
        label: 'confirm',
          key: '/confirm',
        icon: <ContainerOutlined />,
            
         
    },
    {
        label: 'login',
          key: '/login',
        icon: <LoginOutlined />, 
         
      },
    {
        label: 'Swagger',
        key: 'swagger',
    },
  ];

export default function Nav_Bar() {
    const [current, setCurrent] = useState('');
    const navigate = useNavigate();
    const onClick = (e) => {
        if(e.key === 'swagger'){
            window.location.href = 'http://localhost:5000/api-docs/';
        }
        else{
        console.log('click ', e.key);
        navigate(e.key);
        setCurrent(e.key);
    }
      };
    return <Menu onClick={onClick} electedKeys={[current]} mode="horizontal" items={items} />;
}
