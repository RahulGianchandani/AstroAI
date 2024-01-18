import React, { useState, CSSProperties } from 'react';
import './App.css';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "50px auto",
};

const App = () => {
  const [birthDate, setBirthDate] = useState('');
  const [astroInfo, setAstroInfo] = useState('');
  const [astroImg, setAstroImg] = useState('');
  const [loading, setLoading] = useState(false);

console.log(process.env.REACT_APP_SECRET_KEY);
  const generateAstroInfo = () => {
    // Here, you would make an API call to ChatGPT API to get personalized astrological insights
    // For simplicity, let's assume a placeholder result
    setAstroImg('')
    setAstroInfo('')
    setLoading(true)
    axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Give me astrological insights' },
          { role: 'user', content: `My birthdate is ${birthDate}` },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
        },
      }
    ).then((res) => {
      setLoading(false)
      console.log("res", res);
      setAstroInfo(res.data.choices[0].message.content);
    });
    axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt: `Generate image, based on astrological insights considering my birthdate ${birthDate}`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
        },
      }
    ).then((res) => {
      console.log("res", res);
      setAstroImg(res?.data?.data?.[0].url);
    });



  };
  console.log("astroInfo", astroInfo);
  return (
    <div className="bg-gray-100 min-h-screen mainDiv">
      {/* Header */}
      <header className="bg-blue-500 text-white py-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Astrology & Spirituality App</h1>
        </div>
      </header>

      {/* Main Content */}

      <main className="container mx-auto my-8 min-h-screen">
        <div className="bg-white p-8 rounded-md shadow-md glassBG">
          <h2 className="text-2xl font-bold mb-6">Astrology Profile Generator</h2>

          {/* Form */}
          <form>
            <label className="block mb-4" htmlFor="birthDate">
              Enter your birth date:
            </label>
            <input
              type="date"
              id="birthDate"
              className="border border-gray-300 p-2 mb-4"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-full" onClick={generateAstroInfo}
              type="button"
            >
              Generate Profile
            </button>
          </form>

          {/* Result */}
          {loading ? <ClipLoader color="#36d7b7" cssOverride={override} size={60} /> :
            <>
              <div className="mt-6">
                <p className="text-lg mb-4">
                  Your astrological insights will be displayed here.
                </p>
                {astroInfo}
              </div>
              {astroImg && (
                <img

                  src={astroImg}
                  alt="Generated Astro Image"
                  className="mt-4 rounded-lg shadow-md w-full "
                />
              )}
            </>
          }
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-500 text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Astrology & Spirituality App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
