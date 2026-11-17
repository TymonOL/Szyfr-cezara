
import { useState } from "react";
import "./App.css";

const alfabet = "aąbcćdeęfghijklłmnńoóprsśtuwyzźż";

function szyfruj(tekst, przesuniecie) {
  let wynik = "";

  for (let i = 0; i < tekst.length; i++) {
    let znak = tekst[i];
    let pozycja = alfabet.indexOf(znak.toUpperCase());

    if (pozycja === -1) {
      wynik += znak;
    } else {
      let nowaPozycja = (pozycja + Number(przesuniecie)) % 26;
      wynik += alfabet[nowaPozycja];
    }
  }

  return wynik;
}

// Komponent jednego okienka
function Okienko({ litera, aktywne }) {
  let pozycja = alfabet.indexOf(litera);

  if (pozycja === -1) {
    pozycja = 0;
  }

  return (
    <div className={aktywne ? "okienko aktywne" : "okienko"}>
      <div
        className="pasek"
        style={{
          transform: `translateY(-${pozycja * 40}px)`
        }}
      >
        {alfabet.split("").map((litera, index) => (
          <div className="litera" key={index}>
            {litera}
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [tekst, setTekst] = useState("HELLO");
  const [przesuniecie, setPrzesuniecie] = useState("3");
  const [licznik, setLicznik] = useState(0);

  function zmienTekst(e) {
    setTekst(e.target.value.toUpperCase());
    setLicznik(0);
  }

  function zmienPrzesuniecie(e) {
    setPrzesuniecie(e.target.value);
    setLicznik(0);
  }

  function nastepnaLitera() {
    if (licznik < tekst.length) {
      setLicznik(licznik + 1);
    }
  }

  let wynik = szyfruj(tekst, przesuniecie);

  return (
    <div>
      <h1>Szyfr Cezara</h1>

      <p>Wpisz tekst:</p>

      <input
        type="text"
        value={tekst}
        onChange={zmienTekst}
      />

      <p>Przesunięcie: {przesuniecie}</p>

      <input
        type="range"
        min="1"
        max="25"
        value={przesuniecie}
        onChange={zmienPrzesuniecie}
      />

      <br /><br />

      <div className="okienka">
        {tekst.split("").map((litera, index) => (
          <Okienko
            key={index}
            litera={index < licznik ? wynik[index] : litera}
            aktywne={index < licznik}
          />
        ))}
      </div>

      <button onClick={nastepnaLitera}>
        Następna litera
      </button>

      <h2>Zaszyfrowany tekst:</h2>

      <h3>{wynik.substring(0, licznik)}</h3>
    </div>
  );
}

export default App;
