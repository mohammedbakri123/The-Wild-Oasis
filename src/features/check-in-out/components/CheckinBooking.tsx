import styled from "styled-components";
import BookingDataBox from "../../bookings/components/BookingDataBox";

import Row from "../../../core/ui/Row";
import Heading from "../../../core/ui/Heading";
import ButtonGroup from "../../../core/ui/ButtonGroup";
import Button from "../../../core/ui/Button";
import ButtonText from "../../../core/ui/ButtonText";

import { useMoveBack } from "../../../core/hooks/useMoveBack";
import { useBooking, useCheckin } from "../../bookings/hooks/useBooking";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ErrorFallback from "../../../core/ui/ErrorFallback";
import Spinner from "../../../core/ui/Spinner";
import Checkbox from "../../../core/ui/Checkbox";
import { useEffect, useState } from "react";
import { useSettings } from "../../settings/hooks/useSetting";
import { formatCurrency } from "../../../core/utils/helpers";

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
  const {
    data: setting,
    error: settingError,
    isLoading: isSettingLoading,
  } = useSettings();

  useEffect(() => {
    SetConfirmedPaid(booking?.is_paid ?? false);
  }, [booking]);

  const { checkin, isCheckingIn } = useCheckin();

  const [confirmedPaid, SetConfirmedPaid] = useState(false);
  const [hasBreakfast, SetHasBreakfast] = useState(
    booking?.has_breakfast ?? false,
  );
  useEffect(() => {
    SetHasBreakfast(booking?.has_breakfast ?? false);
  }, [booking]);
  const moveBack = useMoveBack();
  const navigator = useNavigate();
  function handleCheckin() {
    if (!booking || !setting) return;
    checkin({
      id: Number(bookingId),
      data: {
        status: "checked-in",
        is_paid: true,
        has_breakfast: hasBreakfast,
        extra_price: booking.extra_price + setting.breakfast_price,
        total_price: booking.total_price + setting.breakfast_price,
      },
    });
    navigator(`/bookings/${booking.id}`);
  }

  if (isPending || isSettingLoading) return <Spinner />;

  if (settingError) {
    toast.error(settingError.message);
    return (
      <ErrorFallback
        header="Faild to Fetch Booking"
        message={settingError.message}
      />
    );
  }
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
  if (!setting) {
    return (
      <ErrorFallback
        header="Faild to Fetch setting"
        message="Faild to Fetch breakfast Price"
      />
    );
  }

  return (
    <Row type="vertical">
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{booking?.id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Box>
        <Checkbox
          checked={hasBreakfast}
          onChange={() => SetHasBreakfast((v) => !v)}
          id="breakfast"
          disabled={booking.status !== "unconfirmed" || booking.has_breakfast}
        >
          {booking.has_breakfast
            ? "Breakfast already included in this booking"
            : `Add breakfast for ${booking.guests?.full_name}?`}
        </Checkbox>
      </Box>
      <Box>
        <Checkbox
          checked={confirmedPaid}
          onChange={() => SetConfirmedPaid((v) => !v)}
          id="confirm"
          disabled={booking.is_paid}
        >
          I confirm that {booking.guests?.full_name} has paid the total amount
          of{" "}
          {!hasBreakfast
            ? formatCurrency(booking.total_price)
            : `${formatCurrency(booking.total_price + setting.breakfast_price)} (${formatCurrency(booking.total_price)} + ${formatCurrency(setting.breakfast_price)})`}{" "}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={
            booking.status != "unconfirmed" || !confirmedPaid || isCheckingIn
          }
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </Row>
  );
}

export default CheckinBooking;
