import { useState } from "react";

export function useOpenModal() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return {
    isOpenModal,
    openModal: () => setIsOpenModal(true),
    closeModal: () => setIsOpenModal(false),
  };
}
