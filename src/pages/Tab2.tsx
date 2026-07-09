import React, { useState, useEffect } from "react";
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
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import "./Tab2.css";
import { RepositoryPayLoad } from "../interfaces/RepositoryPayLoad";
import { createRepository, updateRepository } from "../services/GithubService";

const Tab2: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ repoToEdit?: any }>();
  const repoToEdit = location.state?.repoToEdit;

  const [loading, setLoading] = useState(false);
  const [repoFormData, setRepoFormData] = useState<RepositoryPayLoad>({
    name: "",
    description: "",
  });
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [toastColor, setToastColor] = useState<"success" | "danger">("success");

  useEffect(() => {
    if (repoToEdit) {
      setRepoFormData({
        name: repoToEdit.name,
        description: repoToEdit.description || "",
      });
    }
  }, [repoToEdit]);

  const saveRepository = async () => {
    if (repoFormData.name.trim() === "") {
      setToastMsg("El nombre del repositorio es obligatorio.");
      setToastColor("danger");
      return;
    }

    setLoading(true);
    setToastMsg(null);

    try {
      if (repoToEdit) {
        // 🔹 Editar repositorio (solo descripción)
        const response = await updateRepository(
          repoToEdit.owner.login,
          repoToEdit.name,
          { description: repoFormData.description }
        );

        if (response) {
          setToastMsg(`Repositorio "${repoFormData.name}" actualizado correctamente.`);
          setToastColor("success");
        } else {
          setToastMsg("No se pudo actualizar el repositorio.");
          setToastColor("danger");
          return;
        }
      } else {
        // 🔹 Crear nuevo repositorio
        const response = await createRepository({
          name: repoFormData.name,
          description: repoFormData.description,
        });

        if (response) {
          setToastMsg(`Repositorio "${repoFormData.name}" creado correctamente.`);
          setToastColor("success");
          setRepoFormData({ name: "", description: "" }); // 🧹 limpia campos
        } else {
          setToastMsg("Error al crear el repositorio.");
          setToastColor("danger");
          return;
        }
      }

      // 🔄 Redirige a la lista después de 1.5 segundos
      setTimeout(() => history.push("/tab1"), 1500);
    } catch (error) {
      console.error(error);
      setToastMsg("Error al guardar el repositorio.");
      setToastColor("danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{repoToEdit ? "Editar Repositorio" : "Agregar Repositorio"}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="form-container">
          <IonInput
            className="form-field"
            label="Nombre del repositorio"
            labelPlacement="floating"
            value={repoFormData.name}
            onIonChange={(e) =>
              setRepoFormData({ ...repoFormData, name: e.detail.value! })
            }
            disabled={!!repoToEdit} // 🔒 bloquea el nombre en modo edición
          />
          <IonTextarea
            className="form-field"
            label="Descripción"
            labelPlacement="floating"
            rows={6}
            value={repoFormData.description}
            onIonChange={(e) =>
              setRepoFormData({ ...repoFormData, description: e.detail.value! })
            }
          />
          <IonButton expand="block" color="primary" onClick={saveRepository}>
            {repoToEdit ? "Guardar cambios" : "Crear repositorio"}
          </IonButton>
        </div>

        <IonLoading isOpen={loading} message="Guardando..." />

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

export default Tab2;
