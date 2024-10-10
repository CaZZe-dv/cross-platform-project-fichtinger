import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLoading } from '@ionic/react';
import { useIonViewWillEnter } from '@ionic/react';
import { useLogs } from '../services/LoggingService';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {
    const { addLog } = useLogs();
    const [peopleInSpace, setPeopleInSpace] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useIonViewWillEnter(() => {
        addLog('Visited Home Page');
    });

    useEffect(() => {
        const fetchPeopleInSpace = async () => {
            try {
                const response = await fetch('http://api.open-notify.org/astros.json');
                const data = await response.json();
                setPeopleInSpace(data.people);
            } catch (error) {
                console.error('Error fetching people in space:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPeopleInSpace();
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {loading ? (
                    <IonLoading isOpen={loading} message={"Loading astronauts..."} />
                ) : (
                    <IonList>
                        {peopleInSpace.map((person, index) => (
                            <IonItem key={index}>
                                {person.name} ({person.craft})
                            </IonItem>
                        ))}
                    </IonList>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Home;
