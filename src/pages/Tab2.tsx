import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonTextarea,
  IonButton,
  IonLoading,
  IonToast,
  useIonViewWillEnter,
  useIonViewWillLeave,
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
    description: "",
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const setRepoName = (name: string) => {
    setRepoFormData((prev) => ({ ...prev, name }));
  };

  const setRepoDescription = (description: string) => {
    setRepoFormData((prev) => ({ ...prev, description }));
  };

  const saveRepository = async () => {
    if (repoFormData.name.trim() === "") {
      setErrorMsg("El nombre del repositorio es obligatorio.");
      setShowToast(true);
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const newRepo = await createRepository(repoFormData);
      if (newRepo) {
        setSuccessMsg(`Repositorio "${newRepo.name}" creado exitosamente.`);
        setShowToast(true);
        setTimeout(() => history.push("/tab1"), 1500);
      } else {
        setErrorMsg("Error al crear el repositorio.");
        setShowToast(true);
      }
    } catch (error: any) {
      const msg =
        error.response?.data?.message ||
        "Ocurrió un error inesperado al crear el repositorio.";
      setErrorMsg(msg);
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Limpiar mensajes al entrar y salir de la vista
  useIonViewWillEnter(() => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setShowToast(false);
  });

  useIonViewWillLeave(() => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setShowToast(false);
  });

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

        <IonToast
          isOpen={showToast}
          message={errorMsg || successMsg || ""}
          duration={2000}
          color={errorMsg ? "danger" : "success"}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;

