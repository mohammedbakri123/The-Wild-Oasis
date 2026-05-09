import styled from "styled-components";

import type { Cabin } from "../types";
import { formatCurrency } from "../../../core/utils/helpers";
import { useCreateCabin, useDeleteCabin } from "../hooks/useCabins";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../../core/ui/Modal";
import ConfirmDialog from "../../../core/ui/ConfirmDialog";

import { HiPencil, HiTrash } from "react-icons/hi2";
import { HiOutlineDuplicate } from "react-icons/hi";

interface CabinRowProps {
  cabin: Cabin;
}

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  border-radius: var(--border-radius-tiny);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;
const Capacity = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }: CabinRowProps) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  function HandleDublicate() {
    const cleanData = {
      name: cabin.name,
      max_capacity: cabin.max_capacity,
      regular_price: cabin.regular_price,
      discount: cabin.discount,
      description: cabin.description,
      image: cabin.image,
    };
    createCabin(cleanData);
  }

  return (
    <TableRow>
      <Img src={cabin.image} />
      <Cabin>{cabin.name}</Cabin>
      <Capacity>fits up to {cabin.max_capacity} guests</Capacity>
      <Price>{formatCurrency(cabin.regular_price)}</Price>
      <Discount>{formatCurrency(cabin.discount)}</Discount>
      <div>
        <Modal>
          <Modal.Open opens="edit">
            <button
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                padding: "0.4rem",
              }}
            >
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Open opens="delete">
            <button
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                padding: "0.4rem",
              }}
            >
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDialog
              title="Delete cabin"
              message="Are you sure you want to delete this cabin permanently? This action cannot be undone."
              buttonText="Delete"
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabin.id)}
            />
          </Modal.Window>
          <Modal.Open opens="dublicate">
            <button
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                padding: "0.4rem",
              }}
            >
              <HiOutlineDuplicate />
            </button>
          </Modal.Open>
          <Modal.Window name="dublicate">
            <ConfirmDialog
              title="Dublicate cabin"
              message="Are you sure you want to Dublicate this cabin?"
              buttonText="Dublicate"
              buttonVariation="primary"
              disabled={isCreating}
              onConfirm={HandleDublicate}
            />
          </Modal.Window>
        </Modal>
      </div>
    </TableRow>
  );
}
