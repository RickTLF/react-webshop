import React, { Component } from "react";
import { Modal, toggleModal, ModalLauncher, ModalLauncherLink } from "./Misc/Modal";
import { LoginForm } from "./Forms/AccountForm";
import AccountService from "../Services/AccountService";

function LoginButton(props) {
  return (
    <button onClick={props.onClick} type={"button"} className={"btn btn-info"}>
      Login
    </button>
  );
}

// ===============================================================================

// FIXME: Fix logout function
export default class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      service: this.props.service == null ? new AccountService() : props.service,
      user: null
    };
  }

  handleNotification = service => {
    console.log('Hello world!')
    console.log(service)
    service.getUser().then(user => {
      this.props.notify(user);
    });
  };

  handleLogout = () => {
    // console.log(this.props)
    this.props.onClickLogout()
  }

  render() {
    return (
      <NavBarBase>
        {!(this.props.user == null) ? (
          <LoggedInNavBar
          onClickLogout={this.handleLogout} 
          user={this.props.user} />
        ) : (
          <DefaultNavBar
            service={this.state.service}
            notify={this.handleNotification}
          />
        )}
      </NavBarBase>
    );
  }
}

// ===============================================================================

function LoggedInNavBar(props) {
  return (
    <div>
      {!(props.user == null) && (
        <ul className={"navbar-nav ml-auto"}>
          <NavDropDown user={props.user}>
            <NavDropDownMenu>
              <NavDropDownItem href={'/account'}>Account</NavDropDownItem>
              <NavDropDownItem onClick={props.onClickLogout}>Logout</NavDropDownItem>
            </NavDropDownMenu>
          </NavDropDown>
          <NavLink href={"/cart"}>Cart</NavLink>
        </ul>
      )}
    </div>
  );
}

function DefaultNavBar(props) {
  return (
    <ul className={"navbar-nav ml-auto"}>
      <LoginNavLink service={props.service} notify={props.notify} />
      <SignUpNavLink />
      <NavLink href={"/cart"}>Cart</NavLink>
    </ul>
  );
}

// ===============================================================================

class LoginNavLink extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorMessage: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    let { email, password } = this.state;
    let { service } = this.props;
    const { notify } = this.props;
    if (!(service == null)) {
      if (service.login(email, password)) {
        toggleModal();
        notify(service);
      }
      this.setState({ errorMessage: service.getErrorMessage() });
    }
  };

  render() {
    return (
      <div>
        <NavLinkModalLauncher target={"login"}>Login</NavLinkModalLauncher>
        <Modal
          id={"login"}
          title={"Login"}
          actions={<LoginButton onClick={this.handleSubmit} />}
          center
        >
          <LoginForm
            onSubmit={this.handleSubmit}
            email={this.state.email}
            password={this.state.password}
            onChangeEmail={e => this.setState({ email: e.target.value })}
            onChangePassword={e => this.setState({ password: e.target.value })}
            errorMessage={this.state.errorMessage}
          />
        </Modal>
      </div>
    );
  }
}

function SignUpNavLink(props) {
  let signUpButton = (
    <button type={"button"} className={"btn btn-info"}>
      Sign up
    </button>
  );

  return (
    <div>
      <NavLinkModalLauncher target={"signUp"}>Sign up</NavLinkModalLauncher>
      <Modal id={"signUp"} title={"Sign up"} actions={signUpButton} center>
        <LoginForm />
      </Modal>
    </div>
  );
}

// ===============================================================================

function NavDropDown(props) {
  return (
    <li class="nav-item dropdown">
      <a
        class="nav-link dropdown-toggle"
        href="#"
        id="navbarDropdownMenuLink"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {!(props.user == null) ? props.user.email : "error user"}
      </a>
      {props.children}
    </li>
  );
}

function NavDropDownMenu(props) {
  return (
    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
      {props.children}
    </div>
  );
}

function NavDropDownItem(props) {
  return (
    <a onClick={props.onClick} class="dropdown-item bg-warning" href={props.href}>
      {props.children}
    </a>
  );
}

// ===============================================================================

function NavBarBase(props) {
  return (
    <nav className={"navbar navbar-expand-lg navbar-dark bg-dark"}>
      <NavToggler target={"navbarSupportedContent"} />
      <NavBarCollapse id={"navbarSupportedContent"}>
        <ul className={"navbar-nav mr-auto"}>
          <NavLink href={"/"}>Home</NavLink>
        </ul>
        {props.children}
      </NavBarCollapse>
    </nav>
  );
}

function NavBarCollapse(props) {
  return (
    <div className={"collapse navbar-collapse"} id={props.id}>
      {props.children}
    </div>
  );
}

function NavToggler(props) {
  return (
    <button
      className={"navbar-toggler"}
      type={"button"}
      data-toggle={"collapse"}
      data-target={`#${props.target}`}
      aria-controls={props.target}
      aria-expanded={"false"}
      aria-label={"Toggle navigation"}
    >
      <span className={"navbar-toggler-icon"} />
    </button>
  );
}

function NavLinkModalLauncher(props) {
  return (
    <li className={"nav-item"}>
      <ModalLauncherLink className={"nav-link"} target={props.target}>
        {props.children}
      </ModalLauncherLink>
    </li>
  );
}

function NavLink(props) {
  return (
    <li className={"nav-item"}>
      <a className={"nav-link"} href={props.href}>
        {props.children}
      </a>
    </li>
  );
}
