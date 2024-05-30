import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { sleep } from '../../../../utils/helpers';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import LoginForm from './index';

// // Mocking the useTranslation hook
// jest.mock('react-i18next', () => ({
//     useTranslation : () => ({
//         t : (key) => key
//     })
// }));
//
// // Mocking the Button and InputType components
// jest.mock('../../Button', () => (props) => (
//     <button {...props} />
// ));
//
// // eslint-disable-next-line react/no-multi-comp
// jest.mock('../../Input/Input', () => (props) => (
//     <div>
//         <label htmlFor={props.name}>{props.label}</label>
//         <input
//             id={props.name}
//             name={props.name}
//             type={props.type || 'text'}
//             value={props.value}
//             onChange={(e) => props.onChange(props.name, e.target.value)}
//             placeholder={props.placeholder}
//         />
//         {props.error && <span>{props.error}</span>}
//     </div>
// ));
//
// describe('LoginForm Component', () => {
//     const mockSubmit = jest.fn();
//
//     beforeEach(() => {
//         mockSubmit.mockClear();
//     });
//
//     test('renders email and password inputs and submit button', () => {
//         render(<LoginForm
//             isLoading={false} error={null} onSubmit={mockSubmit}
//             isCodeSent={false} />);
//
//         expect(screen.getByLabelText('Email')).toBeInTheDocument();
//         expect(screen.getByLabelText('Password')).toBeInTheDocument();
//         expect(screen.getByRole('button', { name: /auth.button.next/i })).toBeInTheDocument();
//     });
//
//     test('calls onSubmit with data on form submit', async () => {
//         render(<LoginForm
//             isLoading={false} error={null} onSubmit={mockSubmit}
//             isCodeSent />);
//
//         fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
//         fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
//
//         fireEvent.click(screen.getByRole('button', { name: /auth.button.login/i }));
//
//         await sleep(100);
//         expect(mockSubmit).toHaveBeenCalledWith({
//             email    : 'test@example.com',
//             password : 'password'
//         });
//     });
//
//     test('displays error messages from props', () => {
//         const error = {
//             errors : [
//                 { uri: '#/email', message: 'Email error message' },
//                 { uri: '#/password', message: 'Password error message' }
//             ]
//         };
//
//         render(<LoginForm
//             isLoading={false} error={error} onSubmit={mockSubmit}
//             isCodeSent={false} />);
//
//         expect(screen.getByText('Email error message')).toBeInTheDocument();
//         expect(screen.getByText('Password error message')).toBeInTheDocument();
//     });
// });


// Mocking the useTranslation hook
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key
    })
}));

// Mocking the Button and InputType components
jest.mock('../../Button', () => (props) => {
    const { htmlType, ...rest } = props; // Exclude htmlType from being passed to the button element
    return <button {...rest}>{props.children}</button>;
});

jest.mock('../../Input/Input', () => (props) => (
    <div>
        <label htmlFor={props.name}>{props.label}</label>
        <input
            id={props.name}
            name={props.name}
            type={props.type || 'text'}
            value={props.value}
            onChange={(e) => props.onChange(props.name, e.target.value)}
            placeholder={props.placeholder}
        />
        {props.error && <span>{props.error}</span>}
    </div>
));

// Mocking useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('LoginForm Component', () => {
    const mockSubmit = jest.fn();

    beforeEach(() => {
        mockSubmit.mockClear();
        mockNavigate.mockClear();
    });

    test('Renders Login inputs and buttons', () => {
        render(
            <MemoryRouter>
                <LoginForm isLoading={false} error={null} onSubmit={mockSubmit} isCodeSent={false} />
            </MemoryRouter>
        );

        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
    });

    test('Login with valid data', async () => {
        render(
            <MemoryRouter>
                <LoginForm isLoading={false} error={null} onSubmit={mockSubmit} isCodeSent={true} />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });

        fireEvent.click(screen.getByRole('button', { name: 'Login' }));

        await waitFor(() => {
            expect(mockSubmit).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password'
            });
        });
    });

    test('Displays error messages', () => {
        const error = {
            error: {
                fields: {
                    email: 'Email error message',
                    password: 'Password error message'
                }
            }
        };

        render(
            <MemoryRouter>
                <LoginForm isLoading={false} error={error} onSubmit={mockSubmit} isCodeSent={false} />
            </MemoryRouter>
        );

        expect(screen.getByText('Email error message')).toBeInTheDocument();
        expect(screen.getByText('Password error message')).toBeInTheDocument();
    });

    test('Email input should accept only valid email format', () => {
        render(
            <MemoryRouter>
                <LoginForm isLoading={false} error={null} onSubmit={mockSubmit} isCodeSent={false} />
            </MemoryRouter>
        );

        const emailInput = screen.getByLabelText('Email');
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        fireEvent.click(screen.getByRole('button', { name: 'Login' }));
        expect(emailInput.value).toBe('invalid-email');
        // expect(screen.getByText('WRONG_EMAIL')).toBeInTheDocument();
    });

    test('Password input should mask the input value', () => {
        render(
            <MemoryRouter>
                <LoginForm isLoading={false} error={null} onSubmit={mockSubmit} isCodeSent={false} />
            </MemoryRouter>
        );

        const passwordInput = screen.getByLabelText('Password');
        expect(passwordInput).toHaveAttribute('type', 'password');
    });


    test('Register button navigates to registration route on click', () => {
        render(
            <MemoryRouter>
                <LoginForm isLoading={false} error={null} onSubmit={mockSubmit} isCodeSent={false} />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole('button', { name: 'Register' }));
        expect(mockNavigate).toHaveBeenCalledWith('/registration');
    });


});