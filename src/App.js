import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Movies from "./pages/movies";
import Movie from "./pages/movie";
import Person from "./pages/person";
import { useContext, useEffect, useRef, useState } from "react";
import { MainContext } from "./context/context";
import SearchResults from "./pages/searchResult";
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';
import People from "./pages/people";
import AllReviews from "./pages/allReviews";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Account from "./pages/account";

function App() {
  const { menuOpen, closeMenu, openMenu, position, menuName } = useContext(MainContext)
  const [ submenu, setSubmenu ] = useState([])
  const [ mobileMenu, setMobileMenu]  = useState(false)
  const ref = useRef(null)
  const deviceRef = useRef(null)



  useEffect(()=>{
    if(ref && deviceRef){
        if(deviceRef.current.clientWidth>767){
          ref.current.style.left = position - 40 + 'px'
          if(menuName == 'movie'){
            setSubmenu(['Popular', 'Now playing', 'Top rated', 'Upcoming'])
           }else{
            setSubmenu(['Popular', 'On TV', 'Top rated', 'Airing today'])
           }
        }else{
          ref.current.style.left = '50%'

          if(menuName == 'movie'){
            ref.current.style.top = 0
            setSubmenu(['Popular', 'Now playing', 'Top rated', 'Upcoming'])
          }else{
            ref.current.style.top = 50 + 'px'
            setSubmenu(['Popular', 'On TV', 'Top rated', 'Airing today'])
          }
        }
  }
  },[ref.current, position, deviceRef.current, menuName])


  const mobileMenuClose = (target) => {
    if(deviceRef){
      if(deviceRef.current.clientWidth<767){
        if(mobileMenu){
          setMobileMenu(false)
        }
    }
  } 
}

  return (
    <div ref={deviceRef} onClick={(e)=>mobileMenuClose(e.target)} className="bg-neutral-800 text-white"  onMouseOver={(e)=>closeMenu(e)}>
      <div ref={ref} className={`gay md:left-0 absolute top-14 bg-neutral-800 flex flex-col ${menuOpen ? '' : 'hidden'} z-30`}>
        {submenu.map(item=>{
          return (
            <Link state={{menuName, item:item}} className="gay pr-10 py-4 pr-20 pl-4 hover:bg-white hover:text-black"  key={item} to='/movies'>{item}</Link>
          )
        })}
      </div>
      <nav className="py-4 px-4 sm:py-8 absolute sm:px-12 w-screen flex z-20 justify-between">
        <p className="text-sm sm:text-2xl">
          <Link to='/'>BALLS.COM</Link>
        </p>
        <div className="md:hidden">
          <div className={mobileMenu ? 'hidden' : ''} onClick={()=>setMobileMenu(true)}><MenuIcon sx={{height:33,width:33}}></MenuIcon></div>
          <div className={mobileMenu ? '' : 'hidden'} onClick={()=>setMobileMenu(false)}><CancelIcon sx={{height:33,width:33}}></CancelIcon></div>
        </div>
        <div className={`flex bg-neutral-800 flex-col ${mobileMenu ? 'left-0' : 'right-full'} absolute top-0 md:bg-transparent md:static text-lg font-bold w-1/2 md:flex-row justify-between`}>
          <p className="gay border-1 md:border-0 border-black py-4 px-2 md:p-0 cursor-pointer" onPointerOver={(e)=>openMenu(e.target.offsetLeft, 'movie')}>Movies</p>
          <p className="gay border-1 md:border-0 border-black my-2 md:m-0 py-4 px-2 md:p-0 cursor-pointer" onPointerOver={(e)=>openMenu(e.target.offsetLeft, 'tv')}>TV-shows</p>
          <Link className="py-4 px-2 md:p-0" to='/people'>People</Link>
          <Link className="py-4 px-2 md:p-0" to='/account'><AccountCircleIcon></AccountCircleIcon></Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/movies" element={<Movies></Movies>}></Route>
        <Route path="/people" element={<People></People>}></Route>
        <Route path="/movie/:id" element={<Movie></Movie>}></Route>
        <Route path="/searchresults" element={<SearchResults></SearchResults>}></Route>
        <Route path="/person" element={<Person></Person>}></Route>
        <Route path="/allreviews" element={<AllReviews></AllReviews>}></Route>
        <Route path="/account" element={<Account></Account>}></Route>
      </Routes>

      <footer className="mt-24 bg-black px-10 py-20 flex justify-evenly">
        <div className="flex flex-col">
          <p className="text-2xl m-2">
            <Link to='/'>BALLS.COM</Link>
          </p>
          <p className='m-2'>Movies</p>
          <p className='m-2'>TV-shows</p>
          <Link className='m-2' to='/people'>People</Link>
        </div>
        <div>
          <p className='m-2'>About us</p>
          <p className='m-2'>Contact</p>
          <p className='m-2'>FAQ</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
