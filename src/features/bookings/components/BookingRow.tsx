import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../../core/ui/Tag";
import Table from "../../../core/ui/Table";

import { formatCurrency } from "../../../core/utils/helpers";
import { formatDistanceFromNow } from "../../../core/utils/helpers";
import type { Booking } from "../types";
import Menus from "../../../core/ui/Menus";

import { HiArrowDownOnSquare, HiEye } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

interface BookingRowProps {
  booking: Booking;
}

function BookingRow({ booking }: BookingRowProps) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const navigate = useNavigate();

  return (
    <Table.Row>
      <Cabin>{booking.cabins?.name}</Cabin>

      <Stacked>
        <span>{booking.guests?.full_name}</span>
        <span>{booking.guests?.email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(booking.start_date))
            ? "Today"
            : formatDistanceFromNow(booking.start_date)}{" "}
          &rarr; {booking.num_nights} night stay
        </span>
        <span>
          {format(new Date(booking.start_date), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(booking.end_date), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[booking.status]}>
        {booking.status.replace("-", " ")}
      </Tag>

      <Amount>{formatCurrency(booking.total_price)}</Amount>
      <Menus.Menu>
        <Menus.Toggle id={`${booking.id}`} />
        <Menus.List id={`${booking.id}`}>
          <Menus.Button
            onClick={() => navigate(`/bookings/${booking.id}`)}
            icon={<HiEye />}
          >
            See Details
          </Menus.Button>
          {booking.status === "unconfirmed" && (
            <Menus.Button
              onClick={() => navigate(`/checkin/${booking.id}`)}
              icon={<HiArrowDownOnSquare />}
            >
              Check in
            </Menus.Button>
          )}
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}

export default BookingRow;
