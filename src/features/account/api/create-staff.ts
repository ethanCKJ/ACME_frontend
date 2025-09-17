import {IFormInputCreateStaff} from "../../../pages/account/StaffSignupPage";
import api from "../../../utils/api";
import {AxiosError} from "axios";

export interface createStaffProps {
  data: IFormInputCreateStaff
  reset: () => void,
}

export const createStaff = async ({data, reset}: createStaffProps) => {
  try {
    await api.post("/signup/staff", {
      username: data.username,
      password: data.password,
      staffName: data.staffName,
    });
    alert("Successfully created new staff member");
    reset();
  } catch (e: AxiosError) {
    if (e.response.data.status && e.response.data.status !== "success") {
      alert("Unable to create staff. " + e.response.data.debug);
    }
    console.error(e);
  }
}