import React, { useState } from "react";
import styled from "styled-components";
import erros from "./erros.json";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #f8fafc, #e2e8f0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-family: sans-serif;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1d4ed8;
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

const NotFound = styled.p`
  margin-top: 1rem;
  color: #dc2626;
  font-size: 1.125rem;
`;

const Footer = styled.footer`
  margin-top: 2rem;
  font-size: 0.875rem;
  color: #64748b;
`;

function App() {
  const [codigo, setCodigo] = useState("");
  const [resultado, setResultado] = useState(null);

  const buscarErro = () => {
    const resultadoBusca = erros[codigo.toUpperCase()];
    setResultado(resultadoBusca || null);
  };

  return (
    <Container>
      <Title>Consulta de Códigos de Erro (WSM E RAC)</Title>
      <Input
        type="text"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        placeholder="Digite o código (ex: C101)"
      />
      <Button onClick={buscarErro}>Buscar</Button>

      {resultado ? (
        <ResultBox>
          <Section>
            <Label>Resultado para {codigo.toUpperCase()}:</Label>
          </Section>
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
      ) : (
        codigo && <NotFound>Código não encontrado.</NotFound>
      )}

      <Footer>Desenvolvido por Daniel Carvalho - 2025</Footer>
    </Container>
  );
}

export default App;
