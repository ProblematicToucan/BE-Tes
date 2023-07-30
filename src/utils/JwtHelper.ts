import jwt, { VerifyErrors } from "jsonwebtoken";
import { IUser } from "../models/UserModel";

const ACCESS_TOKEN_EXPIRATION = "10h";
const REFRESH_TOKEN_EXPIRATION = "2d";

export async function jwtToken({ id, username }: IUser) {
  const user = { id, username };

  const accessToken = jwt.sign(user, process.env.JWT_PRIVATE_KEY, { expiresIn: ACCESS_TOKEN_EXPIRATION });
  const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_KEY, { expiresIn: REFRESH_TOKEN_EXPIRATION });

  return { accessToken, refreshToken };
}

export async function jwtVerify(refreshToken: string): Promise<IUser> {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (error: VerifyErrors | null, user: IUser) => {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  });
}