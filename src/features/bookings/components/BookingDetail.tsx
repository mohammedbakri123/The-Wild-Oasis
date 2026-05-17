import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../../core/ui/Row";
import Heading from "../../../core/ui/Heading";
import Tag from "../../../core/ui/Tag";
import ButtonGroup from "../../../core/ui/ButtonGroup";
import Button from "../../../core/ui/Button";
import ButtonText from "../../../core/ui/ButtonText";

import { useMoveBack } from "../../../core/hooks/useMoveBack";
import { useBooking, useCheckout, useDeleteBooking } from "../hooks/useBooking";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../core/ui/Spinner";
import ErrorFallback from "../../../core/ui/ErrorFallback";
import toast from "react-hot-toast";
import Model from "../../../core/ui/Model";
import ConfirmDialog from "../../../core/ui/ConfirmDialog";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { bookingId } = useParams();

  const { data: booking, error, isPending } = useBooking(Number(bookingId));
  const status = booking?.status || "checked-in";
  const { checkout, isCheckingOut } = useCheckout();
  const { isDeleting, deleteBooking: deleteBookingMutation } =
    useDeleteBooking();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

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

  function handleCheckOut() {
    if (!booking) return;
    checkout({
      id: Number(booking.id),
      data: {
        status: "checked-out",
      },
    });
  }
  function handleDelete() {
    if (!booking) return;
    deleteBookingMutation(booking.id, {
      onSuccess: () => navigate("/bookings"),
    });
  }
  return (
    <Row type="vertical">
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking?.id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {booking.status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${booking.id}`)}>
            Check in
          </Button>
        )}
        {booking.status === "checked-in" && (
          <Button disabled={isCheckingOut} onClick={handleCheckOut}>
            Check out
          </Button>
        )}
        <Model>
          <Model.Open opens="confirm-delete">
            <Button variation="danger">Delete Booking</Button>
          </Model.Open>
          <Model.Window name="confirm-delete">
            <ConfirmDialog
              title="Delete Booking"
              message="Are you sure you want to delete this Booking permanently? This action cannot be undone."
              buttonText="Delete"
              disabled={isDeleting}
              onConfirm={handleDelete}
            />
          </Model.Window>
        </Model>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </Row>
  );
}

export default BookingDetail;
