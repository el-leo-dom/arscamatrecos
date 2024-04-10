import './App.css';
import mesa from './mesa.webp'
import { Image } from "react-bootstrap";
import axios from 'axios'; // Import Axios

const sendPostRequest = async () => {
  // URL you will define later
  const url = 'https://frozen-taiga-97552.herokuapp.com/';

  // Data you want to send in the POST request
  const data = {
      name: 'teste',
      pin: "1234" // Replace or add key-value pairs as needed
  };

  try {
      // Make a POST request using Axios
      const response = await axios.post(url + "register/", data);
      console.log('Response:', response.data);
      // Handle the response as needed
  } catch (error) {
      console.error('Error making POST request:', error);
      // Handle errors, such as displaying a message to the user
  }
};

function App() {
    return (
      <div className="main-container">
          <div className="overlay-azul">
          </div>
          <div className="overlay-tijolo">
          </div>
          <div className="main-working-container">
              <div className="player-slots">
                  <div className="player-slot">
  
                  </div>
                  <div className="player-slot">
  
                  </div>
              </div>
              <Image alt="mesa" src={mesa} className="mesa-image"/>
              <div className="player-slots">
                  <div className="player-slot">
  
                  </div>
                  <div className="player-slot">
  
                  </div>
              </div>
              <div className="main-menu-container">
                  <div className="main-menu-list">
                      <div className="main-menu-item">
                        Stats
                      </div>
                      <div className="main-menu-item">
                        Procurar
                      </div>
                      <div className="main-menu-item">
                        Verificar Jogos
                      </div>
                  </div>
                  <button onClick={sendPostRequest}>Send POST Request</button>
              </div>
          </div>
      </div>
    );
}

export default App;
