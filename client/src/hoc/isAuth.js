import { Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth';

export const isOwner = (Component) => {
    const WrapperComponent = (props) => {
        const { isAuthenticated, user } = useAuth();

        return (!isAuthenticated && props._ownerId !== user._id)
            ? <Navigate to="/" />
            : <Component {...props} />
    }
    return WrapperComponent
}

export const isUser = (Component) => {
    const WrapperComponent = (props) => {
        const { isAuthenticated } = useAuth();

        return !isAuthenticated
            ? <Navigate to="/" />
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