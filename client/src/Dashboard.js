import React from 'react';
import { useAuth } from './useAuth';

const Dashboard = ({code}) => {
    const accessToken = useAuth(code);
    return (
        <div>
            <p>Dashboard Code {code } </p>
        </div>
    )
}

export default Dashboard
