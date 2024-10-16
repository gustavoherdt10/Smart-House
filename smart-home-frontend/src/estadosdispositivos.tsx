export interface EstadoDispositivos {
    sala: {
        luzOn: boolean;
        tvOn: boolean;
        canalTV: number;
        arCondicionadoOn: boolean;
        temperatura: number;
    };
    cozinha: {
        luzOn: boolean;
        geladeiraTemperatura: number;
        alertaGeladeira: boolean;
        fogaoOn: boolean;
        fogaoModo: number;
    };
    quarto: {
        luzOn: boolean;
        ventiladorOn: boolean;
        ventiladorVelocidade: number;
        cortinasAbertas: boolean;
    };
  }