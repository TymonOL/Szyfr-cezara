
import { useState } from "react";

const alfabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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

function App() {
  const [tekst, setTekst] = useState("HELLO");
  const [przesuniecie, setPrzesuniecie] = useState("3");
  const [wynik, setWynik] = useState("KHOOR");

  function zmienTekst(e) {
    setTekst(e.target.value);
  }

  function zmienPrzesuniecie(e) {
    setPrzesuniecie(e.target.value);
  }

  function szyfrujTekst() {
    setWynik(szyfruj(tekst, przesuniecie));
  }

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

      <button onClick={szyfrujTekst}>
        Szyfruj
      </button>

      <h2>Zaszyfrowany tekst:</h2>

      <h3>{wynik}</h3>
    </div>
  );
}

export default App;
