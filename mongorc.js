/**
	Created by: Joshua J. Abraham (ABRJOS005) and Gregory 
	
	Mongo commands:
	use BigDBAss1
	db.createCollection("subscribers")
	db.createCollection("ratings")
*/

var conn = new Mongo();

/**
	NOTE
	From: Joshua
	To: Greg 
	
	I feel like some of our functions are redundant. Like find pretty? You could really just do that from mongo shell..and insert, remove, etc.. 
	Theres too many arguments to consider, and not neccesarily all of them need to be used... Like someone could be a subscriber, 
	but not have a bio e.g. ... I don't know, let me know.

	<3
*/

// insert

// updateRating

// remove 

// find pretty

// aggregateRatingsForDifferentSexs

// sortByRating

// getAvgBeforeRating

// getAvgAfterRating

// find5StarAfterRating

/** 
	findMostLikelyMatch takes in a subscribers name, their age, their sex, preferred sex and a keyword from their bio 
	outputs the subscriber who'd be their most likely match.
	Note: This is a rudimentary example, meant only for the purpose of this BigDb assignment.
*/
function findMostLikelyMatch(name, age, bio_keyword, sex, pref_sex) {

}
