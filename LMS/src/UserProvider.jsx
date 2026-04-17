import { useState, useEffect } from "react";
import { userContext } from "./UserContext";
import axios from "axios";

export default function userProvider({children}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const res = await axios.get("/api/auth/profile");
      setUser(res.data);
      setLoading(false);
      console.log("Welcome,", res.data.first_name);
    }
    catch (err){
      setUser(null);
      setLoading(false);
      console.log(err.response.data.error);
    }

  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <userContext.Provider value={{user, setUser, loading}}>
      {children}
    </userContext.Provider>
  )
}
