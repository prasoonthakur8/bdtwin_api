import { dirname, join } from "path";
import { fileURLToPath } from "url";

const setDirname = async (req) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, `../views/${req}`);

  return filePath;
};

export { setDirname };
