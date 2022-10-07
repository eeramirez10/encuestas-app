import './App.css';
import { Route, Switch, Router } from 'wouter'
import SideBar from './components/UI/SideBar';
import Home from './pages/home/Home';
import Encuestas from './pages/encuestas/Encuestas';
import NewEncuesta from './pages/encuestas/NewEncuesta';
import AddPreguntas from './pages/encuestas/AddPreguntas';

function App() {
  return (
    <Router>
      <SideBar />

      <div id="detail">
        <Switch>
          <Route path='/' component={Home} />
          <Route path='/encuestas' component={Encuestas} />
          <Route path='/encuesta/new' component={NewEncuesta} />
          <Route path='/encuesta/add/:idEncuesta' component={AddPreguntas} />

        </Switch>

      </div>




    </Router>

  );
}

export default App;
