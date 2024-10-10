// src/pages/About.tsx
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonModal, IonList, IonItem, IonButtons, IonBackButton } from '@ionic/react';
import { useState } from 'react';
import { useLogs } from '../services/LoggingService';
import { useIonViewWillEnter } from '@ionic/react';
import packageJson from '../../package.json';

const About: React.FC = () => {
    const { logs, addLog, clearLogs } = useLogs();
    const [showModal, setShowModal] = useState(false);

    useIonViewWillEnter(() => {
        addLog('Visited About Page');
    });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>About</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <h2>App Version: {packageJson.version}</h2>
                <img src="/assets/bild.jpg" alt="Profile" width="100" />
                <p>Developer: Matthias Fichtinger</p>
                <p>Born: 09.01.2003</p>
                <p>Living in: Lower Austria</p>

                <IonButton onClick={() => setShowModal(true)}>Show Logs</IonButton>
                <IonButton color="danger" onClick={clearLogs}>Clear Logs</IonButton>

                <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
                    <IonContent>
                        <IonHeader>
                            <IonToolbar>
                                <IonTitle>Logs</IonTitle>
                            </IonToolbar>
                        </IonHeader>
                        <IonList>
                            {logs.map((log, index) => (
                                <IonItem key={index}>{log}</IonItem>
                            ))}
                        </IonList>
                        <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    );
};

export default About;
