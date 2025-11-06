import {Routes,Route,Link} from 'react-router-dom'

function Link1() {
    function Home(){
        return <h1>Home Page</h1>
    }
    function About(){
        return <h1>About Page</h1>
    }
  return (
    <div>
        <nav>
            <Link to="/">HOME</Link>
            <Link to="/about">ABOUT</Link>
        </nav>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
        </Routes>
    </div>
  )
}

export default Link1