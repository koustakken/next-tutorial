import { CookieSerializeOptions } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export type CookieArgs = {
  name: string;
  value: any;
  options?: CookieSerializeOptions;
};

export type NextApiResponseWithCookie = NextApiResponse & {
  cookie: (args: CookieArgs) => void;
};

export type NextApiHandlerWithCookie = (
  req: NextApiRequest,
  res: NextApiResponseWithCookie
) => unknown | Promise<unknown>;

export type CookiesMiddleware = (
  handler: NextApiHandlerWithCookie
) => (req: NextApiRequest, res: NextApiResponseWithCookie) => void;
