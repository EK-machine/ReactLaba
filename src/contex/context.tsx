import React from "react";

const LoggedInContext = React.createContext(false);
export const LoggedInProvider = LoggedInContext.Provider;
export const LoggedInConsumer = LoggedInContext.Consumer;

const UserNameContext = React.createContext("");
export const UserNameProvider = UserNameContext.Provider;
export const UserNameConsumer = UserNameContext.Consumer;
