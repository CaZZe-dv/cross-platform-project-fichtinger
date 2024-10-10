import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonToast } from '@ionic/react';
import { useState, useEffect } from 'react';

const Profile: React.FC = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [errorToast, setErrorToast] = useState(false);

    useEffect(() => {
        const storedName = localStorage.getItem('name');
        const storedAddress = localStorage.getItem('address');
        const storedEmail = localStorage.getItem('email');
        if (storedName) setName(storedName);
        if (storedAddress) setAddress(storedAddress);
        if (storedEmail) setEmail(storedEmail);
    }, []);

    const saveProfile = () => {
        if (!email.includes('@')) {
            setErrorToast(true);
            return;
        }

        localStorage.setItem('name', name);
        localStorage.setItem('address', address);
        localStorage.setItem('email', email);
        setShowToast(true);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel position="stacked">Name</IonLabel>
                    <IonInput value={name} onIonChange={e => setName(e.detail.value!)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Address</IonLabel>
                    <IonInput value={address} onIonChange={e => setAddress(e.detail.value!)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Email</IonLabel>
                    <IonInput value={email} onIonChange={e => setEmail(e.detail.value!)} />
                </IonItem>
                <IonButton expand="block" onClick={saveProfile}>Save</IonButton>
                <IonToast isOpen={showToast} message="Profile saved!" duration={2000} />
                <IonToast isOpen={errorToast} message="Invalid email address" duration={2000} color="danger" />
            </IonContent>
        </IonPage>
    );
};

export default Profile;
