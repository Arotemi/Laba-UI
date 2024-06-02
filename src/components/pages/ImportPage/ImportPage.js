import React, { useState } from 'react';
import './ImportPage.less';

const ImportPage = () => {
    const [file, setFile] = useState(null);
    const [showNotification, setShowNotification] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (file) {
            // Perform file import logic here
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
        } else {
            alert("Please choose a file to import.");
        }
    };

    return (
        <div className="import-container">
            <h1 className="import-title">Import Data</h1>
            <form className="import-form" onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit" className="submit-button">Submit Import</button>
            </form>
            {showNotification && (
                <div className="notification-flyout">
                    <p>Job is running...</p>
                </div>
            )}
        </div>
    );
}

export default ImportPage;