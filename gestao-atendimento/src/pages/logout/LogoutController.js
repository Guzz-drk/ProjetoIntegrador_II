import { useEffect } from "react";

function LogoutController() {
  useEffect(() => {
    localStorage.removeItem("token");
    window.location = "/";
  }, []);
}
export default LogoutController;
