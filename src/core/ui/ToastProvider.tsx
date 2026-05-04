import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{ margin: "8px" }}
      toastOptions={{
        style: {
          background: "var(--color-grey-50)",
          color: "var(--color-grey-700)",
          padding: "16px",
          borderRadius: "12px",
          fontSize: "14px",
        },

        success: {
          iconTheme: {
            primary: "var(--color-green-700)",
            secondary: "var(--color-green-100)",
          },
        },

        error: {
          iconTheme: {
            primary: "var(--color-red-700)",
            secondary: "var(--color-red-100)",
          },
        },
      }}
    />
  );
}
