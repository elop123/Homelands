import { createContext, useEffect } from "react";
import { useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ( {children})=> {

    const[userData, setUserData] = useState()
    const [favorites, setFavorites] = useState([])

    //Hvis user data acess toke findes, så sæt userdata i vores sessionstorage
    useEffect(() => {
        if (userData?.access_token) {
          sessionStorage.setItem("userData", JSON.stringify(userData));
        }
      }, [userData]);
    
     //Hvis komponentet mounter, check om userdata findes som state, hvis ikke så check om usedata
     //findes i sessionstorage, hvis ja, så sæt vore state tl indholdet i sessionstorage 
    useEffect(()=>{
   if(!userData){
    if(sessionStorage.getItem('userData')){
        setUserData(JSON.parse(sessionStorage.getItem('userData')))
    }
   }
    },[])


  // Logout function to clear user data
  const logout = () => {
    setUserData(null);
    sessionStorage.removeItem("userData");
  }

    return(
        <UserContext.Provider value= {{ userData, setUserData, logout , favorites, setFavorites}}>
            {children}
        </UserContext.Provider>
    )
}