import { useEffect, useState } from "react";

interface IAuthState {
    is_auth: boolean
}

const AuthCheck = () => {
    let isAuth: IAuthState = {
        is_auth: false
    }

    if(true) {
        isAuth = {
            is_auth: true
        }
    }

    return isAuth
}

export default AuthCheck;