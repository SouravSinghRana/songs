import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const useAuth = (code) => {
    const [accessToken, setAccessToken] = useState();
    const [refershToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();


    useEffect(() =>{
        axios.post("http://localhost:3001/login", {
            code,
        }).then(res => {
            console.log("res", res.data);
            setAccessToken(res.data.accessToken);
            setRefreshToken(res.data.refershToken);
            setExpiresIn(res.data.expiresIn);
            window.history.pushState({}, null, "/");
        }).catch(err => {
            console.log("err", err)
            window.location = '/'
        })
    }, [code])

    useEffect(() => {

    }, [refershToken, expiresIn])

    return accessToken;

}
