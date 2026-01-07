import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./components/About";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import { LanguageProvider } from "./contexts/LanguageContext";

function App() {
  return (
    <Router>
      <LanguageProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <About />
                  <Portfolio />
                  <Services />
                  <Contact />
                </>
              }
            />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
          <Footer />
        </div>
      </LanguageProvider>
    </Router>
  );
}

export default App;
