export interface ICreateRuas {
    ruas: string;
    km_awal: string;
    km_akhir: string;
    coordinates: ICreateRuasCoord[];
}

export interface IUpdateRuas {
    ruas: string;
    km_awal: string;
    km_akhir: string;
    status: boolean;
    coordinates: IUpdateRuasCoord[];
}

export interface ICreateRuasCoord {
    coordinates: string;
}

export interface IUpdateRuasCoord {
    id: number;
    coordinates: string;
}