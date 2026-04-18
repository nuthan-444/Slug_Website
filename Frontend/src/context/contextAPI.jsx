import { useState , useEffect , useContext , createContext } from "react";


const ContextAPI = createContext();



export const ContextProvider = ({children}) => {


    // storing email
    const [email,setEmail] = useState("");
    // storing email




    //   Storing/Getting user data in/From localstorage
    const [userData,setUserData] = useState(() => {
        let getUserData = JSON.parse(localStorage.getItem("userData"));
        return getUserData ? getUserData : null;
    });

useEffect(() => {
    localStorage.setItem("userData",JSON.stringify(userData));
},[userData]);
    //  Storing/Getting user data in/From localstorage






    //   Storing/Getting Token in/From localstorage
    const [token,setToken] = useState(() => {
        let getToken = JSON.parse(localStorage.getItem("token"));
        return getToken ? getToken : null;
    })


useEffect(() => {
    localStorage.setItem("token",JSON.stringify(token));
},[token]);
    //   Storing/Getting Token in/From localstorage









    // storing all events in localStorage
    const [allEvents,setAllEvents] = useState([]);
    // storing all events in localStorage




    const [showAnimation,setShowAnimation] = useState(() => {
        let getData = JSON.parse(sessionStorage.getItem("showAnimation"));
        return getData ? getData :  true;
    })

useEffect(() => {
    sessionStorage.setItem("showAnimation",JSON.stringify(true));
},[showAnimation]);



return (
    <ContextAPI.Provider value={
        {
            email,setEmail,
            userData,setUserData,
            token,setToken,
            allEvents,setAllEvents,
            showAnimation,setShowAnimation
        }
    }>
        {children}
    </ContextAPI.Provider>
)

}


export const useContextAPI = () => useContext(ContextAPI)