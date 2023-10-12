import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {

    const {loginInfo, loginUser, loginError, updateLoginInfo, isLoginLoading} = useContext(AuthContext);
    return ( 
        <>
            <form className="flex flex-col gap-3 mt-5 justify-center h-[70vh] items-center" onSubmit={loginUser}>
                <h4 className="text-white text-xl">Log in</h4>
                <input type="email" placeholder="Email" className="rounded-md w-1/3 px-3 py-1 text-black outline-none" onChange={(e) => updateLoginInfo({...loginInfo, email: e.target.value})} />

                <input type="password" placeholder="Password" className="rounded-md w-1/3 px-3 py-1 text-black outline-none" onChange={(e) => updateLoginInfo({...loginInfo, password: e.target.value})} />

                <button type="submit" className="bg-orange-400 hover:bg-orange-500 p-2 w-1/3 rounded-md">{isLoginLoading ? "Getting you in..." : "Log in"}</button>

                {
                    loginError?.error && (
                        <p>{loginError?.message}</p>
                    )
                }
            </form>
        </>
);
}
 
export default Login;