import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import RepoItem from "../components/RepoItem";

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          <RepoItem
            name="Repositorio 1"
            description="Descripción del repositorio 1"
            language="JavaScript"
            avatarUrl="https://avatars.githubusercontent.com/u/499936030?v=1"
          />

          <RepoItem
            name="Repositorio 2"
            description="Descripción del repositorio 2"
            language="Python"
            avatarUrl="https://avatars.githubusercontent.com/u/499936030?v=1"
          />

          <RepoItem
            name="Repositorio 3"
            description="Descripción del repositorio 3"
            language="Java"
            avatarUrl="https://avatars.githubusercontent.com/u/499936030?v=1"
          />

          <RepoItem
            name="Repositorio 4"
            description="Descripción del repositorio 4"
            language="TypeScript"
            avatarUrl="https://avatars.githubusercontent.com/u/499936030?v=1"
          />

          <RepoItem
            name="Repositorio 5"
            description="Descripción del repositorio 5"
            language="Kotlin"
            avatarUrl="https://avatars.githubusercontent.com/u/499936030?v=1"
          />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
