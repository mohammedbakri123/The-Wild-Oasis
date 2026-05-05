import { useState } from "react";
import Heading from "../../core/ui/Heading";
import Row from "../../core/ui/Row";
import CabinTable from "./components/CabinTable";
import Button from "../../core/ui/Button";
import CreateCabinForm from "./components/CreateCabinForm";

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>FIlter / Sort</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
      <Button
        onClick={() => {
          setShowForm((c) => !c);
        }}
      >
        Show Form
      </Button>
      {showForm && <CreateCabinForm />}
    </>
  );
}

export default Cabins;
