import User from "../models/Usermodel.js"
import bcryptjs from "bcryptjs"
import { ErrorHandler } from "../middleware/error.js"
import generateToken from "../utils/createToken.js"

export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body

    if (!username || !email || !password || username === "" || email === "" || password === "") {
        next(ErrorHandler(400, "All fields are required"))
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })

    try {
        await newUser.save()
        res.json("Sign Up successfully")
    } catch (error) {
        next(error)
    }
}




export const signIn = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === "" || password === "") {
        return next(ErrorHandler(400, "Email or password is required"));
    }

    try {
        const validUser = await User.findOne({ email });

        if (!validUser) {
            return next(ErrorHandler(404, "Invalid Email or Password"));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validPassword) {
            return next(ErrorHandler(404, "Invalid Email or Password"));
        }

        const token = generateToken(validUser);

        console.log("Token", token);

        const { password: pass, ...rest } = validUser._doc;

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({ token, user: rest });

    } catch (error) {
        next(error);
    }
};

