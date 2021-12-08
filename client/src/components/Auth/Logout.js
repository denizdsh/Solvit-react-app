import { useEffect } from "react"
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

import Spinner from "../Spinner/Spinner"

export default function Logout() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        logout();
        navigate('/all')
    }, [])
    return (
        <Spinner />
    )
}