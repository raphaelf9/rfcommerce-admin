"use client";

import { useModalStore } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";

export const StoreModal = () => {
  const storeModal = useModalStore();
  return (
    <Modal
      title="create store"
      description="Add nova loja para gerenciar produtos e suas categorias"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}>
      Futuro formulário de criação da loja
    </Modal>
  );
};