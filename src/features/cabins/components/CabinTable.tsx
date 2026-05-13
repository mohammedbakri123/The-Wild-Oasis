import { useCabins } from "../hooks/useCabins";
import Spinner from "../../../core/ui/Spinner";
import CabinRow from "./CabinRow";
import toast from "react-hot-toast";
import ErrorFallback from "../../../core/ui/ErrorFallback";
import Table from "../../../core/ui/Table";
import Menus from "../../../core/ui/Menus";
import { useSearchParams } from "react-router-dom";
import type { Cabin } from "../types";

export default function CabinTable() {
  const { data: cabins, isLoading, error } = useCabins();
  const [searchParams] = useSearchParams();

  if (error) {
    toast.error(error.message);
    return (
      <ErrorFallback header="Faild to Fetch Cabins" message={error.message} />
    );
  }

  if (isLoading) return <Spinner />;

  const filterValue = searchParams.get("discount") || "all";
  const sortByValue = searchParams.get("sortBy") || "name-asc";

  let filteredCabins: Cabin[] = cabins ?? [];

  if (filterValue === "no-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0) ?? [];
  if (filterValue === "with-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount !== 0) ?? [];

  //sorting
  const [field, direction] = sortByValue.split("-") as [string, "asc" | "desc"];
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = [...filteredCabins].sort((a, b) => {
    let aVal: string | number, bVal: string | number;
    switch (field) {
      case "name":
        aVal = a.name;
        bVal = b.name;
        break;
      case "regularPrice":
        aVal = a.regular_price;
        bVal = b.regular_price;
        break;
      case "maxCapacity":
        aVal = a.max_capacity;
        bVal = b.max_capacity;
        break;
      case "discount":
        aVal = a.discount;
        bVal = b.discount;
        break;
      default:
        aVal = 0;
        bVal = 0;
    }
    return (aVal > bVal ? 1 : -1) * modifier;
  });

  return (
    <Menus>
      <Table columns=" 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
