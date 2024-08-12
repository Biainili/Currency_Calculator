import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const fetchData = async (base, targets) => {
    try {
      const apiKey = "cf9299883fc5d039ea155230";
      const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${base}`;
      const response = await fetch(url);
      const data = await response.json();
      const rates = targets.reduce((acc, target) => {
        acc[target] = data.conversion_rates[target];
        return acc;
      }, {});
      return rates;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return {};
    }
  };

  const [rates, setRates] = useState({});
  const [base, setBase] = useState("USD");
  const [target, setTarget] = useState("USD");
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  // Animation START
  useEffect(() => {
    function createElement() {
      const dollar = document.createElement("div");
      dollar.className = "dollar";
      dollar.textContent = "$";
      dollar.style.left = `${Math.random() * 100}vw`;
      document.body.appendChild(dollar);

      setTimeout(() => {
        if (dollar.parentNode) {
          dollar.remove();
        }
      }, 4500);
    }

    const intervalId = setInterval(createElement, 100);
    return () => clearInterval(intervalId);
  }, []);
  // Animation END

  useEffect(() => {
    const getRates = async () => {
      const targets = ["USD", "EUR", "GBP", "CHF"];
      const data = await fetchData(base, targets);
      setRates(data);
    };
    getRates();
  }, [base]);

  const handleBaseChange = (e) => {
    setBase(e.target.value);
  };

  const handleTargetChange = (e) => {
    setTarget(e.target.value);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (inputValue && rates[target]) {
      const output = (parseFloat(inputValue) * rates[target]).toFixed(2);
      setOutputValue(output);
    } else {
      setOutputValue("");
    }
  }, [inputValue, target, rates]);

  return (
    <div className="App">
      <h1>Курс Валют</h1>
      <div className="raet_contaiber">
        <div className="i_have">
          <label htmlFor="first_Value"> У меня есть</label>
          <select id={"first_Value"} onChange={handleBaseChange}>
            <option value={"USD"}>USD</option>
            <option value={"EUR"}>EUR</option>
            <option value={"GBP"}>GBP</option>
            <option value={"CHF"}>CHF</option>
          </select>
          <input
            id={"in_id"}
            placeholder="00.0"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        <div className="line"></div>
        <div>
          <div className="i_want">
            <label htmlFor="second_Value"> Я Хочу</label>
            <select id={"second_Value"} onChange={handleTargetChange}>
              <option value={"USD"}>USD</option>
              <option value={"EUR"}>EUR</option>
              <option value={"GBP"}>GBP</option>
              <option value={"CHF"}>CHF</option>
            </select>
            <input
              id={"out_id"}
              placeholder="00.0"
              value={outputValue}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
