import Heading from "../../../core/ui/Heading";
import Row from "../../../core/ui/Row";
import BookingTable from "../components/BookingTable";
import BookingTableOperations from "../components/BookingTableOperations";

function Bookings() {
  return (
    <Row type="vertical">
      <Row>
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>
      <BookingTable />
    </Row>
  );
}

export default Bookings;
