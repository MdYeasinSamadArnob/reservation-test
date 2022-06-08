import '../styles/globals.css'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
// import "../styles/tailwind-pre-build.css"
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css"

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
