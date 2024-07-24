import { ref } from 'vue';
import type ToastNotification from "@/UI/ToastNotification/ToastNotification.vue";

export function callToast() {
    const toastRef = ref<typeof ToastNotification | null>(null);

    const showToast = (title:string,message:string) => {
        if (toastRef.value) {
            toastRef.value.notify(title, message);
        }
    };

    return {
        toastRef,
        showToast,
    };
}