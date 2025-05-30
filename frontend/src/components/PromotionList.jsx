import PromotionCard from './PromotionCard';

export default function PromotionList({ promotions }) {

    return (
        <div>
            {promotions.length === 0 ? (
                <p> 
                    No Promotions Available 
                </p>
            ) : (
                promotions.map((promotion) => (
                    <PromotionCard key={promotion.telegram_message_id} promotion={promotion} />
                ))
            )}
        </div>
    );
}