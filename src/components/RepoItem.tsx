import React, { useState } from "react";
import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonThumbnail,
  IonAlert,
} from "@ionic/react";
import { createOutline, trashSharp } from "ionicons/icons";
import { Repository } from "../interfaces/Repository";
import { useHistory } from "react-router-dom";
import { deleteRepository } from "../services/GithubService";

interface RepoItemProps<T = any> {
  repository: Repository<T>;
  onRepoDeleted?: () => void;
}

const RepoItem: React.FC<RepoItemProps> = ({ repository, onRepoDeleted }) => {
  const history = useHistory();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleEdit = () => {
    history.push({
      pathname: "/tab2",
      state: { repoToEdit: repository },
    });
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const owner = repository.owner?.login;
      const repo = repository.name;

      if (!owner || !repo) {
        alert("No se pudo obtener el propietario o nombre del repositorio.");
        return;
      }

      const success = await deleteRepository(owner, repo);

      if (success) {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
        setShowDeleteAlert(false);

        if (onRepoDeleted) {
          onRepoDeleted(); // 🔄 refresca lista en Tab1
        }
      } else {
        alert("GitHub no permitió eliminar el repositorio.");
      }
    } catch (error) {
      console.error("Error eliminando repositorio:", error);
      alert("Error inesperado al eliminar el repositorio.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <IonItemSliding>
      <IonItem>
        <IonThumbnail slot="start">
          <img alt={repository.name} src={repository.owner.avatar_url} />
        </IonThumbnail>
        <IonLabel>
          <h2>{repository.name}</h2>
          <p>{repository.description || "Sin descripción"}</p>
          <p>Lenguaje: {repository.language || "No especificado"}</p>
          <p>Owner: {repository.owner.login}</p>
        </IonLabel>
      </IonItem>

      <IonItemOptions>
        <IonItemOption color="primary" onClick={handleEdit}>
          <IonIcon icon={createOutline} slot="icon-only" />
        </IonItemOption>
        <IonItemOption color="danger" onClick={() => setShowDeleteAlert(true)}>
          <IonIcon icon={trashSharp} slot="icon-only" />
        </IonItemOption>
      </IonItemOptions>

      <IonAlert
        isOpen={showDeleteAlert}
        header="Confirmar eliminación"
        message={`¿Estás seguro de eliminar "${repository.name}"?`}
        buttons={[
          {
            text: "Cancelar",
            role: "cancel",
            handler: () => setShowDeleteAlert(false),
          },
          {
            text: deleting ? "Eliminando..." : "Eliminar",
            handler: () => handleDelete(),
          },
        ]}
        onDidDismiss={() => setShowDeleteAlert(false)}
      />
    </IonItemSliding>
  );
};

export default RepoItem;
