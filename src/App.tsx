import './App.css';
import { Outlet } from "react-router-dom";

function App() {

  return (
    <>
      <header className="py-6 bg-slate-700 mb-9">
        <div className="container text-slate-300 font-semibold text-3xl text-center">
          Jerry's Github
        </div>
      </header>
      <main className='container'>
        <Outlet/>
      </main>
    </>
  )
}

export default App
