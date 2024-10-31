import React from 'react'

function GiftCard({ data }) {
    console.log(data);
    return (
        <div style={{
            backgroundColor: '#ff9',
            margin: 30,
            padding: 30
        }}>
            <h3>
                {data.title}
            </h3>
            <h5>
                {data.body}
            </h5>
        </div>
    )
}

export default GiftCard