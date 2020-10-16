import { Role } from "src/role/role.entity";

export function createDefaultOwnerRole() {
  let owner = new Role();
      owner = {...owner,
              ...{
                  isBannedUsers: true,
                  name: 'Owner',
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
                  name: 'User',
                  isMuteUsers: false,
                  isDeleteUsersMesseges: false,
                  isDeleteYourMesseges: true
              }
      }
  return user;
}