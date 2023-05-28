import Register from "./Register";
import axios from "axios";
import { Helmet, HelmetProvider  } from "react-helmet-async";

function App() {
  axios.defaults.baseURL = "http://localhost:4000/"; //temporary

  return (
    <HelmetProvider>
      <Helmet>
        <title>MERN Chat App</title>
      </Helmet>
      <Register />;
    </HelmetProvider>
  );
}

export default App;
