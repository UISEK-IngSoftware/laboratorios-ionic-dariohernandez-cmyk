import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonTextarea,
  IonButton,
  IonLoading
} from "@ionic/react";
import "./Tab2.css";
import { useHistory } from "react-router-dom";
import { RepositoryPayLoad } from "../interfaces/RepositoryPayLoad";
import { createRepository } from "../services/GithubService";
import React, { useState } from "react";

const Tab2: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);


   const [repoFormData, setRepoFormData] = useState<RepositoryPayLoad>({
    name: "",
    description: ""
  });

  const setRepoName = (name: string) => {
    setRepoFormData((prev) => ({ ...prev, name }));
  };

  const setRepoDescription = (description: string) => {
    setRepoFormData((prev) => ({ ...prev, description }));
  };

  const saveRepository = async () => {
    if (repoFormData.name.trim() === "") {
      alert("El nombre del repositorio es obligatorio.");
      return;
    }

    try {
      const newRepo = await createRepository(repoFormData);
      if (newRepo) {
        alert(`Repositorio "${newRepo.name}" creado exitosamente.`);
        history.push("/tab1");
      } else {
        alert("Error al crear el repositorio.");
      }
    } catch (error) {
      console.error("Error al crear el repositorio:", error);
      alert("Error al crear el repositorio.");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de Repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container">
          <IonInput
            className="form-field"
            label="Nombre del repositorio"
            labelPlacement="floating"
            placeholder="Ingrese el nombre del repositorio"
            value={repoFormData.name}
            onIonChange={(e) => setRepoName(e.detail.value!)}
          />

          <IonTextarea
            className="form-field"
            label="Descripción"
            labelPlacement="floating"
            placeholder="Ingrese la descripción del repositorio"
            rows={6}
            value={repoFormData.description}
            onIonChange={(e) => setRepoDescription(e.detail.value!)}
          />

          <IonButton
            className="form-field"
            expand="block"
            fill="solid"
            color="primary"
            onClick={saveRepository}
          >
            Guardar
          </IonButton>
        </div>
        <IonLoading isOpen={loading} message="Creando repositorio..." />

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
