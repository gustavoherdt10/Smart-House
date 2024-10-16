# Smart Home Controller

## Objetivo

Desenvolver uma aplicação de casa inteligente que simula o controle e monitoramento de dispositivos em tempo real, utilizando tecnologias modernas e oferecendo uma experiência interativa aos usuários.

## Cômodos e Dispositivos

### 1. Sala de Estar
- **Luzes Inteligentes**: Permite ligar e desligar as luzes.
  - Estados: Ligado/Desligado.
- **Televisão**: Permite ligar/desligar a TV e mudar de canal.
  - Estados: Ligado/Desligado, Canal (lista de canais disponíveis).
- **Ar-Condicionado**: Permite ligar/desligar e ajustar a temperatura.
  - Estados: Ligado/Desligado, Temperatura (ajustável de 18°C a 30°C).

### 2. Cozinha
- **Luzes Inteligentes**: Permite ligar e desligar as luzes.
  - Estados: Ligado/Desligado.
- **Geladeira Inteligente**: Monitora a temperatura interna e alerta o usuário se a temperatura subir além do valor definido.
  - Estados: Temperatura Interna, Alerta (acionado quando acima de 5°C).
- **Fogão Elétrico**: Permite ligar/desligar e ajustar o nível de potência.
  - Estados: Ligado/Desligado, Potência (ajustável de 1 a 5).

### 3. Quarto
- **Luzes Inteligentes**: Permite ligar e desligar as luzes.
  - Estados: Ligado/Desligado.
- **Ventilador Inteligente**: Permite ligar/desligar e ajustar a velocidade.
  - Estados: Ligado/Desligado, Velocidade (1 a 3).
- **Cortinas Automáticas**: Permite abrir e fechar as cortinas.
  - Estados: Aberto/Fechado.

## Tecnologias Utilizadas
- **Node.js**
- **React**
- **Socket.io**
- **TypeScript**

## Como Executar o Projeto

### 1. Clone o Repositório

```bash
git clone https://github.com/gustavoherdt10/smart-house.git
cd smart-house
```

### 2. Configuração do Backend

1. Entre na pasta `smart-home-backend`:

```bash
cd smart-home-backend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor:

```bash
npm run start
```

O servidor será iniciado na porta 4000.

### 3. Configuração do Frontend

1. Entre na pasta `smart-home-frontend`:

```bash
cd ../smart-home-frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie a aplicação:

```bash
npm start
```

A aplicação disponível em `http://localhost:3000`.

## Autor

Gustavo Herdt
