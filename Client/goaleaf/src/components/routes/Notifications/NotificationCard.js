import React from 'react'
import { changeDateFormat1 } from './../../../functions.js'

function NotificationCard(props) {

    return (
        <li className="collection-item">
            <div className="ntf-card-info">
            <span className="ntf-card-info-title">{props.description}</span>
            <span className="ntf-card-info-date">{changeDateFormat1(props.date)}</span>
            </div>
            <div className="ntf-card-btn-con">
                <a className="btn view-ntf-btn" href={props.url}>View</a>
                <button className="btn delete-ntf-btn" onClick={() => props.handleNtfCardDeleted(props.id, props.url)}>Delete</button>
            </div>
        </li>
    )
}

export default NotificationCard;