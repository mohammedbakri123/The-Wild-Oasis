import styled from "styled-components";
import BookingDataBox from "../../bookings/components/BookingDataBox";

import Row from "../../../core/ui/Row";
import Heading from "../../../core/ui/Heading";
import ButtonGroup from "../../../core/ui/ButtonGroup";
import Button from "../../../core/ui/Button";
import ButtonText from "../../../core/ui/ButtonText";

import { useMoveBack } from "../../../core/hooks/useMoveBack";
import { useBooking } from "../../bookings/hooks/useBooking";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ErrorFallback from "../../../core/ui/ErrorFallback";
import Spinner from "../../../core/ui/Spinner";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { bookingId } = useParams();

  const { data: booking, error, isPending } = useBooking(Number(bookingId));
  const moveBack = useMoveBack();

  if (isPending) return <Spinner />;

  if (error) {
    toast.error(error.message);
    return (
      <ErrorFallback header="Faild to Fetch Booking" message={error.message} />
    );
  }
  if (!booking) {
    return (
      <ErrorFallback
        header="Faild to Fetch Booking"
        message="Faild to Fetch Booking"
      />
    );
  }

  function handleCheckin() {}

  return (
    <Row type="vertical">
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{booking?.id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </Row>
  );
}

export default CheckinBooking;
