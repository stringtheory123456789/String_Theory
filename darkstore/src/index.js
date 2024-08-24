
import React from "react";
import { createRoot} from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import {store} from "./redux/store.js"
import { Provider } from 'react-redux'
import { VisionUIControllerProvider } from "context";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);


root.render(<BrowserRouter>
  <VisionUIControllerProvider>
  <Provider store={store}>
    <App />
    </Provider>
  </VisionUIControllerProvider>
</BrowserRouter>)

