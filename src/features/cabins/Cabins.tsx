import Heading from "../../core/ui/Heading";
import Row from "../../core/ui/Row";
import Button from "../../core/ui/Button";
import CreateCabinForm from "./components/CreateCabinForm";
import Model from "../../core/ui/Model";
import CabinTable from "./components/CabinTable";
import CabinTableOperation from "./components/CabinTableOperation";

function Cabins() {
  return (
    <Row type="vertical">
      <Row>
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperation />
      </Row>

      <CabinTable />
      <Model>
        <Model.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Model.Open>
        <Model.Window name="cabin-form">
          <CreateCabinForm />
        </Model.Window>
      </Model>
    </Row>
  );
}

export default Cabins;
