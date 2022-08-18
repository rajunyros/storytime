// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import './App.css';
import Homepage from "./components/Homepage"
import Login from "./components/Login"
import Register from "./components/Register"
import AudioPlayer from './components/audio/AudioPlayer';
import AudioPlayer2 from './components/audio/AudioPlayer2';
import {
  BrowserRouter as Router, 
  Routes, 
  Route

} from "react-router-dom";
import {useState} from 'react';
function App() {
  const [user,setLoginUser] = useState(null)
  // const [loggedIn,setLoggedIn] = useState(false)
  // if (localStorage.getItem("user")) {
  //     setLoggedIn(true)
  //   }

  return (
    <>
      <Router>
         <Routes>
            {/*<Route path="/"  element={<Homepage/>}/>*/}

 {/* <Route path="/" element={ loggedIn? <Homepage setLoginUser={setLoginUser}/>:<Login setLoginUser={setLoginUser}/>}/>
  <Route path="/Login"  element={<Login setLoginUser={setLoginUser}/>}/>*/}
  <Route path="/" element={ <Homepage setLoginUser={setLoginUser}/>}/>
  <Route path="/Login"  element={<Login setLoginUser={setLoginUser}/>}/>


  <Route path="/Register" element={<Register/>}/>
   <Route exact path="/audioplayer" element={<AudioPlayer/>} />
            <Route exact path="/audioplayer2" element={<AudioPlayer2/>} />
</Routes>

      </Router>

    </>
  );
}

export default App;
