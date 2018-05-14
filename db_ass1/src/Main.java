/*
        Commands:
        mongoimport --db prac6db --collection facebook --type json --file ../Facebookdata.json --jsonArray
 */
import com.mongodb.*;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import java.net.UnknownHostException;


public class Main {

    public static void main(String[] args) throws UnknownHostException {
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase("BigDBAss1");
        MongoCursor<org.bson.Document> tmp = db.listCollections().iterator();
        /*while(tmp.hasNext()) {
            System.out.println(tmp.next().toString());
        }*/
        System.out.println(totalSubscribers(db));
    }

    public static String totalSubscribers(MongoDatabase db) {
        String str = "Total subscribers: " + db.getCollection("subscribers").count();
        return str;
    }

}
