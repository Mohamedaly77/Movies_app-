import './App.css';
import { useEffect, useState } from 'react';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '3797c32ce8msh33e7190672c07f9p1cac1ajsnbc2b0edd5e84',
    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
  },
};

function App() {
  const [endPoint, setEndPoint] = useState('');

  const [container, setContainer] = useState([]);

  const [finalPoint, setFinalPoint] = useState('');

  useEffect(() => {
    FetchMe();
  }, [finalPoint]);

  const FetchMe = () => {
    fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=${endPoint}`, options)
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        setContainer(data.d);
      })
      .catch((err) => console.error(err));
  };
  const handlechange = (e) => {
    setEndPoint(e.target.value);
  };

  const submithandler = (e) => {
    e.preventDefault();
    setFinalPoint(endPoint);
  };
  return (
    <div className="App">
      <form onSubmit={submithandler}>
        <input type="text" value={endPoint} onChange={handlechange} />
        <button type="submit">Submit </button>
      </form>

      {container.map((item, id) => {
        return (
          <div key={item.id}>
            <img
              src={item.i.imageUrl}
              alt="movie"
              style={{
                height: '400px',
                width: '400px',
                border: '2px solid black',
                padding: '10px',
              }}
            />
            <p>{item.l}</p>
            <p>{item.s}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
