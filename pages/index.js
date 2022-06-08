import React from 'react'
import DatePick from '../components/DatePick/DatePick'
import MainSection from '../components/MainSection/MainSection'

function index() {
  return (
    <div className="h-screen ">
      <div className="bg-green-500  h-10">This is Header section
       <DatePick/>
      </div>
      <MainSection/>
    </div>
  )
}

export default index







// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
// import React from 'react';
// import { useState, useEffect } from 'react'
// import { Layout, Menu } from 'antd';
// import {
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
//   UploadOutlined,
// } from '@ant-design/icons';
// import HeaderMain from '../components/Header/Header';
// import LineChart from '../components/Header/LineChart/LineChart';
// import DragNDop from '../components/DragNDrop/DragNDop';
// import DragNDropTest from '../components/DragNDrop/DragNDropTest';
// // import '../styles/globals.css'


// const { Header, Sider, Content } = Layout;

// export default function Home() {
 
//   const [collapsed, setCollapsed] = useState(false);
//   const [selectedKey, setSelectedKey] = useState('1');

//   const toggle = () => {
//     setCollapsed(!collapsed);
//   };

//   const handleMenuClick=({ item, key, keyPath, domEvent })=>{
//     console.log(item, key, keyPath, domEvent);
//     setSelectedKey(key);
//     // console.log(selectedKey);
//   }

//   const showContent=()=>{
//     if(selectedKey==='1'){
//       return <div>
//         <h1>Floor</h1>
//         <p>This is the home page</p>
//         {/* <DragNDop/> */}
//         <div className="h-[500px]">
//         <DragNDropTest/>
//         </div>
//       </div>
//     }
//     else if(selectedKey==='2'){
//       return <div>
//         <h1>About</h1>
//         <p>This is the about page</p>
//       </div>
//     }
//     else if(selectedKey==='3'){
//       return <div>
//         <h1>Contact</h1>
//         <p>This is the contact page</p>
//       </div>
//     }
//     else if(selectedKey==='4'){
//       return <div>
//         <h1>Reservation</h1>
//         <p>This is the reservation page</p>
//       </div>
//     }
//     else if(selectedKey==='5'){
//       return <div>
//         <h1>Menu</h1>
//         <p>This is the menu page</p>
//       </div>
//     }
//   }

  


//   return (
//     <>
//     {/* <HeaderMain/> */}
//     <Layout className="h-screen pt-20">
      
//         <Sider trigger={null} collapsible collapsed={collapsed}>
//           <div className="logo" />
//           {/* <Header>hello</Header> */}
//           <Menu
//             theme="dark"
//             mode="inline"
//             defaultSelectedKeys={['1']}
//             onClick={handleMenuClick}
//             items={[
//               {
//                 key: '1',
//                 icon: <UserOutlined />,
//                 label: 'Floor',
//               },
//               {
//                 key: '2',
//                 icon: <VideoCameraOutlined />,
//                 label: 'List',
//               },
//               {
//                 key: '3',
//                 icon: <UploadOutlined />,
//                 label: 'Grid',
//               },
//               {
//                 key: '4',
//                 icon: <UploadOutlined />,
//                 label: 'Timeline',
//               },
//               {
//                 // key: '3',
//                 // icon: <UploadOutlined />,
//                 // label: 'Grid',
//                 number: '15',
//                 disabled: true
//               },
//               {
//                 key: '5',
//                 icon: <UploadOutlined />,
//                 label: 'Guest',
//               },
//             ]}
//           />
//         </Sider>
       
//         {/* <Layout className="site-layout">
        
//           <Header className="site-layout-background" style={{ padding: 0 }}>
          
//             {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
//               className: 'trigger',
//               onClick: toggle,
//             })}
            
//           </Header>
//           <Content
//             className="site-layout-background"
//             style={{
//               margin: '24px 16px',
//               padding: 24,
//               minHeight: 280,
//             }}
//           >
//             {showContent()}
          
//           </Content>
         
//         </Layout> */}
//       </Layout>
//     </>
//   )
// }
