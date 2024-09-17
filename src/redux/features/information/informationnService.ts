import { httpRequest } from "../../../helpers/api";
import { BaseResponseListProps } from "../../../types/core.type";
import { IBanner, IService } from "../../../types/information.type";

const getServices = async () => {
  const res = await httpRequest.get<BaseResponseListProps<IService>>(
    "/services"
  );

  return res.data;
};

const getBanners = async () => {
  const res = await httpRequest.get<BaseResponseListProps<IBanner>>("/banner");

  return res.data;
};

const informationService = {
  getServices,
  getBanners,
};

export default informationService;
