import './App.css';
import mesa from './mesa.webp'
import { Image } from "react-bootstrap";
import axios from 'axios'; // Import Axios
import { useState, useEffect } from "react"

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

  const [userId, setUserId] = useState(null)
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [loginModalOpen, setLoginModalOpen] = useState(true)
  const [users, setUsers] = useState([]);
  const [games, setGames] = useState([]);
  const [redPlayer1Id, setRedPlayer1Id] = useState("")
  const [redPlayer2Id, setRedPlayer2Id] = useState("")
  const [bluePlayer1Id, setBluePlayer1Id] = useState("")
  const [bluePlayer2Id, setBluePlayer2Id] = useState("")
  const [redPlayer1Goals, setRedPlayer1Goals] = useState(null)
  const [redPlayer2Goals, setRedPlayer2Goals] = useState(null)
  const [bluePlayer1Goals, setBluePlayer1Goals] = useState(null)
  const [bluePlayer2Goals, setBluePlayer2Goals] = useState(null)
  const [showGamesModal, setShowGamesModal] = useState(false);

  const toggleGamesModal = () => setShowGamesModal(!showGamesModal);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://frozen-taiga-97552.herokuapp.com/';
        const response = await axios.get(url + "data/");
        console.log(response.data)
        // Assuming the API returns an object with 'users' and 'games' properties
        setUsers(response.data.users);
        setGames(response.data.games);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]); // Empty dependency array means this effect runs only once after the initial render




  const handleCreateGame = async () => {
    // Logic for handling login
    const url = 'https://frozen-taiga-97552.herokuapp.com/';

  // Data you want to send in the POST request
      const data = {
          red_player1_id: redPlayer1Id,
          red_player2_id: redPlayer2Id,
          blue_player1_id: bluePlayer1Id,
          blue_player2_id: bluePlayer2Id,
          red_player1_goals: redPlayer1Goals,
          red_player2_goals: redPlayer2Goals,
          blue_player1_goals: bluePlayer1Goals,
          blue_player2_goals: bluePlayer2Goals,
          user_id: userId
      };
      try {
        // Make a POST request using Axios
        const response = await axios.post(url + "submit/game/", data);
        console.log('Response:', response.data);
        // Handle the response as needed
        setLoginModalOpen(false);
    } catch (error) {
        console.error('Error making POST request:', error);
        // Handle errors, such as displaying a message to the user
    }
  };

  const handleLogin = async () => {
    // Logic for handling login
    console.log('Login with:', { name, pin });
    const url = 'https://frozen-taiga-97552.herokuapp.com/';

  // Data you want to send in the POST request
      const data = {
          name: name,
          pin: pin // Replace or add key-value pairs as needed
      };
      try {
        // Make a POST request using Axios
        const response = await axios.post(url + "login/", data);
        console.log('Response:', response.data);
        // Handle the response as needed
        setLoginModalOpen(false);
        setUserId(response.data.user_id)
    } catch (error) {
        console.error('Error making POST request:', error);
        // Handle errors, such as displaying a message to the user
    }
  };

  const handleRegister = async () => {
    console.log('Login with:', { name, pin });
    const url = 'https://frozen-taiga-97552.herokuapp.com/';

  // Data you want to send in the POST request
      const data = {
          name: name,
          pin: pin // Replace or add key-value pairs as needed
      };
      try {
        // Make a POST request using Axios
        const response = await axios.post(url + "register/", data);
        console.log('Response:', response.data);
        // Handle the response as needed
        setUserId(response.data.user_id)

    } catch (error) {
        console.error('Error making POST request:', error);
        // Handle errors, such as displaying a message to the user
    }
  };

    return (
      <div className="main-container">
          <div className="overlay-azul">
          </div>
          <div className="overlay-tijolo">
          </div>
          {!userId && (
            <div className="modal">
              <button className="close-btn" onClick={() => setLoginModalOpen(false)}>Close</button>
              <div className="login-container">
                <input
                  type="email"
                  placeholder="nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="pin"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
                <button onClick={handleRegister}>Register</button>
              </div>
            </div>
            )}
          {userId && (
          <div className="main-working-container">
              <div className="player-slots">
                  <div className="player-slot">
                  <select className='select'
                  value={bluePlayer1Id || ""}
                  onChange={(event) => {
                    console.log("Selected value:", event.target.value);
                    setBluePlayer1Id(event.target.value);
                  }}>
                      <option value="">No Player Selected</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                    <input
                    className='golos'
                          type="number"
                          placeholder="Golos"
                          value={bluePlayer1Goals}
                          onChange={(e) => setBluePlayer1Goals(e.target.value)}
                          min="0"
                          max="4"
                        />
                  </div>
                  <div className="player-slot">
                  <select className='select'
                  value={bluePlayer2Id || ""}
                  onChange={(event) => {
                    console.log("Selected value:", event.target.value);
                    setBluePlayer2Id(event.target.value);
                  }}>
                      <option value="" key="">No Player Selected</option>
                      {users.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                    <input
                    className='golos'
                          type="number"
                          placeholder="Golos"
                          value={bluePlayer2Goals}
                          onChange={(e) => setBluePlayer2Goals(e.target.value)}
                          min="0"
                max="4"
                        />
                  </div>
              </div>
              <Image alt="mesa" src={mesa} className="mesa-image"/>
              <div className="player-slots">
                  <div className="player-slot">
                  <select className='select'
                  value={redPlayer1Id || ""}
                  onChange={(event) => {
                    console.log("Selected value:", event.target.value);
                    setRedPlayer1Id(event.target.value);
                  }}>
                      <option value="" key="">No Player Selected</option>
                      {users.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                    <input
                    className='golos'
                          type="number"
                          placeholder="Golos"
                          value={redPlayer1Goals}
                          onChange={(e) => setRedPlayer1Goals(e.target.value)}
                          min="0"
                max="4"
                        />
                  </div>
                  <div className="player-slot">
                  <select className='select'
                   value={redPlayer2Id || ""}
                  onChange={(event) => {
                    console.log("Selected value:", event.target.value);
                    setRedPlayer2Id(event.target.value);
                  }}>
                      <option value="" key="">No Player Selected</option>
                      {users.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                    <input
                    className='golos'
                          type="number"
                          placeholder="Golos"
                          value={redPlayer2Goals}
                          onChange={(e) => setRedPlayer2Goals(e.target.value)}
                          min="0"
                max="4"
                        />
                  </div>
              </div>
              <div className="main-menu-container">
                  <div className="main-menu-list">
                      <div className="main-menu-item">
                        Stats
                      </div>
                      <div className="main-menu-item" onClick={toggleGamesModal}>
                        Jogos
                      </div>
                      <div className="main-menu-item">
                        Verificar Jogos
                      </div>
                  </div>
                  <div className="main-menu-item" onClick={handleCreateGame}>Registar Jogo</div>
              </div>
              {showGamesModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={toggleGamesModal}>&times;</span>
            <h2>Lista de Jogos</h2>
            <div className="games-list">
              {games.map((game, index) => (
                <div key={index} className="game-item">
                  {/* Display game details here, adjust according to your game object structure */}
                  <p>Jogo {index + 1}: {game.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
          </div>
          
          )}
          
      </div>
    );
}

export default App;
