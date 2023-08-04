import userService from "../service/user-service";
import { Response, Request } from "express";
import httpStatus from "http-status";

export async function createUser(req: Request, res: Response) {
  const { email, username, password } = req.body;

  try {
    const user = await userService.createUser({ email, username, password });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    if (error.name === "DuplicatedEmailError" || error.name === "DuplicatedUsernameError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
