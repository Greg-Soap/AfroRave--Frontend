import BaseModal from "@/components/reusable/base-modal";
import SignupForm from "./signup-form";

export default function SignupModal() {
  return (
    <BaseModal
      open={false}
      cancelOnOverlay
      disableOverlayClick
      floatingCancel
      size="small"
    >
      <SignupForm />
    </BaseModal>
  );
}
