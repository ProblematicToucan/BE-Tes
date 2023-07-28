import jwt from "jsonwebtoken";
import { jwtPrivateKey, jwtRefreshKey } from "./Constant";

interface User {
  id: number;
  username: string;
}

export default function jwtToken({id, username}: User) {


  const user = { id, username };

  const accessToken = jwt.sign(user, jwtPrivateKey, { expiresIn: '10h' });
  const refreshToken = jwt.sign(user, jwtRefreshKey, { expiresIn: '7d' });

  return { accessToken, refreshToken };
}
