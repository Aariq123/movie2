import { createContext, useEffect } from "react";
import { useState } from "react";

export const MainContext = createContext()

export const ContextProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [position, setPosition] = useState(0)
  const [menuName, setMenuName] = useState('')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [userData, setUserData] = useState()
  const [checkWatchlistMovies, setCheckWatchlistMovies] = useState()
  const [checkWatchlistTv, setCheckWatchlistTv] = useState()

  const openMenu = (hehe, name) => {
    setMenuOpen(true)
    setPosition(hehe)
    setMenuName(name)
  }

  const closeMenu = (hoho) => {
    if (menuOpen == true) {
      if ((hoho.target.tagName == 'svg' || hoho.target.tagName == 'path') || !hoho.target.className.includes('gay')) {
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


  const postOptions = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmJiMmNiMzI4ZjAzNmQyZTRjNDhjZTNmYWNmY2FkMSIsInN1YiI6IjYzY2NhMDkyZDM2M2U1MDA3OWMxZDgxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mErSuuOgl3ZJs_FFxu6pCndbNMr3YSlMg986wLn54xg'
    }
  }

  const deleteOption = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmJiMmNiMzI4ZjAzNmQyZTRjNDhjZTNmYWNmY2FkMSIsInN1YiI6IjYzY2NhMDkyZDM2M2U1MDA3OWMxZDgxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mErSuuOgl3ZJs_FFxu6pCndbNMr3YSlMg986wLn54xg'
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('user') && userData == undefined) {
      setUserData(JSON.parse(sessionStorage.getItem('user')))
    }
  }, [])


  return (
    <MainContext.Provider
      value={{
        options,
        userData,
        checkWatchlistMovies,
        checkWatchlistTv,
        setCheckWatchlistMovies,
        setCheckWatchlistTv,
        setUserData,
        mobileMenu,
        setMobileMenu,
        setMenuOpen,
        postOptions,
        deleteOption,
        menuOpen,
        menuName,
        closeMenu,
        openMenu,
        position,
        setPosition
      }}>
      {children}
    </MainContext.Provider>
  )
}
