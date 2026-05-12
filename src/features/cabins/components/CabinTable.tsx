import { useCabins } from "../hooks/useCabins";
import Spinner from "../../../core/ui/Spinner";
import CabinRow from "./CabinRow";
import toast from "react-hot-toast";
import ErrorFallback from "../../../core/ui/ErrorFallback";
import Table from "../../../core/ui/Table";

export default function CabinTable() {
  const { data: cabins, isLoading, error } = useCabins();

  if (error) {
    toast.error(error.message);
    return (
      <ErrorFallback header="Faild to Fetch Cabins" message={error.message} />
    );
  }

  if (isLoading) return <Spinner />;

  return (
    <Table columns=" 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
      </Table.Header>
      {cabins?.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </Table>
  );
}
