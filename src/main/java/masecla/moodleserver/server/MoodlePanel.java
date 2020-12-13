package masecla.moodleserver.server;

import java.io.File;
import java.io.IOException;

import masecla.mamp.classes.Website;
import masecla.moodleserver.database.AnswerManager;
import masecla.moodleserver.endpoints.GetAnswers;
import masecla.moodleserver.endpoints.SetAnswer;
import masecla.moodleserver.endpoints.SourceServer;

public class MoodlePanel {
	private Website website;
	private AnswerManager manager;

	public void start() {
		this.manager = new AnswerManager(new File("answers.json"));
		this.website = new Website() {
			@Override
			public int getPort() {
				return 12345;
			}
		};

		runMappings();

		try {
			this.website.open();
		} catch (IOException e) {
		}
	}

	public void runMappings() {
		this.website.map("/source", new SourceServer());
		this.website.map("/set", new SetAnswer(manager));
		this.website.map("/get", new GetAnswers(manager));
	}
}
