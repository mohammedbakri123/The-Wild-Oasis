import BookingRow from "./BookingRow";
import Table from "../../../core/ui/Table";
import Menus from "../../../core/ui/Menus";
import { useBookings } from "../hooks/useBooking";
import ErrorFallback from "../../../core/ui/ErrorFallback";
import toast from "react-hot-toast";
import Spinner from "../../../core/ui/Spinner";

function BookingTable() {
  const { data: bookings, error, isPending } = useBookings();
  console.log(bookings);

  if (error) {
    toast.error(error.message);
    return (
      <ErrorFallback header="Error Fetching Bookings" message={error.message} />
    );
  }

  // if (!bookings?.length) return <Empty resource={"Bookings"} />;

  if (isPending) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
