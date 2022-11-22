import './App.css';
import { Route, Switch, Router } from 'wouter'
import SideBar from './components/UI/SideBar';
import Home from './pages/home/Home';
import Encuestas from './pages/encuestas/Encuestas';
import NewEncuesta from './pages/encuestas/NewEncuesta';
import AddPreguntas from './pages/encuestas/AddPreguntas';
import StartEncuesta from './pages/encuestas/StartEncuesta';
import { useRoute } from "wouter";
import FinishEncuesta from './pages/encuestas/FinishEncuesta';
import Resultados from './pages/encuestas/Resultados';
import Usuarios from './pages/usuarios/Usuarios';
import VerEncuesta from './pages/encuestas/VerEncuesta';
import EditarEncuesta from './pages/encuestas/EditarEncuesta';
import { ModalContextProvider } from './context/ModalContext';

function App() {

  const [match] = useRoute('/encuesta/start/:idEncuesta/:idUsuario');
  const [finish] = useRoute('/encuesta/finish');



  if (match || finish) {
    return (
      <Router>
        <div id="detail">
          <Route path='/encuesta/start/:idEncuesta/:idUsuario' component={StartEncuesta} />
          <Route path='/encuesta/finish' component={FinishEncuesta} />

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

            <ModalContextProvider>


              <Route  path='/' component={Encuestas} />
              <Route path='/encuesta/new/add' component={NewEncuesta} />
              <Route path='/encuesta/add/:idEncuesta' component={AddPreguntas} />
              <Route path='/encuesta/start/:idEncuesta/:idUsuario' component={StartEncuesta} />
              <Route path='/encuesta/:idEncuesta' component={VerEncuesta} />
              <Route path='/encuesta/resultados/:idEncuesta' component={Resultados} />
              <Route path='/encuesta/edit/:idEncuesta' component={EditarEncuesta} />
              <Route path='/usuarios' component={Usuarios} />

              


            </ModalContextProvider>


           



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
