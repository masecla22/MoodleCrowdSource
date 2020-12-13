package masecla.moodleserver.endpoints;

import masecla.mamp.classes.MAMPEngine;
import masecla.mamp.classes.Request;
import masecla.mamp.classes.UserClient;
import masecla.mamp.classes.Webpage;
import masecla.mamp.classes.Website;
import masecla.moodleserver.database.AnswerManager;

public class GetAnswers extends Webpage {

	private AnswerManager manager;

	public GetAnswers(AnswerManager manager) {
		super();
		this.manager = manager;
	}

	@Override
	public String generateHTML(Website arg0, UserClient arg1, MAMPEngine arg2, Request arg3) {
		String question = arg3.getParameters().get("question");
		return this.manager.getAnswerFor(question).toJSONString();
	}

}
