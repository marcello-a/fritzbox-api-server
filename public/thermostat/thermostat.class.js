module.exports = class Thermostat {
    constructor({id, name, currentTemp, comfortTemp, nightTemp, targetTemp, windowOpen, batteryCharge}) {
        this.id = id;
        this.name = name;
        this.currentTemp = currentTemp;
        this.comfortTemp = comfortTemp;
        this.nightTemp = nightTemp;
        this.targetTemp = targetTemp;
        this.windowOpen = windowOpen;
        this.batteryCharge = batteryCharge;
    }
}
