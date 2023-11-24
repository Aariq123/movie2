import { createContext } from "react";
import { useState } from "react";

export const MainContext = createContext()

export const ContextProvider = ({ children }) => {

   const hehe = 'afbb2cb328f036d2e4c48ce3facfcad1'
  const [ menuOpen, setMenuOpen ] = useState(false)
  const [ position, setPosition ] = useState(0)
  const [ menuName, setMenuName ] = useState('')

  const openMenu = (hehe, name) =>{
    setMenuOpen(true)
    setPosition(hehe)
    setMenuName(name)
  }

  const closeMenu = (hoho) =>{
    if(menuOpen == true){
      if(!hoho.target.className.includes('gay')){
        setMenuOpen(false)
      }
   }
  }


   const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmJiMmNiMzI4ZjAzNmQyZTRjNDhjZTNmYWNmY2FkMSIsInN1YiI6IjYzY2NhMDkyZDM2M2U1MDA3OWMxZDgxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mErSuuOgl3ZJs_FFxu6pCndbNMr3YSlMg986wLn54xg'
    }
  };

  const options2 = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmJiMmNiMzI4ZjAzNmQyZTRjNDhjZTNmYWNmY2FkMSIsInN1YiI6IjYzY2NhMDkyZDM2M2U1MDA3OWMxZDgxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mErSuuOgl3ZJs_FFxu6pCndbNMr3YSlMg986wLn54xg'
    }
  };

    return (
        <MainContext.Provider value={{options, options2, menuOpen, menuName, closeMenu, openMenu, position, setPosition}}>
            {children}
        </MainContext.Provider>
    )
}
