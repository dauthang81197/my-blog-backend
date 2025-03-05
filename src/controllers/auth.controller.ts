import { Request, Response } from "express";

import { AppDataSource } from "../databases/data-source";
import { User } from "../entity/User";
import { AuthService } from "../services/auth.services";

export class AuthController {
  private authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }
  async login(req: Request, res: Response): Promise<any> {
    return await this.authService.login(req, res);
  }

  async getProfile(req: Request, res: Response): Promise<any> {
    if (!req[" currentUser"]) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: req[" currentUser"].id },
    });
    return res.status(200).json({ ...user, password: undefined });
  }
}
