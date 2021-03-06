import axios from "./axios";

//if the user is logged in, let him get in
export async function getCurrentUser(setLoggedIn, setUser) {
  try {
    const response = await axios.get("/auth/users/me");
    if (response.data.is_active) {
      setUser(response.data); //user data(info)
      setLoggedIn(true);
    }
  } catch (err) {
    if (err.response) {
      setUser({}); // missing user credential
    }
  }
}
