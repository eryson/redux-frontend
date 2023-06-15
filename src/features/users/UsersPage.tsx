import { Container } from "@mui/material";
import { useAppSelector } from "../../store/hooks";

export default function UsersPage() {
  const { users } = useAppSelector((state) => state.users);

  return (
    <Container>
      <h2>Users Page</h2>
      <ul>
        {users &&
          users.map((user) => (
            <li key={user.id}>
              <h4>{user.name}</h4>
            </li>
          ))}
      </ul>
    </Container>
  );
}
