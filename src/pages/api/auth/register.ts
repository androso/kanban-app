import { NextApiRequest, NextApiResponse } from "next";
import AppDataSource from "../../../lib/sql-orm/dataSource";

export default function Register (req: NextApiRequest, res: NextApiResponse) {
	const { email, username, password } = req.body;
	try {
		// AppDataSource.manager.findOneBy({ email });
		res.json({
			name: "yatora",
			lastName: "Yaguchi?"
		})
	} catch (e) {
		res.status(500).end();
	}
}