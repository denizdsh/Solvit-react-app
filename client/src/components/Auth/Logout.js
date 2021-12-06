import { useEffect, useContext } from "react"
import { useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext"

import Spinner from "../Spinner/Spinner"

export default function Logout() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        logout();
        navigate('/all')
    }, [])
    return (
        <Spinner />
    )
}