import { changeUserProfile } from "../../services/auth/userProfileInformationService.js";

const changeUserProfileInformation = async (req, res) => {
  const response = await changeUserProfile(req);

  const status = response.status || 200;

  return res.status(status).json(response);
};

export { changeUserProfileInformation };
