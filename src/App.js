import './App.css';
import { useSelector } from 'react-redux';
import { MainRoutes } from './Router/router';
import { Loading } from './component/Loading/Loading';
import 'antd/dist/reset.css';
// import "@ant-design/flowchart/dist/index.css";

function App() {

  const {statusLoading} = useSelector(state=>state.home);

  return (
    <div className="App">
      {
        statusLoading
        &&
        <Loading/>
      }
      <MainRoutes/>
    </div>
  );
}

export default App;
