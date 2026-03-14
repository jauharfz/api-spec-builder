import type { Notification as NotificationType } from "@/types";

interface NotificationToastProps {
    notification: NotificationType | null;
}

export function NotificationToast({ notification }: NotificationToastProps) {
    if (!notification) return null;

    const isSuccess = notification.type === "success";

    return (
        <div
            className={[
                "fixed bottom-5 right-5 z-50 rounded-lg border px-4 py-2.5",
                "text-[13px] font-medium shadow-lg",
                isSuccess
                    ? "border-[var(--success-border)] bg-[var(--success-bg)] text-[var(--success-text)]"
                    : "border-[var(--danger-border)] bg-[var(--danger-bg)] text-[var(--danger-text)]",
            ].join(" ")}
        >
            {notification.message}
        </div>
    );
}