import React from 'react';
import { Table } from 'antd';
import { useUser } from '../../../hooks';
import "./profile-container.less";
function ProfilePage() {
    const user = useUser() || { };

    // Define columns for the table
    const columns = [
        {
            title     : 'Attribute',
            dataIndex : 'attribute',
            key       : 'attribute'
        },
        {
            title     : 'Value',
            dataIndex : 'value',
            key       : 'value'
        }
    ];

    // Prepare data for the table
    const data = [
        {
            key       : 'id',
            attribute : 'ID',
            value     : user.id
        },
        {
            key       : 'name',
            attribute : 'Name',
            value     : user.name
        },
        {
            key       : 'gender',
            attribute : 'Gender',
            value     : user.gender || 'N/A'
        },
        {
            key       : 'email',
            attribute : 'Email',
            value     : user.email
        },
        {
            key       : 'birthDate',
            attribute : 'Birth Date',
            value     : user.birthDate
        }
    ];

    return (
        <div className="profile-container">
            <h1 className="profile-title">Profile Information</h1>
            <div className="profile-info">
                <div className="profile-info-item">
                    <span className="info-label">ID:</span>
                    <span className="info-value">{user.id}</span>
                </div>
                <div className="profile-info-item">
                    <span className="info-label">Name:</span>
                    <span className="info-value">{user.name}</span>
                </div>
                <div className="profile-info-item">
                    <span className="info-label">Gender:</span>
                    <span className="info-value">{user.gender || 'N/A'}</span>
                </div>
                <div className="profile-info-item">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{user.email}</span>
                </div>
                <div className="profile-info-item">
                    <span className="info-label">Birth Date:</span>
                    <span className="info-value">{user.birthDate}</span>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
