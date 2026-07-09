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
  IonIcon,
} from "@ionic/react";
import { folderOpenOutline, refreshCircleOutline } from "ionicons/icons";
import { Repository } from "../interfaces/Repository";
import RepoItem from "../components/RepoItem";
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchRepositories } from "../services/GithubService";
import "./Tab1.css";

const Tab1: React.FC = () => {
  const [repos, setRepos] = React.useState<Repository<any>[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [toastMsg, setToastMsg] = React.useState<string | null>(null);
  const [toastColor, setToastColor] = React.useState<"success" | "danger">("success");

  // 🔄 Cargar repositorios
  const loadRepositories = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const reposData = await fetchRepositories();
      setRepos(reposData);
    } catch (error: any) {
      const msg = error.message || "Error al cargar los repositorios.";
      setErrorMsg(msg);
      setToastMsg(msg);
      setToastColor("danger");
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
          <IonTitle>
            <IonIcon icon={folderOpenOutline} style={{ marginRight: "8px" }} />
            Repositorios
          </IonTitle>
          <IonIcon
            icon={refreshCircleOutline}
            style={{ float: "right", fontSize: "24px", cursor: "pointer" }}
            onClick={() => {
              if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
              }
              loadRepositories();
            }}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              <IonIcon icon={folderOpenOutline} style={{ marginRight: "8px" }} />
              Repositorios
            </IonTitle>
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
              <RepoItem
                key={repo.id}
                repository={repo}
                onRepoDeleted={() => {
                  setToastMsg(`Repositorio "${repo.name}" eliminado correctamente.`);
                  setToastColor("success");
                  loadRepositories(); // 🔄 refresca lista después de eliminar
                }}
              />
            ))}
          </IonList>
        ) : (
          <p style={{ textAlign: "center", marginTop: "2rem" }}>
            No se encontraron repositorios.
          </p>
        )}

        {/* 🔹 Toast para mensajes de éxito/error */}
        <IonToast
          isOpen={!!toastMsg}
          message={toastMsg || ""}
          duration={2000}
          color={toastColor}
          onDidDismiss={() => setToastMsg(null)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
