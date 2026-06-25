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
import { Repository } from "../interfaces/Repository";

interface RepoItemProps<T = any> {
  repository: Repository<T>;
}



const RepoItem: React.FC<RepoItemProps> = ({ repository }) => {
  return (
    <IonItemSliding>
      <IonItem>
        <IonThumbnail slot="start">
          <img alt={repository.name} src={repository.owner.avatar_url} />
        </IonThumbnail>
        <IonLabel>
          <h2>{repository.name}</h2>
          <p>{repository.description}</p>
          <p>Lenguaje: {repository.language}</p>
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
