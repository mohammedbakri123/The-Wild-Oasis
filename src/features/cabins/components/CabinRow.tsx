import styled from "styled-components";
import type { Cabin } from "../types";
import { formatCurrency } from "../../../core/utils/helpers";
import Button from "../../../core/ui/Button";
import { useDeleteCabin } from "../hooks/useCabins";
import Row from "../../../core/ui/Row";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
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
  const deleteCabin = useDeleteCabin();
  const handleDelete = (id: number) => {
    deleteCabin.mutate(id); // Pass the cabin ID
  };

  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <TableRow>
        <Img src={cabin.image} />
        <Cabin>{cabin.name}</Cabin>
        <Capacity>fits up to {cabin.max_capacity} guests</Capacity>
        <Price>{formatCurrency(cabin.regular_price)}</Price>
        <Discount>{formatCurrency(cabin.discount)}</Discount>
        <Row>
          <Button
            onClick={() => handleDelete(cabin.id)}
            disabled={deleteCabin.isPending}
          >
            Delete
          </Button>
          <Button onClick={() => setShowForm((v) => !v)}>Edit</Button>
        </Row>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}
