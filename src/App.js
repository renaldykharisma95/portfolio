import "./App.css";
import Navbar from "./components/navbar/navbar";
import About from "./containers/about/about";
import Contacts from "./containers/contacts/contacts";
import Home from "./containers/home/home";
import Projects from "./containers/projects/projects";
import Testimonies from "./containers/testimonies/testimonies";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Testimonies />
      <About />
      <Projects />
      <Contacts />
    </>
  );
}

export default App;
