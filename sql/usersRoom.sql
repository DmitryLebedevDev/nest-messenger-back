select room.id as roomId, "user".*, role.name from public.room room
	inner join public.room_to_user r_u
		on r_u."roomId" = room."id"
	inner join public.role role
		on r_u."roleId" = role."id"
	inner join public.user "user"
		on r_u."userId" = "user"."id"