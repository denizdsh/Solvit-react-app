import Auth from "./Auth"
export default function Login() {
    const loginHandler = (e) => {

    }

    return (
        <Auth type="Login" onSubmit={loginHandler} />
    )
}