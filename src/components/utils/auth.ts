import { useEffect, useState } from "react";

interface IAuthState {
    is_auth: boolean
}

const AuthCheck = () => {
    let isAuth: IAuthState = {
        is_auth: false
    }
    const token = localStorage.getItem("token");
    if(token) {
        isAuth = {
            is_auth: true
        }
    }

    return isAuth
}

export default AuthCheck;