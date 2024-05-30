import React, { useEffect, useState } from 'react';
import { Space, Table, Input } from 'antd'; // Import Input from Ant Design
import api from '../../../apiSingleton';
import ProductModal from '../../ui/Modals/ProductModal/ProductModal';
import Button from '../../ui/Button';
import './ContactsPage.less';
import CreateContactModal from '../../ui/Modals/CreateContactModal/CreateContactModal';
import ShareModal from '../../ui/Modals/ShareContactModal/ShareContactModal';
import { useUser } from '../../../hooks';
import { useNavigate } from "react-router-dom";
import {ROUTES} from "../../../constants";

const { Column } = Table;

// eslint-disable-next-line max-lines-per-function
function ContactsPage() {
    const [ contacts, setContacts ] = useState([]);
    const [ currentContact, setCurrentContact ] = useState(null);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isOpenShared, setIsOpenShared ] = useState(false);
    const [ isCreateModalOpen, setIsCreateModalOpen ] = useState(false);
    const [ contact, setContact ] = useState({});
    const [ queryParams, setQueryParams ] = useState({ search: '', sortBy: 'createdAt', orderBy: 'DESC' });
    const navigate    = useNavigate();
    const [ ws, setWs ] = useState(new WebSocket('ws://localhost:8082'));

    const user = useUser() || {};

    async function fetchData() {
        const contactsData = await api.contacts.list(queryParams);

        setContacts(contactsData);
    }

    function handleSocketUpdate(data) {
        const newArr = [ ...contacts ];

        const idx = newArr.findIndex(e => e.id === data.data.id);

        newArr[idx] = data.data;
        setContacts(newArr);
    }

    ws.onmessage = function (event) {
        handleSocketUpdate(JSON.parse(event.data));
    };

    useEffect(() => {
        ws.onopen = (e) => {
            ws.send(JSON.stringify({ type: 'save-connection', userId: user.id }));
        };

        fetchData();
    }, [ queryParams.search, queryParams.sortBy, queryParams.orderBy ]);

    async function handeUpdate(data) {
        await api.contacts.update(data.id, data);
        setIsOpen(false);
        fetchData();
    }

    async function handeCreate(data) {
        await api.contacts.create(data);
        setIsCreateModalOpen(false);
        fetchData();
    }

    async function handeDelete(id) {
        await api.contacts.delete(id);
        fetchData();
    }

    async function handeShare(id) {
        setCurrentContact(id);
        setIsOpenShared(true);
    }

    async function handeShareContact(userId) {
        await api.contacts.share(currentContact, { userId });
        setIsOpenShared(false);
    }

    function handleTableOnChange(p, f, sorter) {
        const { columnKey, order } = sorter;
        const mapOrder = { descend: 'DESC', ascend: 'ASC' };

        setQueryParams((prev) => ({ ...prev, sortBy: columnKey, orderBy: mapOrder[order] }));
    }

    return (
        <div className="contact-container">
            <div className='createDiv'>
                <span className='infoText'>Contact users List</span>
                <div className='buttonGroup'>
                    <Button
                        className='createBtn'
                        type='primary'
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        Create
                    </Button>
                    <Button
                        type='primary'
                        htmlType='submit'
                        className='submit-button shared-button'
                        onClick={() => navigate(ROUTES.SHARED_CONTACTS)}
                    >
                        Shared Users
                    </Button>
                </div>
            </div>



            <div className="contact-table">
            <Table
                    rowKey={'id'}
                    dataSource={contacts}
                    pagination={false}
                    onChange={handleTableOnChange}
                    scroll={{ x: true }}
                    className="custom-table"
                >
                    <Column
                        title='First Name'
                        dataIndex='firstName'
                        key='firstName'
                        sorter
                        onHeaderCell={() => ({ className: 'sortable-header' })}
                    />
                    <Column
                        title='Last Name'
                        dataIndex='lastName'
                        key='lastName'
                        sorter

                    />
                    <Column
                        title='Phone'
                        dataIndex='phone'
                        key='phone'
                        className="notsortable-column"
                    />
                    <Column
                        title='Created At'
                        dataIndex='createdAt'
                        key='createdAt'
                        className="notsortable-column"
                    />
                    <Column
                        title='Action'
                        key='action'
                        render={(_, record) => (
                            <Space size='middle' className="action-buttons">
                                <div className="edit-share-buttons">
                                    <Button type="link" size="small" className="edit-button" onClick={() => { setContact(record); setIsOpen(true); }}>
                                        Edit
                                    </Button>
                                    <Button type="link" size="small" className="share-button" onClick={() => { handeShare(record.id); }}>
                                        Share
                                    </Button>
                                </div>
                                <div className="delete-button">
                                    <Button type="link" size="small" className="delete-button" onClick={() => { handeDelete(record.id); }}>
                                        Delete
                                    </Button>
                                </div>
                            </Space>
                        )}
                    />
                </Table>
            </div>

            <ProductModal
                isOpen={isOpen}
                contactData={contact}
                onClose={() => setIsOpen(false)}
                onOk={handeUpdate}
            />
            <CreateContactModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onOk={handeCreate}
            />

            <ShareModal
                isOpen={isOpenShared}
                contactData={contact}
                onClose={() => setIsOpenShared(false)}
                onOk={handeShareContact}
            />
        </div>
    );
}

export default ContactsPage;
