package masecla.moodleserver.endpoints;

import java.util.Base64;

import masecla.mamp.classes.MAMPEngine;
import masecla.mamp.classes.Request;
import masecla.mamp.classes.UserClient;
import masecla.mamp.classes.Webpage;
import masecla.mamp.classes.Website;
import masecla.moodleserver.database.AnswerManager;

public class SetAnswer extends Webpage {

	private AnswerManager manager;

	public SetAnswer(AnswerManager manager) {
		super();
		this.manager = manager;
	}

	@Override
	public String generateHTML(Website arg0, UserClient arg1, MAMPEngine arg2, Request arg3) {
		String question = arg3.getParameters().get("question");
		String answer = arg3.getParameters().get("answer");
		String author = arg3.getParameters().get("author");
		this.manager.addAnswerFor(author, question, answer);
		System.out.println("Got a response from " + author + " for the question "
				+ new String(Base64.getDecoder().decode(question)).substring(0, 10) + "...");
		return "OK";
	}

}
