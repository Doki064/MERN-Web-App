import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";

import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import RegisterForm from "./components/Login/RegisterForm";
import LoginForm from "./components/Login/Login";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  if (sessionStorage.getItem("session")) {
    return (
        <div className="App">
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href={"/"}>Home</Nav.Link>
                <Nav.Link href={`/dashboard`}>Dashboard</Nav.Link>
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route exact path={"/"}>
              <HomePage />
            </Route>
            <Route exact path={"/login"}>
              <LoginForm />
            </Route>
            <Route exact path={"/dashboard"}>
              <Dashboard />
            </Route>
          </Switch>
        </div>
    )
  }
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href={"/"}>Home</Nav.Link>
            <Nav.Link href={"/login"}>Log In</Nav.Link>
            <Nav.Link href={"/register"}>Sign Up</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route exact path={"/"}>
          <HomePage />
        </Route>
        <Route exact path={"/login"}>
          <LoginForm />
        </Route>
        <Route exact path={"/register"}>
          <RegisterForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
