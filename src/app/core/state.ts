import { Features } from "./features";
import * as fromUser from "../components/authentication/core/store/auth.reducer";
import { AuthState } from "../components/authentication/core/types/auth.types";

export interface AppState {
  [Features.User]: AuthState;
}

export const AppReducers = {
  [Features.User]: fromUser.authReducer
};
