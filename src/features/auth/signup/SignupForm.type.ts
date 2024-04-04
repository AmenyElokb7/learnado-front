import { UserRoleEnum } from "shared/enums/SharedEnums";
import { MediaApi } from "types/models/Media";

export type RegisterBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRoleEnum;
  media: MediaApi[];
};
export type SignupUserType = {
  id: number;
  label: string;
};
