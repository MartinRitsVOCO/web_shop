import sequelize from "../util/db.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const models = {};

const init = async () => {
    if (!Object.keys(models).length) {
        const files = fs.readdirSync(__dirname);
        const excludedFiles = ['.', '..', 'index.js'];

        for (const fileName of files) {
            if (
                !excludedFiles.includes(fileName) &&
                path.extname(fileName) === '.js'
            ) {
                const modelModule = await import(path.join(__dirname, fileName));
                // Support both default and named exports
                const modelFile = modelModule.default || modelModule;
                models[modelFile.getTableName()] = modelFile;
            }
        }

        Object.values(models).forEach((model) => {
            if (typeof model.associate === 'function') {
                model.associate(models);
            }
        });

        models.sequelize = sequelize;
    }

    return models;
};

export default init;