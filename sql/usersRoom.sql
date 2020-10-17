select "user".*, role.name from public.room
		 inner join public.room_to_user r_u
		 	on room."id" = r_u."roomId" and room."name" = 'test1233g446ggjh53f3fgf'
		 inner join public.role role
		 	on r_u."roleId" = role."id"
		 inner join public.user "user"
		 	on "user"."id" = r_u."userId"