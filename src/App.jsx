import React, { useState, useEffect } from "react";
import styled from "styled-components";
import sintomas from "./sintomas.json";
import erros from "./erros.json";

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

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${(props) => (props.active ? "#1d4ed8" : "#cbd5e1")};
  color: ${(props) => (props.active ? "white" : "#1e293b")};
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
`;

const Select = styled.select`
  border: 1px solid #cbd5e1;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  width: 18rem;
`;

const Input = styled.input`
  border: 1px solid #cbd5e1;
  padding: 0.75rem;
  border-radius: 0.5rem;
  width: 16rem;
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 1rem;
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

const Footer = styled.footer`
  margin-top: 2rem;
  font-size: 0.875rem;
  color: #64748b;
`;

function App() {
  const [categoria, setCategoria] = useState("lavadora");
  const [sintomaSelecionado, setSintomaSelecionado] = useState("");
  const [codigo, setCodigo] = useState("");
  const [resultado, setResultado] = useState(null);
  const [abaAtiva, setAbaAtiva] = useState("sintoma");
  const [sintomasFiltrados, setSintomasFiltrados] = useState([]);

  useEffect(() => {
    const filtrados = Object.entries(sintomas)
      .filter(([_, value]) => value.tipo === categoria)
      .map(([chave]) => chave);
    setSintomasFiltrados(filtrados);
    setSintomaSelecionado("");
    setResultado(null);
  }, [categoria]);

  const buscarPorSintoma = () => {
    const dados = sintomas[sintomaSelecionado];
    setResultado(dados || null);
  };

  const buscarPorCodigo = () => {
    const dados = erros[codigo.toUpperCase()];
    setResultado(dados || null);
  };

  return (
    <Container>
      <Title>Consulta Triagem</Title>

      <TabContainer>
        <Tab active={abaAtiva === "sintoma"} onClick={() => setAbaAtiva("sintoma")}>Buscar por Sintoma</Tab>
        <Tab active={abaAtiva === "codigo"} onClick={() => setAbaAtiva("codigo")}>Buscar por Código</Tab>
      </TabContainer>

      {abaAtiva === "sintoma" && (
        <>
          <Select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="lavadora">Máquina de Lavar</option>
            <option value="ar">Ar-Condicionado</option>
          </Select>

          <Select
            value={sintomaSelecionado}
            onChange={(e) => setSintomaSelecionado(e.target.value)}
          >
            <option value="">Selecione um sintoma</option>
            {sintomasFiltrados.map((sintoma, idx) => (
              <option key={idx} value={sintoma}>
                {sintoma}
              </option>
            ))}
          </Select>

          <Button onClick={buscarPorSintoma}>Buscar</Button>
        </>
      )}

      {abaAtiva === "codigo" && (
        <>
          <Input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Digite o código (ex: C101)"
          />
          <Button onClick={buscarPorCodigo}>Buscar</Button>
        </>
      )}

      {resultado && (
        <ResultBox>
          {abaAtiva === "sintoma" && (
            <Section>
              <Label>Sintoma:</Label>
              <Content>{sintomaSelecionado}</Content>
            </Section>
          )}
          <Section>
            <Label>Peças sugeridas:</Label>
            <List>
              {resultado.peças.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </List>
          </Section>
          <Section>
            <Label>Causas:</Label>
            <List>
              {resultado.causas.map((causa, idx) => (
                <li key={idx}>{causa}</li>
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
