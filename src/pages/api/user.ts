import type { NextApiRequest, NextApiResponse } from 'next'
import { UserRepository } from "../../lib/sql-orm/entities/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
	switch (req.method) {
		case "GET": {
			//if (req.session?.user) {
				// res.json(req.session.user);
				const user = await UserRepository.findOneBy({
					email: "a@g.com"
				});
				
				res.json(user)
			/*} else {
				// send status 403
				res.status(403).end();
			}*/
			break;
		}
	}
}
