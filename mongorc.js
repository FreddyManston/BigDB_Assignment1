/**
	Created by: Joshua J. Abraham (ABRJOS005) and Gregory 
	
	Mongo commands:
	use BigDBAss1
	db.createCollection("subscribers")
	db.createCollection("ratings")
*/

var conn = new Mongo();
function getNextSequenceValue(sequenceName){

   var sequenceDocument = db.counters.findAndModify({
      query:{_id: sequenceName },
      update: {$inc:{sequence_value:1}},
      new:true
   });
	
   return sequenceDocument.sequence_value;
}

// insertRating function where after rating is optional 
// also updates the subscribers collection with the ratings reference
function insertRating (dbname, from_id, to_id, before_rating, after_rating, comment) {
	var db = conn.getDB(dbname);
	// you only really have to set the after rating later (after you meet the person)
	if (typeof after_rating === "undefined") {
		after_rating = "-";
	} 
	db['ratings'].insert({'_id': getNextSequenceValue("rating"),
		'from_sub_id': from_id,
        'to_sub_id': to_id,
        'before_meet': before_rating,
        'after_meet': after_rating,
        'comments': comment});

	db['subscribers'].update({ _id: to_id },
		{$push: { the_ratings: {'$ref' : 'ratings', '$id': from_id}}});
}


// Updates the rating (you can change before_rating and after_rating) 
function updateRating(dbname, from_id, to_id, before_rating, after_rating) {
	db['ratings'].updateOne({$and: [{ from_sub_id: from_id }, { to_sub_id: to_id}] }, {$set: {"before_meet" : before_rating, "after_meet" : after_rating}})
}

/**
	totalSubscribers shows the total number of subsccribers on the database and prints how many are men and how many are women
*/
function totalSubscribers() {
	var str = "Total subscribers: " + db.subscribers.find().count(); 
	str += "\nTotal males: " + db.subscribers.find({"sex": "Male"}).count();
	str += "\nTotal females: " + db.subscribers.find({"sex": "Female"}).count()
	return str
}

// Removes a subscriber, but the ratings they made still exist in the db
function removeSubscriber(dbname, id) {
	db.subscribers.remove( { _id: id }, true )
}

// Checks who rated a specific person 5 stars (this way you can see who really likes you)
function find5StarAfterRatings(dbname, id) {
	var str = db.ratings.find({$and: [{to_sub_id : id }, {after_meet: {$gt : 4}}]}).count() + " person(s) rated you 5 stars!";
	str += "\nHere is one of your possible lovers! \n";
	var ratings = db.ratings.find({$and: [{to_sub_id : 2 }, {after_meet: {$gt : 4}}]}, {from_sub_id:1, _id:0})
	str += "\n" + db.subscribers.find({_id: ratings[0].from_sub_id});
	return str
}

/** 
	getAvgBeforeRating takes in a subscribers id and outputs their name, age, sex and the average of the after_meeting ratings
	that they've been given.
*/
function getAvgBeforeRating(id) {
	return db.ratings.aggregate([ {$match:{"to_sub_id": id}}, {$group:{_id: "$to_sub_id", average_before_rating:{$avg:"$before_meet"}}} ])
}

/** 
	getAvgAfterRating takes in a subscribers id and outputs their name, age, sex and the average of the after_meeting ratings
	that they've been given.
*/
function getAvgAfterRating(id) {
	return db.ratings.aggregate([ {$match:{"to_sub_id": id}}, {$group:{_id: "$to_sub_id", average_after_rating:{$avg:"$after_meet"}}} ])
}


/** 
	sortByName sorts subscribers by their name
*/
function sortByName() {
	return db.subscribers.find().sort({name:1}).pretty()
}
