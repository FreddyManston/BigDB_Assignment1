/**
 * Created by Trevor on 2015/09/03.
 *  Commands:
 *  use prac6db
 *  db.createCollection("Cartesian")
 *  db.Cartesian.createIndex({xval: 1, yval: 1});
 */


var conn = new Mongo();

/*----------------------------------------------------------------Task 1---------------------------------------------------------*/
function insertPoints(dbname, colName, xcount, ycount) {
    var db = conn.getDB(dbname);
    var count = 2;
    var max = Math.max(xcount, ycount);
    while (count <= max) {
        var xval = count, yval = count;
        if (xcount < count) {
            xval = xcount;
        }
        if (ycount < count) {
            yval = ycount;
        }
        db[colName].insert({'xval': xval, 'yval': yval});
        count += 2;
    }


}

function findNearest(dbName, colName, xval, yval) {
    var db = conn.getDB(dbName);
    var cursor = db[colName].find();
    var obj = null;
    var prevEuc = null;
    while (cursor.hasNext()) {
        var a = cursor.next();
        var euc = Math.sqrt(Math.pow((xval - a.xval), 2) + Math.pow((yval - a.yval), 2));
        if (prevEuc == null || euc < prevEuc) {
            prevEuc = euc;
            obj = a;
        }
    }
    if (obj == null) {
        print("No objects in the table");
    } else {
        printjson(obj);
    }
}

function updateYVals(dbName, colName, threshold, step) {
    var db = conn.getDB(dbName);
    db[colName].update({"yval": {$gt: threshold}}, {$inc: {yval: step}}, {multi: true});
}

function removeIfYless(dbName, colName, threshold) {
    var db = conn.getDB(dbName);
    db[colName].remove({"yval": {$lt: threshold}});
}

/**
 * mongoimport --db prac6db --collection zipcodes --type json --file ../zipcodes.json
 *
 */

/*-------------------------------------------------------Task 2--------------------------------------------------------*/

function allStatesPopulation(dbName, colName) {
    var db = conn.getDB(dbName);
    var cursor = db[colName].aggregate([
            {$group: {_id: "$state", population: {$sum: "$pop"}}},
            {$sort: {_id: 1}}]
    );
    while (cursor.hasNext()) {
        printjson(cursor.next());
    }
}

function oneStatePopulation(dbName, colName, stateName) {
    var db = conn.getDB(dbName);
    var cursor = db[colName].aggregate([
            {$group: {_id: "$state", population: {$sum: "$pop"}}},
            {$match: {_id: stateName}},
            {$sort: {_id: 1}}]
    );
    while (cursor.hasNext()) {
        printjson(cursor.next());
    }
}

function allStatesPopulationMR(dbName, colName) {
    var db = conn.getDB(dbName);
    var cursor = db[colName].mapReduce(
        function () {
            emit(this.state, this.pop);
        },
        function (key, values) {
            return Array.sum(values)
        },
        {
            sort: {state: 1},
            out: "states_pop"
        }
    ).find({});
    while (cursor.hasNext()) {
        printjson(cursor.next());
    }
}

/*SO INEFFICIENT!!!!!*/
function placesInGrid(dbName, colName, lat1, lat2, lon1, lon2) {
    var db = conn.getDB(dbName);
    var cursor = db[colName].find({
    }, {city: 1, loc: 1, state: 1});
    while (cursor.hasNext()) {
        var obj = cursor.next();
        if(!(obj.loc[0] >= lat1 && obj.loc[0] <= lat2))
            continue;
        if(!(obj.loc[1] >= lon1 && obj.loc[0] <= lon2))
            continue;
        printjson(obj);
    }
}