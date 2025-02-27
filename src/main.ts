import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import { api } from "./routes/api";
import { isAuthorized } from "./middleware/authentication";

const app: Application = express();

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: true }));

// routes
app.all("*", isAuthorized);
app.use(api);

export default app;
