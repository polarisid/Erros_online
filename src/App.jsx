import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import sintomas from "./sintomas.json";
import erros from "./erros.json";
import painelGeladeira from "./painel_geladeira.png";
import sintomasGeladeira from "./erros_geladeira.json";

const piscar = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #f8fafc, #e2e8f0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem;
  font-family: sans-serif;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1d4ed8;
`;

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.$active ? "#1d4ed8" : "#cbd5e1")};
  color: ${(props) => (props.$active ? "white" : "#1e293b")};
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
`;


const ImageWrapper = styled.div`
  position: relative;
  background-image: url(${painelGeladeira});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 320px;
  height: 500px;
  margin-bottom: 1.5rem;
`;

const IconButton = styled.button`
  position: absolute;
  background: ${(props) => (props.selected ? "#1d4ed8" : "rgba(59, 130, 246, 0.5)")};
  border: 2px solid white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transform: translate(-50%, -50%);
  ${(props) =>
    props.selected &&
    css`
      animation: ${piscar} 1s infinite;
    `}
`;


const Button = styled.button`
  background-color: #2563eb;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
  &:hover {
    background-color: #1d4ed8;
  }
`;

const ResultBox = styled.div`
  margin-top: 1.5rem;
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 36rem;
  text-align: left;
  line-height: 1.6;
`;

const Section = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.h3`
  font-weight: bold;
  margin-bottom: 0.25rem;
  color: #1f2937;
`;

const Content = styled.p`
  margin-left: 1rem;
  color: #374151;
`;

const List = styled.ul`
  margin-left: 1.25rem;
  color: #374151;
  list-style: disc;
`;

const Select = styled.select`
  border: 1px solid #cbd5e1;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const Footer = styled.footer`
  margin-top: 2rem;
  font-size: 0.875rem;
  color: #64748b;
`;

const IconLabel = styled.div`
  font-size: 0.9rem;
  color: #1e293b;
  margin-top: -1rem;
  margin-bottom: 1.5rem;
`;

function App() {
  const [produto, setProduto] = useState("lavadora");
  const [resultado, setResultado] = useState(null);
  const [iconeSelecionado, setIconeSelecionado] = useState("");
  const [codigo, setCodigo] = useState("");
  const [sintoma, setSintoma] = useState("");

  const iconesGeladeira = [
    { id: "wifi", top: 160, left: 115, label: "Conectividade Wi-Fi" },
    { id: "gota", top: 160, left: 215, label: "Função Power Cool / Gelo" },
    { id: "folha", top: 205, left: 115, label: "Modo Econômico / Eco" },
    { id: "copo", top: 205, left: 220, label: "Dispensador de Água" },
    { id: "1c", top: 160, left: 165, label: "Temperatura 1°C" },
    { id: "2c", top: 205, left: 165, label: "Temperatura 2°C" },
    { id: "3c", top: 250, left: 165, label: "Temperatura 3°C" },
    { id: "4c", top: 295, left: 165, label: "Temperatura 4°C" },
    { id: "7c", top: 340, left: 165, label: "Temperatura 7°C" }
  ];

  const sintomasFiltrados = Object.entries(sintomas)
    .filter(([_, val]) => val.tipo === produto)
    .map(([key]) => key);

    const buscarPorIcone = (id) => {
      const dado = sintomasGeladeira[id];
      if (!dado) {
        alert("Nenhum dado encontrado para esse ícone.");
        return;
      }
      setResultado(dado);
    };
    

  const buscarPorSintoma = () => {
    const dado = sintomas[sintoma];
    setResultado(dado || null);
  };

  const buscarPorCodigo = () => {
    const dado = erros[codigo.toUpperCase()];
    setResultado(dado || null);
  };

  const labelAtual = iconesGeladeira.find((i) => i.id === iconeSelecionado)?.label;

  return (
    <Container>
      <Title>Consulta de Erro ou Sintoma</Title>

      <Tabs>
      <Tab $active={produto === "lavadora"} onClick={() => setProduto("lavadora")}>Lavadora</Tab>
<Tab $active={produto === "ar"} onClick={() => setProduto("ar")}>Ar-Condicionado</Tab>
<Tab $active={produto === "tv"} onClick={() => setProduto("tv")}>TV</Tab>
<Tab $active={produto === "geladeira"} onClick={() => setProduto("geladeira")}>Geladeira</Tab>

      </Tabs>

      {produto === "geladeira" ? (
        <>
          <ImageWrapper>
          {iconesGeladeira.map((icon) => (
  <IconButton
    key={icon.id}
    selected={iconeSelecionado === icon.id}
    style={{ top: icon.top, left: icon.left }}
    onClick={() => {
      setIconeSelecionado(icon.id);
      buscarPorIcone(icon.id);
    }}
  />
))}
          </ImageWrapper>
          {iconeSelecionado && <IconLabel>Ícone selecionado: {labelAtual}</IconLabel>}
         
        </>
      ) : (
        <>
          <Select value={sintoma} onChange={(e) => setSintoma(e.target.value)}>
            <option value="">Selecione um sintoma</option>
            {sintomasFiltrados.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </Select>

          <Button onClick={buscarPorSintoma}>Buscar por Sintoma</Button>

          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Digite o código (ex: C101)"
            style={{ padding: "0.5rem", marginBottom: "1rem", borderRadius: "0.5rem", border: "1px solid #cbd5e1", width: "240px" }}
          />

          <Button onClick={buscarPorCodigo}>Buscar por Código</Button>
        </>
      )}

      {resultado && resultado.peças && resultado.causas && (
        <ResultBox>
          <Section>
            <Label>Peças sugeridas:</Label>
            <List>
              {resultado.peças.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </List>
          </Section>
          <Section>
            <Label>Causas:</Label>
            <List>
              {resultado.causas.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </List>
          </Section>
          <Section>
            <Label>Observações:</Label>
            <Content>{resultado.observações}</Content>
          </Section>
        </ResultBox>
      )}

      <Footer>Desenvolvido por Daniel Carvalho - 2025</Footer>
    </Container>
  );
}

export default App;
