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
  IonCardContent
} from "@ionic/react";
import "./Tab3.css";

const Tab3: React.FC = () => {
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

        <div className="card-container">
          <IonCard>
            <img
              alt="Avatar"
              src="https://avatars.githubusercontent.com/u/499936030?v=1"
            />
            <IonCardHeader>
              <IonCardTitle>Darío Hernández</IonCardTitle>
              <IonCardSubtitle>dariohernandez</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              Desarrollador web con experiencia en frontend y backend.
              <p>Apasionado por la tecnología y el código limpio.</p>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
