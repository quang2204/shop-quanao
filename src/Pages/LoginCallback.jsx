import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const LoginCallback = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');
        const user = JSON.parse(decodeURIComponent(searchParams.get('user')));

        if (token && user) {
            localStorage.setItem('auth_token', token);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/dashboard');
        } else {
            navigate('/signin', { state: { error: 'Đăng nhập thất bại' } });
        }
    }, [navigate, searchParams]);

    return <div>Đang xử lý đăng nhập...</div>;
};

export default LoginCallback;