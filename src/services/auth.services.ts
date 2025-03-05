import { Request, Response } from "express";

import { AppDataSource } from "../databases/data-source";
import { User } from "../entity/User";
import { encrypt } from "../helpers/encrypt";
import { loginSchema } from "../schema/login.schema";

export class AuthService {
  async login(req: Request, res: Response): Promise<any> {
    try {
      const { email, password } = loginSchema.parse(req.body);

      if (!email || !password) {
        return res
          .status(500)
          .json({ message: " email and password required" });
      }

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { email } });
      console.log(user, "fakdsh");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const isPasswordValid = encrypt.comparepassword(user.password, password);
      if (!user || !isPasswordValid) {
        return res.status(404).json({ message: "User not found" });
      }
      const token = encrypt.generateToken({ id: user.id });

      return res.status(200).json({ message: "Login successful", user, token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
