// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
// import api from '../../../apiSingleton';
// import { sleep } from '../../../utils/helpers';
// import ContactsPage from './ContactsPage';
//
// // Mock the API module
// jest.mock('../../../apiSingleton', () => ({
//     contacts : {
//         list : jest.fn().mockResolvedValue([
//             { id: 1, firstName: 'John', lastName: 'Doe', phone: '1234567890', createdAt: '2024-05-23T12:00:00Z' }
//             // Add more mock contacts as needed
//         ])
//         // Mock other functions as needed
//     }
// }));
//
// beforeAll(() => {
//     Object.defineProperty(window, 'matchMedia', {
//         writable : true,
//         value    : jest.fn().mockImplementation(query => ({
//             matches             : false,
//             media               : query,
//             onchange            : null,
//             addListener         : jest.fn(), // deprecated
//             removeListener      : jest.fn(), // deprecated
//             addEventListener    : jest.fn(),
//             removeEventListener : jest.fn(),
//             dispatchEvent       : jest.fn()
//         }))
//     });
// });
//
// // Initialize mock store
// const mockStore = configureStore([]);
// const store = mockStore({
//     sessions : {
//         userData : {} // Provide initial state here
//     }
// });
//
// describe('ContactsPage Component', () => {
//     beforeEach(() => {
//         // Clear any mocks and reset state between tests
//         jest.clearAllMocks();
//     });
//
//     test('renders ContactsPage component with correct content', async () => {
//         // Render the component
//         const { getByText } = render(<Provider store={store}>
//             <ContactsPage />
//         </Provider>);
//
//         // Wait for async operations to complete
//         await waitFor(() => expect(api.contacts.list).toHaveBeenCalledTimes(1));
//
//         // Assert that the correct data is displayed
//         expect(getByText('John')).toBeInTheDocument();
//         expect(getByText('Doe')).toBeInTheDocument();
//         expect(getByText('1234567890')).toBeInTheDocument();
//         expect(getByText('2024-05-23T12:00:00Z')).toBeInTheDocument();
//     });
//
//     test('opens create contact modal when "Create" button is clicked', async () => {
//         // Render the component
//         const { getByText } = render(<Provider store={store}>
//             <ContactsPage />
//         </Provider>);
//
//         // Click on the "Create" button
//         fireEvent.click(getByText('Create'));
//
//         // Assert that the create contact modal is rendered
//         await waitFor(() => expect(getByText('Create Contact')).toBeInTheDocument());
//     });
//
//     test('opens edit contact modal when "Edit" link is clicked', async () => {
//         // Render the component
//         const { getByText } = render(<Provider store={store}>
//             <ContactsPage />
//         </Provider>);
//
//         // Wait for async operations to complete
//         await waitFor(() => expect(api.contacts.list).toHaveBeenCalledTimes(1));
//
//         // Click on the "Edit" link in the table row
//         fireEvent.click(getByText('Edit'));
//
//         // Assert that the edit contact modal is rendered
//         await waitFor(() => expect(getByText('Edit contact')).toBeInTheDocument());
//     });
// });


import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import api from '../../../apiSingleton';
import ContactsPage from './ContactsPage';
import {MemoryRouter} from "react-router-dom";

// Mock the API module
jest.mock('../../../apiSingleton', () => ({
    contacts : {
        list : jest.fn().mockResolvedValue([
            { id: 1, firstName: 'Test', lastName: 'Test Value', phone: '1234567890', createdAt: '2024-05-30T12:00:00Z' }
            // Add more mock contacts as needed
        ]),
        create : jest.fn().mockResolvedValue({}),
        update : jest.fn().mockResolvedValue({}),
        delete : jest.fn().mockResolvedValue({}),
        share  : jest.fn().mockResolvedValue({})
    }
}));

beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable : true,
        value    : jest.fn().mockImplementation(query => ({
            matches             : false,
            media               : query,
            onchange            : null,
            addListener         : jest.fn(), // deprecated
            removeListener      : jest.fn(), // deprecated
            addEventListener    : jest.fn(),
            removeEventListener : jest.fn(),
            dispatchEvent       : jest.fn()
        }))
    });
});

// Initialize mock store
const mockStore = configureStore([]);
const store = mockStore({
    sessions : {
        userData : {} // Provide initial state here
    }
});

describe('User list Page Component', () => {
    beforeEach(() => {
        // Clear any mocks and reset state between tests
        jest.clearAllMocks();
    });

    test('renders Users Page component', async () => {
        // Render the component
        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <ContactsPage />
                </MemoryRouter>
            </Provider>
        );

        // Wait for async operations to complete
        await waitFor(() => expect(api.contacts.list).toHaveBeenCalledTimes(1));

        // Assert that the correct data is displayed
        expect(getByText('Test')).toBeInTheDocument();
        expect(getByText('Test Value')).toBeInTheDocument();
        expect(getByText('1234567890')).toBeInTheDocument();
        expect(getByText('2024-05-30T12:00:00Z')).toBeInTheDocument();
    });

    test('Opens create contact flyout after clicking Create button', async () => {
        // Render the component
        const { getByText, getAllByText } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <ContactsPage />
                </MemoryRouter>
            </Provider>
        );

        // Click on the "Create" button, assuming the button text is unique
        const createButtons = getAllByText('Create');
        fireEvent.click(createButtons[0]); // Adjust the index if needed

        // Assert that the create contact modal is rendered
        await waitFor(() => expect(getByText('Create User')).toBeInTheDocument());
    });

    test('Opens edit contact flyout after clicking edit button', async () => {
        // Render the component
        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <ContactsPage />
                </MemoryRouter>
            </Provider>
        );

        // Wait for async operations to complete
        await waitFor(() => expect(api.contacts.list).toHaveBeenCalledTimes(1));

        // Click on the "Edit" link in the table row
        fireEvent.click(getByText('Edit'));

        // Assert that the edit contact modal is rendered
        await waitFor(() => expect(getByText('Edit contact')).toBeInTheDocument());
    });

    // test('opens share contact modal when "Share" link is clicked', async () => {
    //     const { getByText } = render(
    //         <Provider store={store}>
    //             <MemoryRouter>
    //                 <ContactsPage />
    //             </MemoryRouter>
    //         </Provider>
    //     );
    //
    //     await waitFor(() => expect(api.contacts.list).toHaveBeenCalledTimes(1));
    //
    //     fireEvent.click(getByText('Share'));
    //
    //     // await waitFor(() => expect(getByText('Share Contact')).toBeInTheDocument());
    // });

    test('Deletes a contact when "Delete" link is clicked', async () => {
        // Render the component
        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <ContactsPage />
                </MemoryRouter>
            </Provider>
        );

        // Wait for async operations to complete
        await waitFor(() => expect(api.contacts.list).toHaveBeenCalledTimes(1));

        // Click on the "Delete" link in the table row
        fireEvent.click(getByText('Delete'));

        // Assert that the delete contact function is called
        await waitFor(() => expect(api.contacts.delete).toHaveBeenCalledTimes(1));
    });
});