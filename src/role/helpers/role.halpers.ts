import { Role } from "src/role/role.entity";
import { RoleName } from "../enums/role.enum";

export function createDefaultOwnerRole() {
  let owner = new Role();
      owner = {...owner,
              ...{
                  isBannedUsers: true,
                  name: RoleName.owner,
                  isMuteUsers: true,
                  isDeleteUsersMesseges: true,
                  isDeleteYourMesseges: true
              }
      };
  return owner;
}
export function createDefaultUserRole() {
  let user = new Role();
      user = {...user,
              ...{
                  isBannedUsers: false,
                  name: RoleName.user,
                  isMuteUsers: false,
                  isDeleteUsersMesseges: false,
                  isDeleteYourMesseges: true
              }
      }
  return user;
}