import type { NextApiRequest, NextApiResponse } from 'next'

const Login = (req: NextApiRequest, res: NextApiResponse) => {
	res.send('Hello World!');
};

export default Login;