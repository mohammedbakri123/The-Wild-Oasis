import Heading from "../../core/ui/Heading";
import Row from "../../core/ui/Row";
import Button from "../../core/ui/Button";
import CreateCabinForm from "./components/CreateCabinForm";
import Modal from "../../core/ui/Modal";
import CabinTable from "./components/CabinTable";
import CabinTableOperation from "./components/CabinTableOperation";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperation />
      </Row>

      <Row type="vertical">
        <CabinTable />

        <Modal>
          <Modal.Open opens="cabin-form">
            <Button>Add new cabin</Button>
          </Modal.Open>
          <Modal.Window name="cabin-form">
            <CreateCabinForm />
          </Modal.Window>
        </Modal>
      </Row>
    </>
  );
}

export default Cabins;
