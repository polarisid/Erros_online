// App.jsx
import React, { useState } from "react";
import erros from "./erros.json";

function App() {
  const [codigo, setCodigo] = useState("");
  const [resultado, setResultado] = useState(null);

  const buscarErro = () => {
    const resultadoBusca = erros[codigo.toUpperCase()];
    setResultado(resultadoBusca || null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Consulta de Códigos de Erro</h1>
      <input
        type="text"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        placeholder="Digite o código (ex: E201)"
        className="border p-2 rounded w-64 text-center mb-2"
      />
      <button
        onClick={buscarErro}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Buscar
      </button>

      {resultado ? (
        <div className="mt-6 bg-white p-4 rounded shadow-md w-full max-w-md text-left">
          <h2 className="text-xl font-semibold mb-2">Resultado para {codigo.toUpperCase()}:</h2>
          <p><strong>Peças sugeridas:</strong> {resultado.peças.join(", ")}</p>
          <p><strong>Causas:</strong> {resultado.causas.join(", ")}</p>
          <p><strong>Observações:</strong> {resultado.observações}</p>
        </div>
      ) : (
        codigo && (
          <p className="mt-4 text-red-500">Código não encontrado.</p>
        )
      )}
    </div>
  );
}

export default App;