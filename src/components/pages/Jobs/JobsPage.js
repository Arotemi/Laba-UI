import React from 'react';
import './/JobsPage.less';

const JobStatusTable = () => {
    const jobData = [
        {
            id: '1717016195626424',
            type: 'EMAIL_NEWSLETTER',
            status: 'SUCCESS',
            data: '{"body":"Input","emails":["artemtest2@gmail.com"]}',
            result: '250 2.0.0 OK 1717016197 2adb3069b0e04-5296e887a6csm1363311e87.24 - gsmtp',
            createdAt: '2024-06-02T10:12:25.000Z'
        },
        {
            id: '1717016230943132',
            type: 'EMAIL_NEWSLETTER',
            status: 'SUCCESS',
            data: '{"body":"Input","emails":["artemtest@gmail.com"]}',
            result: '250 2.0.0 OK 1717016232 a40c23a62f3a-a62c81795esm754810566b.6 - gsmtp',
            createdAt: '2024-06-02T10:57:19.000Z'
        },

        {
            id: '1717016230943132',
            type: 'IMPORT',
            status: 'SUCCESS',
            data: '{"emails": ["artemtest3@gmail.com"],"name": "scenarioImport","last name" : "Bob","phone": "+27368768235"}',
            result: '250 2.0.0 OK 1717016232 a40c23a62f3a-a62c81795esm754810566b.6 - gsmtp',
            createdAt: '2024-06-02T11:14:58.000Z'
        }
    ];

    return (
        <div className="App">
            <h1>Jobs Administration</h1>
            {/*<input type="text" placeholder="search" />*/}
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Data</th>
                    <th>Result</th>
                    <th>Created At</th>
                </tr>
                </thead>
                <tbody>
                {jobData.map((job) => (
                    <tr key={job.id}>
                        <td>{job.id}</td>
                        <td>{job.type}</td>
                        <td>{job.status}</td>
                        <td>{job.data}</td>
                        <td>{job.result}</td>
                        <td>{job.createdAt}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default JobStatusTable;