import { publicRequest, userRequest } from "../requestMethods"
import { loginFailure, loginStart, loginSuccess, updateUser } from "./userRedux"

export const login = async (dispatch, user) => {
     dispatch(loginStart());
     try {
        const res = await publicRequest.post("auth/login", user);
        dispatch(loginSuccess(res.data))
     } catch (error) {
        dispatch(loginFailure())
     }
}
export const update = async (dispatch, id, user) => {
     
     try {
        const res = await userRequest.put(`users/${id}`, user);
        dispatch(updateUser(res.data))
     } catch (error) {
        console.log(error)
     }
}

