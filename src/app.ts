import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import router from "./app/routes";
import globalErrorHandler from "./app/modules/middleware/globalErrorHandler";
import notFound from "./app/modules/middleware/notFound";
import httpStatus from "http-status";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: "Hello Developer! App is Running",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
