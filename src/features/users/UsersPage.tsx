import { Button, Container, Grid } from "@mui/material";
import React, { MouseEvent, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { updateUser } from "./usersSlice";

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = {
      id: 1,
      email: "teste@mail.com",
    };

    dispatch(updateUser(data));
  };

  return (
    <Container>
      <Grid>
        <ul>
          {users &&
            users.map((user) => (
              <Grid key={user.id} xs={4} item={true}>
                <h4>
                  {user.name} - {user.email}
                </h4>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disableElevation
                >
                  Update
                </Button>
              </Grid>
            ))}
        </ul>
      </Grid>
    </Container>
  );
}
