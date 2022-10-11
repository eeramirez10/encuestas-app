import './App.css';
import { Route, Switch, Router } from 'wouter'
import SideBar from './components/UI/SideBar';
import Home from './pages/home/Home';
import Encuestas from './pages/encuestas/Encuestas';
import NewEncuesta from './pages/encuestas/NewEncuesta';
import AddPreguntas from './pages/encuestas/AddPreguntas';
import StartEncuesta from './pages/encuestas/StartEncuesta';
import { useRoute } from "wouter";
import { Transition } from "react-transition-group";
import FinishEncuesta from './pages/encuestas/FinishEncuesta';

function App() {

  const [match] = useRoute('/encuesta/start/:idEncuesta/:idUsuario');
  const [finish] = useRoute('/encuesta/finish');

  if (match || finish) {
    return (
      <Router>
        <div id="detail">
          <Route path='/encuesta/start/:idEncuesta/:idUsuario' component={StartEncuesta} />
          <Route path='/encuesta/finish' component={ FinishEncuesta } />
     
        </div>
      </Router>

    )

  }


  return (

    <>


      <Router>


        <SideBar />

        <div id="detail">

          <Switch>
            {/* <Route path='/' component={Home} /> */}

            <Route path='/' component={Encuestas} />
            <Route path='/encuesta/new' component={NewEncuesta} />
            <Route path='/encuesta/add/:idEncuesta' component={AddPreguntas} />
            <Route path='/encuesta/start/:idEncuesta/:idUsuario' component={StartEncuesta} />

            <Route path="/:rest*">
              {(params) => `404, Sorry the page ${params.rest} does not exist!`}
            </Route>


          </Switch>


        </div>




      </Router>


    </>




  );
}

export default App;