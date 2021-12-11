import { Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth';

export const isUser = (Component) => {
    const WrapperComponent = (props) => {
        const { isAuthenticated } = useAuth();

        return !isAuthenticated
            ? <Navigate to="/all" />
            : <Component {...props} />
    }
    return WrapperComponent
}

export const isGuest = (Component) => {
    const WrapperComponent = (props) => {
        const { isAuthenticated } = useAuth();

        return isAuthenticated
            ? <Navigate to="/" />
            : <Component {...props} />
    }
    return WrapperComponent
}