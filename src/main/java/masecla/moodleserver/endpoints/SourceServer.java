package masecla.moodleserver.endpoints;

import java.io.IOException;
import java.io.InputStream;

import masecla.mamp.classes.MAMPEngine;
import masecla.mamp.classes.Request;
import masecla.mamp.classes.UserClient;
import masecla.mamp.classes.Webpage;
import masecla.mamp.classes.Website;

public class SourceServer extends Webpage {

	@Override
	public String generateHTML(Website arg0, UserClient arg1, MAMPEngine arg2, Request arg3) {
		try {
			InputStream strm = this.getClass().getClassLoader().getResourceAsStream("moodlescript.js");
			int cr = strm.available();
			byte[] b = new byte[cr];
			strm.read(b, 0, cr);
			return new String(b);
		} catch (IOException e) {
			return "";
		}
	}

}
