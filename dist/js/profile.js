import { logOut } from "./components/log-out.mjs";
import { loggedIn } from "./components/logged-in.mjs";

const logOutBtn = document.querySelector(".log-out");
const token = loggedIn();

logOutBtn.onclick = () => logOut();
