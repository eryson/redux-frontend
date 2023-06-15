import { Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUserById } from "./usersSlice";

export default function SingleUserPage() {
  const dispatch = useAppDispatch();
  const { singleUser } = useAppSelector((state) => state.users);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      alert("null id");
      return;
    }
    dispatch(getUserById(id));
  }, [id]);

  return (
    <Container>
      <Grid container>
        <ul>
          <Grid>
            <h4>ID: {singleUser?.id}</h4>
          </Grid>
          <Grid>
            <h4>Name: {singleUser?.name}</h4>
          </Grid>
          <Grid>
            <h4>Username: {singleUser?.username}</h4>
          </Grid>
          <Grid>
            <h4>Email: {singleUser?.email}</h4>
          </Grid>
        </ul>
      </Grid>
    </Container>
  );
}
