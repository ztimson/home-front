export interface Battery {
    ampHours: number;
    avgCellVoltage: number;
    capacity: number;
    current: number;
    lifetimeCharge: number;
    lifetimeDischarge: number;
    maxCellVoltage: number;
    maxDischargeCurrent: number;
    maxVoltage: number;
    minCellVoltage: number;
    minVoltage: number;
    modules: {[key: number]: {
        cells: {[key: number]: number}
        negativeTemperature: number;
        positiveTemperature: number;
        temperature: number;
        voltage: number;
    }},
    negativeContactor: boolean,
    positiveContactor: boolean,
    power: number;
    soc: number;
    temperature: number;
    timestamp: number;
    uptime: string;
    version: number;
    voltage: number;
    wattHours: number;
}
