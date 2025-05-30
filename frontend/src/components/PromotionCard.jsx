export default function ({ promotion }) {

    return (
        <div style={{ 
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            margin: '12px',
            flexDirection: 'column',
            gap: '8px',  }}>
            <h2 style ={{ margin: 0, fontSize: '16px', fontWeight: 'bold'}}>
                {promotion.restaurant_name}
            </h2>
            <p style = {{ margin: 0, fontSize: '14px'}}>
                {promotion.deal_type}
            </p>
            <p style = {{ margin: 0, fontSize: '14px'}}>
                {promotion.location}
            </p>
            <p style = {{ margin: 0, fontSize: '14px'}}>
                {promotion.active_dates[promotion.active_dates.length - 1]} {/* use last date for now, add filter logic later */}
            </p>
            <p>
                {promotion.more_info_url &&
                    <a href={promotion.more_info_url} style = {{ fontSize: '12px'}}>
                        More info
                    </a>
                }
            </p>
        </div>
    )
}