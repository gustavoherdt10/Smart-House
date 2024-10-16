import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

// Criando o Servidor HTTP
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // URL do Front-End React
        methods: ["GET", "POST"],
    },
});

//Estado inicial dos dispositivos nos comodos
let dispositivosSala = {
    luzOn: false,
    tvOn: false,
    canalTV: 1,
    arcondicionadoOn: false,
    temperatura: 18
}

let dispositivosCozinha = {
    luzOn: false,
    geladeiraTemp: 0,
    alarmeGeladeira: false,
    fogaoOn: false,
    modoFogao: 0
}

let dispositivosQuarto = {
    luzOn: false,
    ventiladorOn: false,
    ventiladorVeloc: 1,
    cortinasOpen: false
}

// Escutando a conexão Socket
io.on('connection', (socket) => {
    console.log('Cliente conectado', socket.id);

    // Enviando o estado inicial dos dispositivos para o cliente
    socket.emit('estadoInicial', {
        sala: dispositivosSala,
        cozinha: dispositivosCozinha,
        quarto: dispositivosQuarto,
    });

    // Sala de estar
    socket.on('acenderLuzSala', () => {
        dispositivosSala.luzOn = !dispositivosSala.luzOn;
        io.emit('estadoSalaAltera', dispositivosSala);
    });

    socket.on('ligarTvSala', () => {
        dispositivosSala.tvOn = !dispositivosSala.tvOn;
        io.emit('estadoSalaAltera', dispositivosSala);
    });

    socket.on('controlarTv', (canal) => {
        if (canal) dispositivosSala.canalTV = canal;
        io.emit('estadoSalaAltera', dispositivosSala);
    });

    socket.on('ligarArCondicionado', () => {
        dispositivosSala.arcondicionadoOn = !dispositivosSala.arcondicionadoOn;
        io.emit('estadoSalaAltera', dispositivosSala);
    });

    socket.on('ajustarArCondicionado', (temperatura) => {
        if (temperatura) dispositivosSala.temperatura = temperatura;
        io.emit('estadoSalaAltera', dispositivosSala);
    });

    // Cozinha
    socket.on('acenderLuzCozinha', () => {
        dispositivosCozinha.luzOn = !dispositivosCozinha.luzOn;
        io.emit('estadoCozinhaAltera', dispositivosCozinha);
    });

    socket.on('ligarFogao', () => {
        dispositivosCozinha.fogaoOn = !dispositivosCozinha.fogaoOn;
        io.emit('estadoCozinhaAltera', dispositivosCozinha);
    });

    socket.on('ajustarFogao', (modo) => {
        if (modo) dispositivosCozinha.modoFogao = modo;
        io.emit('estadoCozinhaAltera', dispositivosCozinha);
    });

    socket.on('verificarGeladeira', (temperatura) => {
        dispositivosCozinha.geladeiraTemp = temperatura;
        dispositivosCozinha.alarmeGeladeira = temperatura > 5;
        io.emit('estadoCozinhaAltera', dispositivosCozinha);
    });

    // Quarto
    socket.on('acenderLuzQuarto', () => {
        dispositivosQuarto.luzOn = !dispositivosQuarto.luzOn;
        io.emit('estadoQuartoAltera', dispositivosQuarto);
    });

    socket.on('ligarVentilador', () => {
        dispositivosQuarto.ventiladorOn = !dispositivosQuarto.ventiladorOn;
        io.emit('estadoQuartoAltera', dispositivosQuarto);
    });

    socket.on('ajustarVentilador', (velocidade) => {
        if (velocidade) dispositivosQuarto.ventiladorVeloc = velocidade;
        io.emit('estadoQuartoAltera', dispositivosQuarto);
    });

    socket.on('controlarCortinas', () => {
        dispositivosQuarto.cortinasOpen = !dispositivosQuarto.cortinasOpen;
        io.emit('estadoQuartoAltera', dispositivosQuarto);
    });
});

// Iniciando o Servidor
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});