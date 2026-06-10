import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonThumbnail
} from "@ionic/react";
import "./RepoItem.css";
import React from "react";
import { pencilOutline, trashOutline } from "ionicons/icons";

interface RepoProps {
  name: string;
  description: string;
  language: string;
  avatarUrl: string;
}

const RepoItem: React.FC<RepoProps> = ({ name, description, language, avatarUrl }) => {
  return (
    <IonItemSliding>
      <IonItem>
        <IonThumbnail slot="start">
          <img alt={name} src={avatarUrl} />
        </IonThumbnail>
        <IonLabel>
          <h2>{name}</h2>
          <p>{description}</p>
          <p>Lenguaje: {language}</p>
        </IonLabel>
      </IonItem>

      <IonItemOptions>
        <IonItemOption>
          <IonIcon icon={pencilOutline} slot="icon-only" />
        </IonItemOption>
        <IonItemOption color="danger">
          <IonIcon icon={trashOutline} slot="icon-only" />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default RepoItem;
