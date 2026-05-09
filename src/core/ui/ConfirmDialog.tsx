import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDialog({
  title,
  message,
  buttonText,
  buttonVariation = "danger",
  onConfirm,
  disabled,
  onCloseModal,
}: {
  title: string;
  message: string;
  buttonText: string;
  buttonVariation?: "primary" | "secondary" | "danger";
  onConfirm: () => void;
  disabled?: boolean;
  onCloseModal?: () => void;
}) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">{title}</Heading>
      <p>{message}</p>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button
          variation={buttonVariation}
          disabled={disabled}
          onClick={onConfirm}
        >
          {buttonText}
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDialog;
