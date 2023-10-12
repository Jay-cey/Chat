import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Register = () => {

    const {registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading} = useContext(AuthContext);
    return ( 
        <>
            <form className="flex flex-col gap-3 mt-5 justify-center h-[75vh] items-center" onSubmit={registerUser}>

                <h4 className="text-white text-xl">Register</h4>
                <input type="text" placeholder="Name" className="rounded-md w-1/3 px-3 py-2 text-black outline-none text-sm" onChange={(e) => {updateRegisterInfo({...registerInfo, name: e.target.value})}} />

                <input type="email" placeholder="Email" className="rounded-md w-1/3 px-3 py-2 text-black outline-none text-sm" onChange={(e) => {updateRegisterInfo({...registerInfo, email: e.target.value})}} />

                <input type="password" placeholder="Password" className="rounded-md w-1/3 px-3 py-2 text-black outline-none text-sm" onChange={(e) => {updateRegisterInfo({...registerInfo, password: e.target.value})}} />

                {/* <input type="password" placeholder="Confirm password" className="rounded-md w-1/3 px-3 py-2 text-black outline-none text-sm" /> */}

                <button type="submit" className="bg-orange-400 hover:bg-orange-500 p-2 w-1/3 rounded-md">{isRegisterLoading ? "Creating your account" : "Register"}</button>

                {
                    registerError?.error && (
                        <p className="text-red-400">{registerError?.message}</p>
                    )
                }
            </form>
        </>
);
}
 
export default Register;