import { BuildController } from "./controllers/buildController.js";
import { LMDB } from "./db/lmdb.js";
import { BuildModel } from "./models/buildModel.js";

import { BuildService } from "./services/buildService.js";

// Db
export const lmdb = new LMDB("./src/db/data/builds").connectOrThrow();

// Models
export const buildModel = new BuildModel(lmdb);

// Services
export const buildService = new BuildService(buildModel);

// Controllers
export const buildController = new BuildController(buildService, buildModel);
