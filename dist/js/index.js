import { logOut } from "./components/log-out.js";
import { loggedIn } from "./components/logged-in.js";

const logOutBtn = document.querySelector(".log-out");
const token = loggedIn();

logOutBtn.onclick = () => logOut();
