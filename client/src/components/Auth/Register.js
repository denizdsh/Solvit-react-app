import Auth from "./Auth"
export default function Register() {
    const registerHandler = (e) => {

    }

    return (
        <Auth type="Register" onSubmit={registerHandler} />
    )
}