import { Layout, Menu, Breadcrumb } from 'antd';
import React from "react";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import DragNDropTest from '../DragNDrop/DragNDropTest';
import HeaderMain from '../Header/Header';
import GridView from '../GridView/GridView';
import GridView2 from '../GridView/GridView2';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Floor', '1', <PieChartOutlined />),
  getItem('Grid', '2', <DesktopOutlined />),
  getItem('Timeline', '3', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '4'),
    getItem('Bill', '5'),
    getItem('Alex', '6'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

class MainSection extends React.Component {
  state = {
    collapsed: false,
    key:"1"
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({
      collapsed,
    });
  };

  handleChange=({ item, key, keyPath, domEvent })=> {
    console.log(item, key, keyPath, domEvent);
    this.setState({key})
  }

  showContent=()=>{
    if(this.state.key==='1'){
      return <div 
      className="grid grid-cols-12 w-full"
      
      >
          <div className='h-full col-span-4 lg:col-span-3 '>
              This is options place
          </div>
      <Layout className="site-layout col-span-8 lg:col-span-9 ">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          <div> Go Back</div>
          </Header>
        <Content
        className="site-layout-background"
          style={{
          //   margin: '0 16px 0 0',
            padding: '0 8px 0 0',
              minHeight: "92%",
          }}
        >
          
         <DragNDropTest/>
         
        </Content>
        
      </Layout>
      </div>
    }
    else if(this.state.key==='2'){
      return <div className="w-full overflow-scroll h-full">
        {/* <h1>About</h1>
        <p>This is the about page</p> */}
        {/* <GridView/> */}
        <GridView2/>
      </div>
    }
    else{
      return <div>
        <h1>Contact</h1>
        <p>This is the contact page</p>
      </div>

    }
  }

  

  render() {
    const { collapsed } = this.state;
    return (
      <>
      {/* <HeaderMain/> */}
      {/* <div className="bg-green-500 fixed top-0">This is Header For Info Related Stuffs</div> */}
      <Layout
        style={{
          minHeight: '95vh',
        }}
       
      >
        <Sider className="pt-5" collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu onClick={this.handleChange} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
        {/* Here is the content parts */}
        {/* <div 
        className="grid grid-cols-12 w-full"
        
        >
            <div className='h-full col-span-4 lg:col-span-3 '>
                This is options place
            </div>
        <Layout className="site-layout col-span-8 lg:col-span-9 ">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          >
            <div> Go Back</div>
            </Header>
          <Content
          className="site-layout-background"
            style={{
            //   margin: '0 16px 0 0',
              padding: '0 8px 0 0',
                minHeight: "92%",
            }}
          >
            
           <DragNDropTest/>
           
          </Content>
          
        </Layout>
        </div> */}
        {this.showContent()}
      </Layout>
      </>
    );
  }
}

export default () => <MainSection />;
