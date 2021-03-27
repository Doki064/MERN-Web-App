import {Redirect} from "react-router-dom";

function Dashboard() {
    if (sessionStorage.getItem("session")) {
        const username = JSON.parse(sessionStorage.getItem("session")).username;
        return (
            <Redirect to={`/dashboard/${username}`} />
        )
    }
    return (
        <Redirect to={"/login"} />
    )
}

export default Dashboard;
