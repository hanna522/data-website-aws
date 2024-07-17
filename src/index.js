import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

reportWebVitals();
