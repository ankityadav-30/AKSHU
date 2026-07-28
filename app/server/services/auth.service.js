import ApiError from "../utils/ApiError.js";
import userRepository from "../repositories/user.repository.js";

class AuthService {

    async register(userData) {

        const existingUser =
            await userRepository.findPublicByEmail(
                userData.email
            );

        if (existingUser) {
            throw new ApiError(
                409,
                "Email already registered."
            );
        }

        const user =
            await userRepository.create(userData);

        const token =
            user.generateAccessToken();

        return {
            user,
            token,
        };
    }

    async login(email, password) {

        const user =
            await userRepository.findByEmail(email);

        if (!user) {
            throw new ApiError(
                401,
                "Invalid email or password."
            );
        }

        const isPasswordCorrect =
            await user.comparePassword(password);

        if (!isPasswordCorrect) {
            throw new ApiError(
                401,
                "Invalid email or password."
            );
        }

        await userRepository.updateLastLogin(user._id);

        const token =
            user.generateAccessToken();

        return {
            user,
            token,
        };
    }

}

export default new AuthService();