import { useEffect } from "react"
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

import Spinner from "../Common/Spinner/Spinner"

export default function Logout() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        logout();
        navigate('/all', { replace: true })
    })
    return (
        <Spinner modalType='spinner'/>
    )
}