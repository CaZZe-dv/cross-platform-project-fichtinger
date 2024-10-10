// src/pages/Map.tsx
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
} from '@ionic/react';
import { useIonViewWillEnter } from '@ionic/react';
import { useLogs } from '../services/LoggingService';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

const Map: React.FC = () => {
    const { addLog } = useLogs();
    const [devicePosition, setDevicePosition] = useState<google.maps.LatLngLiteral | null>(null);
    const [issPosition, setIssPosition] = useState<google.maps.LatLngLiteral | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);

    useIonViewWillEnter(() => {
        addLog('Visited Map Page');
    });

    useEffect(() => {
        // Get the user's location
        navigator.geolocation.getCurrentPosition((position) => {
            setDevicePosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        });

        // Fetch the ISS position
        const fetchIssPosition = async () => {
            try {
                const response = await fetch('http://api.open-notify.org/iss-now.json');
                const data = await response.json();
                setIssPosition({
                    lat: parseFloat(data.iss_position.latitude),
                    lng: parseFloat(data.iss_position.longitude),
                });
            } catch (error) {
                console.error('Error fetching ISS position:', error);
            }
        };

        fetchIssPosition();
    }, []);

    const onLoad = (mapInstance: google.maps.Map) => {
        setMap(mapInstance);
    };

    const jumpToDevicePosition = () => {
        if (map && devicePosition) {
            map.panTo(devicePosition);
            map.setZoom(10);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Map</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '400px' }}
                        center={devicePosition || { lat: 0, lng: 0 }}
                        zoom={devicePosition ? 10 : 1}
                        onLoad={onLoad}
                    >
                        {/* Marker for Device Position */}
                        {devicePosition && (
                            <Marker
                                position={devicePosition}
                                title="Your Location"
                                icon={{
                                    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                                }}
                            />
                        )}

                        {/* Marker for ISS Position */}
                        {issPosition && (
                            <Marker
                                position={issPosition}
                                title="ISS Location"
                                icon={{
                                    url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                                }}
                            />
                        )}
                    </GoogleMap>
                </LoadScript>
                <IonButton expand="full" onClick={jumpToDevicePosition}>
                    Jump to My Location
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Map;
