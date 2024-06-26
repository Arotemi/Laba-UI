import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import './styles.less';
import { useNavigate } from "react-router-dom";
import Button from '../../Button';
import InputType from '../../Input/Input';
import { ROUTES } from '../../../../../src/constants';

function LoginForm({ isLoading, error, onSubmit, isCodeSent }) {
    const [ data, setData ] = useState({ });
    const navigate    = useNavigate();
    const { t } = useTranslation();


    function handleSubmit(event) {
        event?.preventDefault?.();
        onSubmit(data);
    }

    function handleChange(name, value) {
        setData((prevState) => ({
            ...prevState,
            [name] : name === 'phone_number' ? value.replace(/\D/g, '') : value
        }));
    }

    function getErrorMessage(id) {
        const message = getFieldError(id);

        return message;
    }


    function getFieldError(id) {
        return error?.error?.fields?.[id];
    }


    return (
        <div className='LoginForm'>
            <Form autoComplete='off' onFinish={handleSubmit}>
                <InputType
                    label={'Email'}
                    name='email'
                    error={getErrorMessage('email')}
                    rules={[ { required: true, message: t('error.required') } ]}
                    value={data.email}
                    onChange={handleChange}
                    placeholder={t('auth.placeholder.email')}
                />
                <InputType
                    label={'Password'}
                    name='password'
                    error={getErrorMessage('password')}
                    rules={[ { required: true, message: t('error.required') } ]}
                    type = 'password'
                    value={data.password}
                    onChange={handleChange}
                    placeholder={t('auth.placeholder.password')}
                />
                <Button
                    type='primary'
                    htmlType='submit'
                    loading={isLoading}
                    className='submit-button'
                    onClick={() => {
                        console.log('here');
                    }}
                >
                    Login
                    {/*{isCodeSent ? t('auth.button.login') : t('auth.button.next')} */}
                </Button>
                <span style={{ fontSize: '14px', paddingBottom: '15px', fontWeight: 500  }}>If not registered:</span>
                <Button
                    type='primary'
                    htmlType='submit'
                    loading={isLoading}
                    className='submit-button'
                    onClick={() => navigate(ROUTES.REGISTRATION)}
                >
                    Register
                </Button>

            </Form>
        </div>
    );
}

LoginForm.propTypes = {
    isLoading  : PropTypes.bool,
    error      : PropTypes.object,
    onSubmit   : PropTypes.func,
    isCodeSent : PropTypes.bool
};

export default LoginForm;
