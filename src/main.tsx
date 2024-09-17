import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { ConfigProvider } from "antd";
import { COLORS } from "./helpers/colors.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider
        input={{
          style: {
            height: 48,
          },
        }}
        button={{
          style: {
            height: 40,
          },
        }}
        theme={{
          token: {
            colorPrimary: COLORS.primary,
            colorPrimaryText: COLORS.primary,
          },
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  </StrictMode>
);
