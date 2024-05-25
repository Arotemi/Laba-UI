// AboutPage.js
import React, { useState } from 'react';
import { Icons } from '../../../constants/index';
import "./aboutPageStyle.less";
// eslint-disable-next-line import/order
import { Button, Modal } from "antd";

const aboutPageStyle = {
    textAlign    : 'center',
    maxWidth     : '800px',
    margin       : 'auto',
    padding      : '20px',
    border       : '2px solid #ccc',
    borderRadius : '8px'
};

function AboutPage() {
    const [ isModalVisible, setIsModalVisible ] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

return (
        <div className="about-page">
            <Button type="primary" onClick={showModal} className="open-modal-button">
                About the Project
            </Button>
            <Modal
                title="About the Project"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="ok" type="primary" onClick={handleOk} className="ant-modal-btn" >
                        OK
                    </Button>,
                ]}
            >
                <p>This project provides an easy way to manage your contacts. You can:</p>
                <ul>
                    <li>Add new contacts</li>
                    <li>Update contact information</li>
                    <li>Delete contacts quickly</li>
                </ul>
            </Modal>
        </div>
    );
}

export default AboutPage;
