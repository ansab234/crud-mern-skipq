import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import AddUrl from "./components/Url/AddUrl";
import GetUrl from "./components/Url/GetUrl";
import SignInOutContainer from "./components/User";
import Edit from "./components/Url/EditUrl";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<SignInOutContainer />} exact />
        <Route path="/urls" element={<GetUrl />} exact />
        <Route path="/add" element={<AddUrl />} exact />
        <Route path="/:id" element={<Edit />} exact />
      </Routes>
    </>
  );
}

export default App;
