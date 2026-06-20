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

export const getNetwork = () => {
    return new Promise((resolve, reject) => {
        const network = {
            stations: [],
            lines: [],
            segments: []
        };

        db.serialize(() => {
            const queryStations = `SELECT * FROM Stations`;

            db.all(queryStations, [], (err, stations) => {
                if (err) return reject(err);

                network.stations = stations;
            });

            const queryLines = `SELECT * FROM Lines`;

            db.all(queryLines, [], (err, lines) => {
                if (err) return reject(err);

                network.lines = lines;
            });

            const queryStops = `
                SELECT Stops.LID, Lines.Name as lineName, Stops.SID,
                       Stations.Name as stationName, Stops.StopNumber
                FROM Stops JOIN Lines ON Stops.LID = Lines.LID
                     JOIN Stations ON Stops.SID = Stations.SID
                ORDER BY Stops.LID, Stops.StopNumber`;

            db.all(queryStops, [], (err, stops) => {
                if (err) return reject(err);
                for (let i = 0; i < stops.length - 1; i++) {
                    const currentStop = stops[i];
                    const nextStop = stops[i + 1];

                    if (nextStop.lineName === currentStop.lineName) {
                        network.segments.push({
                            from: currentStop.stationName,
                            to: nextStop.stationName,
                            lineId: currentStop.lineName
                        });
                    }
                }

                return resolve(network);
            });
        });
    });
};