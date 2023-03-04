// Mediator Design Pattern
// -----------------------

// Mediator is a behavioral design pattern that lets you reduce
// chaotic dependencies between objects. The pattern restricts
// direct communications between the objects and forces them
// to collaborate only via a mediator object.

// Problem:
// Imagine that you have a chat application, and you have a lot
// of users, and each user can send messages to other users,
// and you have a lot of users, so you would have to create a
// lot of classes for each user, and each user would have a lot
// of properties, so you would end up with a lot of classes.

// Fortunately, you can use the Mediator Pattern to solve this
// problem.

import React, { useState } from "react";

interface AuthenticationDialogProps {
  title: string;
  mediator: Mediator;
}

interface Mediator {
  login(credentials: LoginCredentials): void;
}

interface LoginCredentials {
  username: string;
  password: string;
  rememberMe: boolean;
}

interface AuthenticationService {
  authenticate(credentials: LoginCredentials): void;
}

class Authenticator implements AuthenticationService {
  authenticate(credentials: LoginCredentials): void {
    console.log(`Authenticating with username ${credentials.username}, password ${credentials.password}, and rememberMe ${credentials.rememberMe}`);
    // ... handle the authentication request
  }
}

class AuthenticationMediator implements Mediator {
  private authService: AuthenticationService;

  constructor(authService: AuthenticationService) {
    this.authService = authService;
  }

  login(credentials: LoginCredentials): void {
    this.authService.authenticate(credentials);
  }
}

const AuthenticationDialog = ({ title, mediator }: AuthenticationDialogProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    mediator.login({ username, password, rememberMe });
  };

  return (
    <div>
      <h2>{title}</h2>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="rememberMe">Remember Me</label>
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={(event) => setRememberMe(event.target.checked)}
        />
      </div>
      <div>
        <button onClick={handleLogin}>Ok</button>
        <button>Cancel</button>
      </div>
    </div>
  );
};

// Usage

const authService = new Authenticator();
const mediator = new AuthenticationMediator(authService);

const App = () => {
  return (
    <div>
      <AuthenticationDialog title="Login" mediator={mediator} />
    </div>
  );
};

export default App;
