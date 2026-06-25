import React from "react";
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { Repository } from "../interfaces/Repository";
import RepoItem from "../components/RepoItem";
import "./Tab1.css";
import { fetchRepositories } from "../services/GithubService";
import LoadingSpinner from "../components/LoadingSpinner";

const Tab1: React.FC = () => {
  const [repos, setRepos] = React.useState<Repository<any>[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const loadRepositories = async () => {
    setLoading(true);
    try {
      const reposData = await fetchRepositories();
      setRepos(reposData);
    } catch (error) {
      console.error("Error al cargar repositorios:", error);
    } finally {
      setLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    loadRepositories();
  });

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
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        {loading ? (
          <LoadingSpinner isOpen={loading} />
        ) : (
          <IonList>
            {repos.length > 0 ? (
              repos.map((repo) => (
                <RepoItem key={repo.id} repository={repo} />
              ))
            ) : (
              <p style={{ textAlign: "center", marginTop: "2rem" }}>
                No se encontraron repositorios.
              </p>
            )}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
