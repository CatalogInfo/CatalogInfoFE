interface ToastMessageOptions {
    severity: "success" | "info" | "warn" | "error";
    summary: string;
    detail: string;
    life: number;
  }
  
  interface ToastService {
    add: (message: ToastMessageOptions) => void;
  }
  
  export default class ToastManager {
    private static toast: ToastService;
  
    static injectToastService(toastService: ToastService) {
      this.toast = toastService;
    }
  
    static showSuccessToast(message: string) {
      this.toast.add({
        severity: "success",
        summary: "Success",
        detail: message,
        life: 2000,
      });
    }
  
    static showErrorToast(message: string) {
      this.toast.add({
        severity: "error",
        summary: "Error",
        detail: message,
        life: 2000,
      });
    }
  }
  