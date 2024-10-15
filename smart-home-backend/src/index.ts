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
let dispositivos = {
    sala: {
        luzOn: false,
        tvOn: false,
        temperatura: 21,
        canalAtual: 1,
        arCondicionadoOn: false,
    },
    cozinha: {
        luzOn: false,
        geladeiraTemperatura: 0,
        alertaGeladeira: false,
        fogaoOn: false,
        fogaoPotencia: 0,
    },
    quarto: {
        luzOn: false,
        ventiladorOn: false,
        ventiladorVelocidade: 1,
        cortinasAbertas: false,
    },
};

// Escuta os eventos de conexão do socket
io.on('connection', (socket) => {
    console.log('Cliente conectado', socket.id);

    // Enviando o estado inicial dos dispositivos para o cliente
    socket.emit('estadoInicial', dispositivos);

    // Sala de estar
    socket.on('acenderLuzSala', () => {
        dispositivos.sala.luzOn = !dispositivos.sala.luzOn;
        io.emit('estadoAltera', dispositivos);
    });

    socket.on('ligarTvSala', () => {
        dispositivos.sala.tvOn = !dispositivos.sala.tvOn
        io.emit('estadoAltera', dispositivos);
    })

    socket.on('controlarTv', (canal) => {
        if (canal) dispositivos.sala.canalAtual = canal;
        io.emit('estadoAltera', dispositivos);
    });

    socket.on('ligarArCondicionado', () => {
        dispositivos.sala.arCondicionadoOn = !dispositivos.sala.arCondicionadoOn;
        io.emit('estadoAltera', dispositivos);
    });

    socket.on('ajustarArCondicionado', (temperatura) => {
        if (temperatura) dispositivos.sala.temperatura = temperatura;
        io.emit('estadoAltera', dispositivos);
    });

    // Cozinha
    socket.on('acenderLuzCozinha', () => {
        dispositivos.cozinha.luzOn = !dispositivos.cozinha.luzOn;
        io.emit('estadoAltera', dispositivos);
    });

    socket.on('ligarFogao', () => {
        dispositivos.cozinha.fogaoOn = !dispositivos.cozinha.fogaoOn;
        io.emit('estadoAltera', dispositivos);
    })

    socket.on('ajustarFogao', (potencia) => {
        if (potencia) dispositivos.cozinha.fogaoPotencia = potencia;
        io.emit('estadoAltera', dispositivos);
    });

    // Monitorar temperatura da geladeira
    socket.on('verificarGeladeira', (temperatura) => {
        dispositivos.cozinha.geladeiraTemperatura = temperatura;
        if (temperatura > 5) {
            dispositivos.cozinha.alertaGeladeira = true;
        } else {
            dispositivos.cozinha.alertaGeladeira = false;
        }
        io.emit('estadoAltera', dispositivos);
    });

    // Quarto
    socket.on('acenderLuzQuarto', () => {
        dispositivos.quarto.luzOn = !dispositivos.quarto.luzOn;
        io.emit('estadoAltera', dispositivos);
    });

    socket.on('ligarVentilador', () => {
        dispositivos.quarto.ventiladorOn = !dispositivos.quarto.ventiladorOn;
        io.emit('estadoAltera', dispositivos);
    });

    socket.on('ajustarVentilador', (velocidade) => {
        if (velocidade) dispositivos.quarto.ventiladorVelocidade = velocidade;
        io.emit('estadoAltera', dispositivos);
    });

    socket.on('controlarCortinas', () => {
        dispositivos.quarto.cortinasAbertas = !dispositivos.quarto.cortinasAbertas;
        io.emit('estadoAltera', dispositivos);
    });
});

// Iniciar servidor
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});