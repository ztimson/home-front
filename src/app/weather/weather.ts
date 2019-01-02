export interface Weather {
    cloudCover: number;
    current: number;
    date: Date;
    feelsLike: number;
    high: number;
    humidity: number;
    icon: string;
    low: number;
    phrase: string;
    pop: number;
    sunrise: Date;
    sunset: Date;
    UVIndex: number;
    wind: {direction: number, speed: number, gusts: number}
}
