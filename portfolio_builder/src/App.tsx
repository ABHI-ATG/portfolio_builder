import Portfolio from './portfolio/Portfolio'
import CreatePortfolio from './createportfolio/CreatePortfolio'
import NotFound from './NotFound'
import './css/App.css'
import { Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './data/store';

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/portfolio/:string" element={<Portfolio />} />
          <Route path="/createportfolio/*" element={<CreatePortfolio />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Provider>
    </>
  )
}

export default App
