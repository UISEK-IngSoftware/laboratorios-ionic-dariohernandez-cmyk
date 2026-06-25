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
  useIonViewWillEnter,
} from "@ionic/react";
import "./Tab3.css";
import { getUserInfo } from "../services/GithubService";
import { GithubUser } from "../interfaces/GithubUser";

const Tab3: React.FC = () => {
  const [userInfo, setUserInfo] = useState<GithubUser | null>(null);
  const [loading, setLoading] = useState(false);

  const loadUserInfo = async () => {
    setLoading(true);
    try {
      const userData = await getUserInfo();
      setUserInfo(userData);
    } catch (error) {
      console.error("Error al cargar información del usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    loadUserInfo();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>

        {loading || !userInfo ? (
          <p style={{ textAlign: "center", marginTop: "2rem" }}>
            Cargando información del usuario...
          </p>
        ) : (
          <div className="card-container">
            <IonCard>
              <img
                alt={userInfo.login || "Avatar"}
                src={userInfo.avatar_url || ""}
              />
              <IonCardHeader>
                {/* GithubUser type may not include `name` property; use `login` as fallback */}
                <IonCardTitle>{('name' in userInfo && (userInfo as any).name) || userInfo.login}</IonCardTitle>
                <IonCardSubtitle>{userInfo.login}</IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
