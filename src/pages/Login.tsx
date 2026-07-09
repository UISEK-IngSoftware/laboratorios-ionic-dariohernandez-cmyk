import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonIcon,
  IonText,
} from "@ionic/react";
import { logoGithub } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import AuthService from "../services/AuthService";
import "./Login.css";

const Login: React.FC = () => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = () => {
    setErrorMsg("");

    if (username.trim() === "" || token.trim() === "") {
      setErrorMsg("Debe ingresar el usuario y el token.");
      return;
    }

    const success = AuthService.login(username.trim(), token.trim());

    if (success) {
      console.log("Login correcto");
      console.log("Usuario:", AuthService.getUsername());
      console.log("Token:", AuthService.getToken());

      history.push("/tab1");


      setTimeout(() => {
        window.location.reload();
      }, 100);
    } else {
      setErrorMsg("Usuario o token inválido.");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <div className="login-container">

          <IonIcon
            icon={logoGithub}
            className="login-logo"
          />

          <IonInput
            className="login-field"
            label="Usuario GitHub"
            labelPlacement="floating"
            fill="outline"
            value={username}
            onIonChange={(e) => setUsername(e.detail.value ?? "")}
          />

          <br />

          <IonInput
            className="login-field"
            label="Token Personal"
            labelPlacement="floating"
            fill="outline"
            type="password"
            value={token}
            onIonChange={(e) => setToken(e.detail.value ?? "")}
          />

          <br />

          {errorMsg && (
            <IonText color="danger">
              <p>{errorMsg}</p>
            </IonText>
          )}

          <IonButton
            expand="block"
            onClick={handleLogin}
          >
            Entrar
          </IonButton>

        </div>

      </IonContent>
    </IonPage>
  );
};

export default Login;