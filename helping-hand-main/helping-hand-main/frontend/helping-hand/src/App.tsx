import { useState, useEffect, useContext } from "react";
import { Header } from "./Components/Header/Header";
import { Home } from "./Components/Home/Home";
import axios from "axios";
import Entry from "../../../backend/functions/src/models/Entry";
import { Route, Routes } from "react-router-dom";
import { FoodForm } from "./Components/FoodForm/FoodForm";
import { Login } from "./Components/Login/Login";
import { Settings } from "./Components/Settings/Settings";
import { DarkThemeContext } from "./Context/DarkThemeContext";
import { AboutAccordion } from "./Components/About/AboutAccordion";

export function App() {
  const [entries, setEntries] = useState<Entry[]>([]);

  // The useEffect hook is used to fetch the entries from the server when the component mounts.
  useEffect(() => {
    fetchEntries();
  }, []);

  // The fetchEntries function is an asynchronous function that makes an HTTP GET request to retrieve the entries from the server using the axios library.
  // It updates the state with the retrieved data by calling setEntries(response.data).
  const fetchEntries = async () => {
    try {
      const response = await axios.get<Entry[]>(
        // "http://127.0.0.1:5001/helping-hand-journal/us-central1/api/entries"
        "https://us-central1-helping-hand-journal.cloudfunctions.net/api/entries"
      );
      setEntries(response.data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  console.log(entries)

  const { darkTheme } = useContext(DarkThemeContext);

  return (
    <div className={`App ${darkTheme ? 'dark' : 'light'}`}>
      {/* Render the Header component */}
      <Header />

      <Routes>
        {/* Route for the Home component with entries prop */}
        <Route path="/" element={<Home entries={entries} />} />
        <Route path="/add-entry" element={<FoodForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<AboutAccordion />} />
      </Routes>
    </div>
  );
}

export default App;
