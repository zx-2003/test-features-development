import { useEffect, useState } from 'react';

export default function useGoogleMaps() {

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const checkLoaded = () => {
            if (window.google && window.google.maps) {
                setLoaded(true);
            } else {
                setTimeout(checkLoaded, 100);
            }
        };
        checkLoaded();
    }, []);

    return loaded;

}