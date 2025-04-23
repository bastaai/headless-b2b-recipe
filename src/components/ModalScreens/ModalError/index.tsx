
import { Modal } from "../../Modal";

export type ModalErrorProps = {
  isOpen: boolean;
  onClose(): void;
  error: string;
};

export const ModalError: React.FC<ModalErrorProps> = (props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <p>error</p>
    </Modal>
  );
};
