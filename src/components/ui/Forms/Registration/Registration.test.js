import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import moment from 'moment';
import RegistrationForm from './index';

// Mocking the useTranslation hook
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key
    })
}));

// Mocking the Button, InputType, DateInput, and Radio components
jest.mock('../../Button', () => (props) => {
    const { htmltype, ...rest } = props; // Exclude htmlType from being passed to the button element
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

jest.mock('../../DateInput', () => (props) => (
    <div>
        <label htmlFor={props.name}>{props.label}</label>
        <input
            id={props.name}
            name={props.name}
            type="date"
            onChange={(e) => props.onChange(props.name, e.target.value)}
        />
        {props.error && <span>{props.error}</span>}
    </div>
));

jest.mock('../../Radio', () => (props) => (
    <div>
        <label>{props.label}</label>
        {props.values.map(value => (
            <label key={value}>
                <input
                    type="radio"
                    name={props.name}
                    value={value}
                    checked={props.value === value}
                    onChange={() => props.onChange(props.name, value)}
                />
                {value}
            </label>
        ))}
        {props.error && <span>{props.error}</span>}
    </div>
));

// Mocking useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('RegistrationForm Component', () => {
    const mockSubmit = jest.fn();

    beforeEach(() => {
        mockSubmit.mockClear();
        mockNavigate.mockClear();
    });

    test('Renders Registration inputs and buttons', () => {
        render(
            <MemoryRouter>
                <RegistrationForm isLoading={false} error={null} onSubmit={mockSubmit} />
            </MemoryRouter>
        );

        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Date of birth')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Registration' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });

    test('Registration with valid data', async () => {
        render(
            <MemoryRouter>
                <RegistrationForm isLoading={false} error={null} onSubmit={mockSubmit} />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText('auth.label.name'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText('Date of birth'), { target: { value: '2000-01-01' } });
        fireEvent.click(screen.getByLabelText('male'));

        fireEvent.click(screen.getByRole('button', { name: 'Registration' }));

        await waitFor(() => {
            expect(mockSubmit).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password123',
                name: 'John Doe',
                birthDate: '2000-01-01',
                gender: 'male'
            });
        });
    });

    test('Displays error messages', () => {
        const error = {
            errors: [
                { uri: '#/email', message: 'Email error message' },
                { uri: '#/password', message: 'Password error message' },
                { uri: '#/name', message: 'Name error message' },
                { uri: '#/birthDate', message: 'BirthDate error message' },
                { uri: '#/gender', message: 'Gender error message' }
            ]
        };

        render(
            <MemoryRouter>
                <RegistrationForm isLoading={false} error={error} onSubmit={mockSubmit} />
            </MemoryRouter>
        );

        expect(screen.getByText('Email error message')).toBeInTheDocument();
        expect(screen.getByText('Password error message')).toBeInTheDocument();
        expect(screen.getByText('Name error message')).toBeInTheDocument();
        expect(screen.getByText('BirthDate error message')).toBeInTheDocument();
        expect(screen.getByText('Gender error message')).toBeInTheDocument();
    });

    test('Login button navigates to login route on click', () => {
        render(
            <MemoryRouter>
                <RegistrationForm isLoading={false} error={null} onSubmit={mockSubmit} />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole('button', { name: 'Login' }));
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
});