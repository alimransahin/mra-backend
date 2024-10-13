import { Activity } from "./activity.model";

const getAllActivityFromDB = async () => {
  const result = await Activity.find().populate("userId");
  return result;
};
export default getAllActivityFromDB;
