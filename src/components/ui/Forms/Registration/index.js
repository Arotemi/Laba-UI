/* eslint-disable more/no-hardcoded-configuration-data, max-lines-per-function, more/no-window, no-magic-numbers */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import './styles.less';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import Button from '../../Button';
import InputType from '../../Input/Input';
import DateInput from '../../DateInput';
import Radio from '../../Radio';
import { ROUTES } from '../../../../../src/constants';

function RegistrationForm({ isLoading, error, onSubmit }) {
    const [ data, setData ] = useState({ });
    const { t }             = useTranslation();
    const navigate    = useNavigate();
    function handleSubmit(event) {
        event?.preventDefault?.();
        onSubmit({ ...data });
    }

    function handleChange(name, value) {
        setData((prevState) => ({
            ...prevState,
            [name] : name === 'phone_number' ? value.replace(/\D/g, '') : value
        }));
    }

    function getErrorMessage(id) {
        const message = getFieldError(id)?.message;

        return message;
    }

    function getFieldError(id) {
        return error?.errors?.find(item => item.uri === `#/${id}`);
    }

    return (
        <div className='LoginForm'>
            <Form autoComplete='off' onFinish={handleSubmit}>
                <InputType
                    label={'Email'}
                    name='email'
                    asterisk
                    error={getErrorMessage('email')}
                    rules={[{required: true, message: t('error.required')}]}
                    value={data.email}
                    onChange={handleChange}
                    placeholder={t('auth.placeholder.email')}
                />
                <InputType
                    label={'Password'}
                    name='password'
                    asterisk
                    error={getErrorMessage('password')}
                    rules={[{required: true, message: t('error.required')}]}
                    type='password'
                    value={data.password}
                    onChange={handleChange}
                    placeholder={t('auth.placeholder.password')}
                />
                <InputType
                    label={t('auth.label.name')}
                    name='name'
                    asterisk
                    error={getErrorMessage('name')}
                    rules={[{required: true, message: t('error.required')}]}
                    value={data.name}
                    onChange={handleChange}
                    placeholder={t('auth.placeholder.name')}
                />
                <DateInput
                    name='birthDate'
                    asterisk
                    label='Date of birth'
                    error={getErrorMessage('birthDate')}
                    onChange={handleChange}
                    defaultPickerValue={moment().subtract(18, 'years').startOf('day')}
                />
                <Radio
                    label={'Gender'}
                    asterisk
                    name={'gender'}
                    error={getErrorMessage('gender')}
                    values={['male', 'female']}
                    onChange={handleChange}
                    value={data.gender}
                />
                <Button
                    type='primary'
                    htmlType='submit'
                    loading={isLoading}
                    className='submit-button'
                >
                    {/*{t('auth.button.registration')}*/}
                    Registration
                </Button>

                <span style={{ fontSize: '14px', paddingBottom: '15px', fontWeight: 500 }}>If already registered:</span>
                <Button
                    type='primary'
                    htmlType='submit'
                    loading={isLoading}
                    className='submit-button'
                    onClick={() => navigate(ROUTES.LOGIN)}
                >
                    Login
                </Button>
            </Form>
        </div>
    );
}

RegistrationForm.propTypes = {
    isLoading: PropTypes.bool,
    error: PropTypes.object,
    onSubmit: PropTypes.func,
    isCodeSent: PropTypes.bool
};

export default RegistrationForm;
