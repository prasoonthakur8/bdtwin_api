import { setDirname } from "../services/viewsPathService.js";

const index = async (req, res) => {
  const resopnse = await setDirname('index.html');
  
  return res.sendFile(resopnse);
};

export { index };
