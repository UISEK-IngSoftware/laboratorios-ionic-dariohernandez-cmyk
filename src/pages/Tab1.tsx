import React from "react";
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonText,
  IonToast,
} from "@ionic/react";
import { Repository } from "../interfaces/Repository";
import RepoItem from "../components/RepoItem";
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchRepositories } from "../services/GithubService";
import "./Tab1.css";

const Tab1: React.FC = () => {
  const [repos, setRepos] = React.useState<Repository<any>[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [showToast, setShowToast] = React.useState(false);

  const loadRepositories = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const reposData = await fetchRepositories();
      setRepos(reposData);
    } catch (error: any) {
      const msg = error.message || "Error al cargar los repositorios.";
      setErrorMsg(msg);
      setShowToast(true);
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
        ) : errorMsg ? (
          <IonText color="danger">
            <p style={{ textAlign: "center", marginTop: "2rem" }}>{errorMsg}</p>
          </IonText>
        ) : repos.length > 0 ? (
          <IonList>
            {repos.map((repo) => (
              <RepoItem key={repo.id} repository={repo} />
            ))}
          </IonList>
        ) : (
          <p style={{ textAlign: "center", marginTop: "2rem" }}>
            No se encontraron repositorios.
          </p>
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

export default Tab1;
