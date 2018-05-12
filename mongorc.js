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

function insert() {}

function updateRating() {}

function remove() {}

function findPretty() {}

function find5StarAfterRating() {}

/**
	totalSubscribers shows the total number of subsccribers on the database and prints how many are men and how many are women
*/
function totalSubscribers() {
	document.write("In progress.");
}

/** 
	averageRatings outputs the average given ratings for men and women respectively
*/
function averageRatings() {
	document.write("In progress.");
}

/** 
	getAvgBeforeRating takes in a subscribers id and outputs their name, age, sex and the average of the after_meeting ratings
	that they've been given.
*/
function getAvgBeforeRating(id) {
	document.write("In progress.");
}

/** 
	getAvgAfterRating takes in a subscribers id and outputs their name, age, sex and the average of the after_meeting ratings
	that they've been given.
*/
function getAvgAfterRating(id) {
	document.write("In progress.");
}


/** 
	sortByRating sorts subscribers by their average overall rating (can extend to showing male or female subscribers)
	Note: Average overall rating is calculated by taking avg of before and after or by just taking before if there's no after rating
*/
function sortByRating() {
//	avg_rating = before_rating
//
//	if(there is an after rating) then
//		avg_rating = (avg_rating + after_rating)/2

	document.write("In progress.");
}

/** 
	findMostLikelyMatch takes in a subscribers name, their age, their sex, preferred sex and a keyword from their bio 
	outputs the subscriber who'd be their most likely match.
	Note: This is a rudimentary example, meant only for the purpose of this BigDb assignment.
*/
function findMostLikelyMatch(name, age, bio_keyword, sex, pref_sex) {
	document.write("In progress.");
}
