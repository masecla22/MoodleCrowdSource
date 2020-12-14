package masecla.moodleserver.endpoints;

import java.util.ArrayList;

import masecla.mamp.classes.MAMPEngine;
import masecla.mamp.classes.Request;
import masecla.mamp.classes.UserClient;
import masecla.mamp.classes.Webpage;
import masecla.mamp.classes.Website;

public class Authorize extends Webpage {

	public ArrayList<String> getAllowed() {
		ArrayList<String> res = new ArrayList<>();

		res.add("Stratulat_Cosmin_Mihai_fd9");
		res.add("Mattia_Sefu_La_Bani");
		res.add("Gombos_Eliza_cd9");
		res.add("Andrei_Filip_luv");
		res.add("Aparascai_Andreea_luv");
		res.add("Groza_Iulia_Maria_dj6");
		res.add("Cirje_Daria_vfc");
		res.add("Camelia_Mosut_fks7");
		res.add("Denisa_Neagu_cio");
		res.add("Angel_Huminic_eo4");
		res.add("Andrei_Robu_cke");
		res.add("Oncioiu_Miruna_coe");
		res.add("Jean_Voinescu_c90");
		res.add("Ichim_Daria_Ioana_c98");

		return res;
	}

	@Override
	public String generateHTML(Website arg0, UserClient arg1, MAMPEngine arg2, Request arg3) {
		String id = arg3.getParameters().get("name");
		return getAllowed().contains(id) ? "true" : "false";
	}

}
