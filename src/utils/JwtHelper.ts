import jwt, { VerifyErrors } from "jsonwebtoken";

const ACCESS_TOKEN_EXPIRATION = "10h";
const REFRESH_TOKEN_EXPIRATION = "2d";

export interface UserPayload {
  id: number;
  username: string;
}

export async function jwtToken({ id, username }: UserPayload) {
  const user = { id, username };

  const accessToken = jwt.sign(user, process.env.JWT_PRIVATE_KEY, { expiresIn: ACCESS_TOKEN_EXPIRATION });
  const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_KEY, { expiresIn: REFRESH_TOKEN_EXPIRATION });

  return { accessToken, refreshToken };
}

export async function jwtVerify(refreshToken: string): Promise<UserPayload> {
  return new Promise((resolve, reject) => {
      jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (error: VerifyErrors | null, user: UserPayload) => {
          if (error) {
              reject(error);
          } else {
              resolve(user);
          }
      });
  });
}