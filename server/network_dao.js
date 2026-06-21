import db from './db.js';

/*
const network = {
    stations: [{
        SID: _SID,
        Name: _Name
    }],

    lines: [{
        LID: _LID,
        Name: _Name
    }],

    segments: [{
        from: currentStop.SID,
        to: nextStop.SID,
        lineId: currentStop.LID
    }],
}
*/

export const getStations = () => {
    return new Promise((resolve, reject) => {
        const queryStations = `SELECT * FROM Stations`;

        db.all(queryStations, [], (err, stations) => {
            if (err) return reject(err);

            resolve(stations);
        });
    });
}

export const getLines = () => {
    return new Promise((resolve, reject) => {
        const queryLines = `SELECT * FROM Lines`;

        db.all(queryLines, [], (err, lines) => {
            if (err) return reject(err);

            resolve(lines);
        });
    });
}

export const getSegments = () => {
    return new Promise((resolve, reject) => {
        const queryStops = `
                SELECT Stops.LID, Lines.Name as lineName, Stops.SID,
                       Stations.Name as stationName, Stops.StopNumber
                FROM Stops JOIN Lines ON Stops.LID = Lines.LID
                     JOIN Stations ON Stops.SID = Stations.SID
                ORDER BY Stops.LID, Stops.StopNumber`;

        db.all(queryStops, [], (err, stops) => {
            if (err) return reject(err);

            let segments = [];
            for (let i = 0; i < stops.length - 1; i++) {
                const currentStop = stops[i];
                const nextStop = stops[i + 1];

                if (nextStop.lineName === currentStop.lineName) {
                    segments.push({
                        from: currentStop.stationName,
                        to: nextStop.stationName,
                        lineId: currentStop.lineName
                    });
                }
            }

            resolve(segments);
        });
    });
}

export const getEndpointStations = async () => {
    const segments = await getSegments();

    const getNeighbors = (station) => {
        let neighStations = [];
        for (const segment of segments) {
            if (segment.from === station) {
                neighStations.push(segment.to);
            }

            if (segment.to === station) {
                neighStations.push(segment.from);
            }
        }

        return neighStations;
    }

    let stations = await getStations();
    stations = stations.map(station => station.Name);

    let validEndpoints = false;
    let startStation = stations[Math.floor(Math.random() * stations.length)];;
    let endStation = '';

    while (!validEndpoints) {
        endStation = stations[Math.floor(Math.random() * stations.length)];

        if (startStation == endStation) continue;

        let neighborhood1 = getNeighbors(startStation);

        // Check Level 1 Neighborhood
        if (neighborhood1.includes(endStation)) continue;

        // Check Level 2 Neighborhood
        let isDistance2 = false;
        for (let neighbor1 of neighborhood1) {
            let neighborhood2 = getNeighbors(neighbor1);
            if (neighborhood2.includes(endStation)) {
                isDistance2 = true;
                break;
            }
        }

        if (isDistance2) continue;

        validEndpoints = true;
    }

    return [startStation, endStation];
};