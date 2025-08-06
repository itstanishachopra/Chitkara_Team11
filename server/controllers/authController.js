class AuthController {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }

    async registerUser(req, res) {
        const { username, password, email } = req.body;
        try {
            const newUser = new this.UserModel({ username, password, email });
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error registering user', error });
        }
    }

    async loginUser(req, res) {
        const { username, password } = req.body;
        try {
            const user = await this.UserModel.findOne({ username });
            if (!user || user.password !== password) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            res.status(200).json({ message: 'Login successful', user });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error });
        }
    }
}

module.exports = AuthController;