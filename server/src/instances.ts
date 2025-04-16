import { BuildController } from "./controllers/buildController.js";
import { LMDB } from "./db/lmdb.js";

import { BuildService } from "./services/buildService.js";

// Db
export const lmdb = new LMDB("./db/data/builds").connectOrThrow();

// Models

// Services
export const buildService = new BuildService();

// Controllers
export const buildController = new BuildController(buildService);
