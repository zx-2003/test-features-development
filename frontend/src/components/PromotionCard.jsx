export default function ({ promotion }) {

    return (

        <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            margin: '12px',
            gap: '8px',
            display: 'flex',
        }}>
            <div style={{ flex: '1', flexDirection: 'column' }}>
                
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
                    {promotion.restaurant_name}
                </h2>
                <p style={{ margin: 0, fontSize: '14px' }}>
                    {promotion.deal_type}
                </p>
                <p style={{ margin: 0, fontSize: '14px' }}>
                    {promotion.location}
                </p>
                <p style={{ margin: 0, fontSize: '14px' }}>
                    {promotion.active_dates[promotion.active_dates.length - 1]} 
                </p>
                <p>
                    {promotion.more_info_url &&
                        <a href={promotion.more_info_url} style={{ fontSize: '12px' }}>
                            More info
                        </a>
                    }
                </p>
                {/*
                <p>
                    {promotion.full_message_text}
                </p>    strip this message for display instead*/}
                
            </div>
            {promotion.image && (
                <img
                    src={promotion.image}
                    alt={`${promotion.restaurant_name} promotion`} //maybe use another static image here, eventually...
                    style={{ width: "80px", maxWidth: '30vw', height: "auto",  }}
                />
            )}
        </div>

    )
}