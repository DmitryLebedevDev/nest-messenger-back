import { Role } from "src/role/role.entity";
import { RolesId } from "src/role/enums/role.enum";

export function createDefaultRoles():Array<Role> {
  let owner = new Role();
      owner = {...owner,
               ...{
                  id: RolesId.owner,
                  isBannedUsers: true,
                  name: 'Owner',
                  isMuteUsers: true,
                  isDeleteUsersMesseges: true,
                  isDeleteYourMesseges: true
               }
      };
  let user = new Role();
      user = {...user,
              ...{
                  id: RolesId.user,
                  isBannedUsers: false,
                  name: 'User',
                  isMuteUsers: false,
                  isDeleteUsersMesseges: false,
                  isDeleteYourMesseges: true
              }
      }

  return [owner,user];
}