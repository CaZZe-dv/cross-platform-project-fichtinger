// src/App.tsx
import { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';

import './theme/variables.css';

import Home from './pages/Home';
import Map from './pages/Map';
import Profile from './pages/Profile';
import About from './pages/About';
import { SplashScreen } from '@capacitor/splash-screen';

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    const hideSplashScreen = async () => {
      await SplashScreen.hide();
    };

    hideSplashScreen();
  }, []);

  return (
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/home" component={Home} exact={true} />
              <Route path="/map" component={Map} exact={true} />
              <Route path="/profile" component={Profile} exact={true} />
              <Route path="/about" component={About} exact={true} />
              <Redirect from="/" to="/home" exact={true} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                Home
              </IonTabButton>
              <IonTabButton tab="map" href="/map">
                Map
              </IonTabButton>
              <IonTabButton tab="profile" href="/profile">
                Profile
              </IonTabButton>
              <IonTabButton tab="about" href="/about">
                About
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
  );
};

export default App;
