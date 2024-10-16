import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import { EstadoDispositivos } from './EstadosDispositivos'; 

const socket = io('http://localhost:4000');

const Sala: React.FC = () => {
    const [dispositivosSala, setDispositivosSala] = useState({
        luzOn: false,
        tvOn: false,
        canalAtual: 1,
        arCondicionadoOn: false,
        temperatura: 24,
    });

    useEffect(() => {
        socket.on('estadoInicial', (estadoDispositivos: EstadoDispositivos) => {
            setDispositivosSala(estadoDispositivos.sala);
        });

        socket.on('estadoAltera', (novoEstado: EstadoDispositivos) => {
            setDispositivosSala(novoEstado.sala);
        });

        return () => {
            socket.off('estadoInicial');
            socket.off('estadoAltera');
        };
    }, []);

    const luzSala = () => {
        socket.emit('acenderLuzSala');
    };

    const ligarTvSala = () => {
        socket.emit('ligarTvSala');
    }

    const controlarTv = () => {
        socket.emit('controlarTv', dispositivosSala.canalAtual === 3 ? 1 : dispositivosSala.canalAtual + 1);
    };

    const ligarArCondicionado = () => {
        socket.emit('ligarArCondicionado');
    };

    const ajustarArCondicionado = () => {
        const novaTemperatura = dispositivosSala.temperatura === 30 ? 18 : dispositivosSala.temperatura + 1;
        socket.emit('ajustarArCondicionado', novaTemperatura);
    };

    return (
        <div className='sala'>
            <h2>Sala</h2>
            <div className="btns">
                <button onClick={luzSala} style={{ width: '91px' }}>
                    {dispositivosSala.luzOn ? 'Desligar Luz' : 'Ligar Luz'}
                </button>
                <button onClick={ligarTvSala}>
                    {dispositivosSala.tvOn ? `Desligar TV` : 'Ligar TV'}
                </button>
                <button onClick={ligarArCondicionado} style={{ width: '168px' }}>
                    {dispositivosSala.arCondicionadoOn ? `Desligar Ar-Condicionado` : 'Ligar Ar-Condicionado'}
                </button>
            </div>
            <div className='acao'>
                <div className='luzContainer'>
                    <img src='images\luz.png' className={`lampada status ${dispositivosSala.luzOn ? 'on' : 'off'}`} />
                </div>
                <div className='tvContainer'>
                    <div className={`tv ${!dispositivosSala.tvOn ? 'off' : 'on'}`} >
                        <div className="inner"></div>
                    </div>
                    {dispositivosSala.tvOn && <button onClick={controlarTv} className='canal'>{`Trocar (Canal ${dispositivosSala.canalAtual})`}</button>}
                </div>
                <div className='arContainer'>
                    <img src='images\ar.png' className={`ar status ${dispositivosSala.arCondicionadoOn ? 'on' : 'off'}`} />
                    {dispositivosSala.arCondicionadoOn && <button onClick={ajustarArCondicionado} className='temperatura'>{`Ajustar Ar (Temp: ${dispositivosSala.temperatura}°C)`}</button>}
                </div>
            </div>
        </div>
    );
};

export default Sala;