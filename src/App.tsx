import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";
import { logoGithub, addCircle, personCircle } from "ionicons/icons";

import Login from "./pages/Login";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import AuthService from "./services/AuthService";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/display.css";
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  const isAuthenticated = AuthService.isAuthenticated();

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          {/* Ruta de login */}
          <Route exact path="/login">
            <Login />
          </Route>

          {/* Tabs protegidas */}
          {isAuthenticated ? (
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/tab1">
                  <Tab1 />
                </Route>
                <Route exact path="/tab2">
                  <Tab2 />
                </Route>
                <Route exact path="/tab3">
                  <Tab3 />
                </Route>
                <Route exact path="/">
                  <Redirect to="/tab1" />
                </Route>
              </IonRouterOutlet>

              <IonTabBar slot="bottom">
                <IonTabButton tab="tab1" href="/tab1">
                  <IonIcon icon={logoGithub} />
                  <IonLabel>Repositorios</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab2" href="/tab2">
                  <IonIcon icon={addCircle} />
                  <IonLabel>Agregar Repo</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab3" href="/tab3">
                  <IonIcon icon={personCircle} />
                  <IonLabel>Perfil</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          ) : (
            <Redirect to="/login" />
          )}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
