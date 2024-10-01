import './App.css';
import Router from './routes/vdsRouterComponent';
import Header from './Header/header';
import Footer from './Footer/footer';

function App() {
  return (
    <div >
      <Header></Header>
      <Router></Router>
      <Footer></Footer>
    </div>
  );
}

export default App;
