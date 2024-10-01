import './App.css';
import Router from './routes/RouterComponent';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

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
