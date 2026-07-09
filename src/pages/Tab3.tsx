import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonLoading,
  IonText,
  IonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./Tab3.css";
import { GithubUser } from "../interfaces/GithubUser";
import { getUserInfo } from "../services/GithubService";
import AuthService from "../services/AuthService";

const Tab3: React.FC = () => {
  const [userInfo, setUserInfo] = useState<GithubUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();

  const loadUserInfo = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const user = await getUserInfo();
      if (user) {
        setUserInfo(user);
      } else {
        setErrorMsg("No se pudo obtener la información del usuario.");
        setShowToast(true);
      }
    } catch (error: any) {
      const msg =
        error.response?.data?.message ||
        "Error al obtener la información del usuario.";
      setErrorMsg(msg);
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    loadUserInfo();
  });

  const handleLogout = () => {
    AuthService.logout();
    history.replace("/login");
    window.location.reload();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonLoading isOpen={loading} message="Cargando información..." />

        {!loading && userInfo && (
          <IonCard>
            <img
              src={userInfo.avatar_url}
              alt="Avatar"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                margin: "20px auto",
                display: "block",
              }}
            />
            <IonCardHeader>
              <IonCardTitle>{userInfo.name || userInfo.login}</IonCardTitle>
              <IonCardSubtitle>@{userInfo.login}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <p>
                <strong>Biografía:</strong>
              </p>
              <p>{userInfo.bio || "Sin biografía"}</p>
              <br />
              <p>
                <strong>Repositorios públicos:</strong>{" "}
                {(userInfo as any).public_repos}
              </p>
              <p>
                <strong>Seguidores:</strong> {(userInfo as any).followers}
              </p>
              <p>
                <strong>Siguiendo:</strong> {(userInfo as any).following}
              </p>
              <br />
              <IonButton expand="block" color="danger" onClick={handleLogout}>
                Cerrar Sesión
              </IonButton>
            </IonCardContent>
          </IonCard>
        )}

        {errorMsg && (
          <IonText color="danger">
            <p style={{ textAlign: "center", marginTop: "2rem" }}>{errorMsg}</p>
          </IonText>
        )}

        {/* 🔹 Toast para errores */}
        <IonToast
          isOpen={showToast}
          message={errorMsg || ""}
          duration={2000}
          color="danger"
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
