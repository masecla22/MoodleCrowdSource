package masecla.moodleserver.database;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.RandomAccessFile;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

@SuppressWarnings("unchecked")
public class AnswerManager {
	private JSONObject answers;
	private File toUse;

	public AnswerManager(File toUse) {
		super();
		this.toUse = toUse;
	}

	public void fromFile() {
		try {
			answers = (JSONObject) new JSONParser().parse(new FileReader(toUse));
		} catch (IOException | ParseException e) {
			answers = new JSONObject();
		}
	}

	public void saveToFile() {
		try {
			RandomAccessFile raf = new RandomAccessFile(toUse, "rw");
			raf.setLength(0);
			raf.write(answers.toJSONString().getBytes());
			raf.close();
		} catch (IOException e) {
		}
	}

	public JSONArray getAnswerFor(String question) {
		JSONArray resp = new JSONArray();
		answers.forEach((c, v) -> {
			JSONObject response = getAnswerFor((String) c, question);
			if (response != null)
				resp.add(response);
		});
		return resp;
	}

	public JSONObject getAnswerFor(String user, String question) {
		JSONObject res = new JSONObject();
		JSONObject obj = (JSONObject) this.answers.getOrDefault(user, new JSONObject());
		if (obj.containsKey(question)) {
			res.put("author", user);
			res.put("answer", obj.get(question));
			return res;
		}
		return null;
	}

	public void addAnswerFor(String user, String question, String answer) {
		JSONObject obj = (JSONObject) this.answers.getOrDefault(user, new JSONObject());
		obj.put(question, answer);
		this.answers.put(user, obj);
		this.saveToFile();
	}

}
