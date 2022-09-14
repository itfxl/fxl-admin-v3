
import request from "@/api/request";
import type { ListResult, UserFilter, UserType } from "@/api/types";

const me = (): Promise<UserType> => {
  return request.get("/users/me");
};

const list =(filter: UserFilter):Promise<ListResult<UserType
>> => {
return request.get("/users",{
  params:filter,
})
}


export default {
  me,
  list
};

