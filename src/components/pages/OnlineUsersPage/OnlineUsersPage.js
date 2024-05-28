import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import api from '../../../apiSingleton';
import Button from '../../ui/Button';
import './OnlineUsersPage.less';

const { Column } = Table;

// eslint-disable-next-line max-lines-per-function
function OnlineUsersPage() {
    const [ contacts, setContacts ] = useState([]);

    async function fetchData() {
        const usersData = await api.profile.listOnlineUsers();

        console.log(usersData);
        setContacts(usersData);
    }

    useEffect(() => {
        fetchData();
    }, [ ]);

    return (
        <div className="contact-container">
            <div className='createDiv'>
                <span className='infoText'>Admin Panel</span>
                <div className='buttonGroup'>
                    {/*<Button*/}
                    {/*    className='createBtn'*/}
                    {/*    type='primary'*/}
                    {/*    onClick={() => setIsCreateModalOpen(true)}*/}
                    {/*>*/}
                    {/*    Create*/}
                    {/*</Button>*/}
                    <Button
                        type='primary'
                        htmlType='submit'
                        className='submit-button shared-button'
                        // onClick={() => navigate(ROUTES.SHARED_CONTACTS)}
                    >
                        Moderate
                    </Button>
                </div>
            </div>

            {/*<div className='filters'>*/}
            {/*    <Input*/}
            {/*        className='filter-input'*/}
            {/*        placeholder={'Search'}*/}
            {/*        allowClear*/}
            {/*        onChange={(e) => {*/}
            {/*            // Handle search logic here*/}
            {/*        }}*/}
            {/*    />*/}
            {/*</div>*/}

            <div className="contact-table">
                <Table
                    // rowKey={'id'}
                    dataSource={contacts} pagination={false}
                    // pagination={false}

                    // scroll={{x: true}}
                    className="custom-table"
                >
                    <Column

                        title='Id' dataIndex='id' key='id'
                        // title='First Name'
                        // dataIndex='firstName'
                        // key='firstName'
                        // sorter
                        onHeaderCell={() => ({className: 'sortable-header'})}
                    />
                    <Column
                        title='Name' dataIndex='name' key='name'
                        // title='Last Name'
                        // dataIndex='lastName'
                        // key='lastName'
                        // sorter

                    />
                    <Column
                        title='Email' dataIndex='email' key='email'
                        // title='Phone'
                        // dataIndex='phone'
                        // key='phone'
                        // className="notsortable-column"
                    />

                    <Column
                        title='Birth Date'
                        dataIndex='birthDate'
                        key='birthDate'
                    />

                    <Column
                        title='Gender' dataIndex='gender' key='gender'
                        itle='Created At'
                        // dataIndex='createdAt'
                        // key='createdAt'
                        // className="notsortable-column"
                    />

                </Table>
            </div>


        </div>
    );
}

export default OnlineUsersPage;
