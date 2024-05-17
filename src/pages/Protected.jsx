import { useAuthGuard } from "../auth/customHooks";

export const Protected = () => {
  const user = useAuthGuard();

  if (!user) return <h1>Error</h1>;
  return <h1>Protected Page{user.id}</h1>;
};
