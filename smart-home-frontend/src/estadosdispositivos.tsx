export interface EstadoDispositivos {
    sala: {
        luzOn: boolean;
        tvOn: boolean;
        canalAtual: number;
        arCondicionadoOn: boolean;
        temperatura: number;
    };
    cozinha: {
        luzOn: boolean;
        geladeiraTemperatura: number;
        alertaGeladeira: boolean;
        fogaoOn: boolean;
        fogaoPotencia: number;
    };
    quarto: {
        luzOn: boolean;
        ventiladorOn: boolean;
        ventiladorVelocidade: number;
        cortinasAbertas: boolean;
    };
  };
