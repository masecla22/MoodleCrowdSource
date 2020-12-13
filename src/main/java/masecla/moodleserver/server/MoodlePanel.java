package masecla.moodleserver.server;

import java.io.IOException;

import masecla.mamp.classes.Website;

public class MoodlePanel {
	private Website website;

	public void start() {
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

	}
}
