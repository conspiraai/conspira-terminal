// src/App.tsx
import React from "react";
import { Route, Switch } from "wouter";
import Home from "./pages/home";
import Scanner from "./pages/scanner";

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/scanner" component={Scanner} />
      <Route> <div style={{padding:32}}>Not found</div> </Route>
    </Switch>
  );
}
