import { useEffect, useState } from 'react';
import PromotionList from '../components/PromotionList';
import { promotionsApi } from '../api/promotion'
import NavigationBar from '../components/NavBar';

export default function Promotion() {

    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const LoadPromotions = async () => {
            try {
                const results = await promotionsApi.getAllPromotions();
                console.log("Fetched Promotion:", results.data);
                setPromotions(results.data);
            } catch (error) {
                console.error('Error fetching promotions', error);
            } finally {
                setLoading(false);
            }
        };

        LoadPromotions();
    }, []);

    if (loading) return <p>Loading...</p>

    return (
        <div>
            <NavigationBar />
            <h1>
                Food Promotions
            </h1>
            <PromotionList promotions={promotions} />
        </div>
    )
}