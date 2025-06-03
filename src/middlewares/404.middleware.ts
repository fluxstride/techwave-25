import { NextFunction, Request, Response } from "express";

function pageNotFoundMiddleware(req: Request, res: Response, _: NextFunction) {
  res.status(404).json({
    success: false,
    message: `${req.method} '${req.url}' not found`,
  });
}

export default pageNotFoundMiddleware;
