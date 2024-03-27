const xml2js = require('xml2js');
const parser = new xml2js.Parser({
    explicitArray: false,
    explicitChildren: false,
    ignoreAttrs: true, // Nur setzen, wenn keine Attribute benötigt werden
    charsAsChildren: false
});

const parseXML = async (xmlString) => {
    try {
        const result = await parser.parseStringPromise(xmlString);
        const devices = result.devicelist.device;
        const deviceList = devices.map(device => {
            return {
                identifier: device.identifier,
                id: device.id,
                name: device.name,
                functionbitmask: device.functionbitmask,
                fwversion: device.fwversion,
                manufacturer: device.manufacturer,
                productname: device.productname,
                present: device.present,
                txbusy: device.txbusy,
                switchState: device.switch && device.switch.state,
                mode: device.switch && device.switch.mode,
                lock: device.switch && device.switch.lock,
                devicelock: device.switch && device.switch.devicelock,
                simpleonoffState: device.simpleonoff && device.simpleonoff.state,
                powermeter: {
                    voltage: device.powermeter && device.powermeter.voltage,
                    power: device.powermeter && device.powermeter.power,
                    energy: device.powermeter && device.powermeter.energy,
                },
                temperature: {
                    celsius: device.temperature && device.temperature.celsius,
                    offset: device.temperature && device.temperature.offset,
                },
                // Weiteres Feld für hkr, falls vorhanden
                hkr: device.hkr ? {
                    tist: device.hkr.tist,
                    tsoll: device.hkr.tsoll,
                    absenk: device.hkr.absenk,
                    komfort: device.hkr.komfort,
                    lock: device.hkr.lock,
                    devicelock: device.hkr.devicelock,
                    errorcode: device.hkr.errorcode,
                    windowopenactiv: device.hkr.windowopenactiv,
                    windowopenactiveendtime: device.hkr.windowopenactiveendtime,
                    boostactive: device.hkr.boostactive,
                    boostactiveendtime: device.hkr.boostactiveendtime,
                    batterylow: device.hkr.batterylow,
                    battery: device.hkr.battery,
                    nextchange: device.hkr.nextchange,
                    summeractive: device.hkr.summeractive,
                    holidayactive: device.hkr.holidayactive,
                    adaptiveHeatingActive: device.hkr.adaptiveHeatingActive,
                    adaptiveHeatingRunning: device.hkr.adaptiveHeatingRunning,
                } : null
            };
        });
        console.log(deviceList);
        return deviceList;
    } catch (err) {
        console.error('Fehler beim Parsen des XML: ', err);
    }
};



module.exports = { parseXML };
