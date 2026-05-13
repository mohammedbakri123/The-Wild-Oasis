import Filter from "../../../core/ui/Filter";
import TableOperations from "../../../core/ui/TableOperations";

export default function CabinTableOperation() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "with-discount", label: "With Discount" },
          { value: "no-discount", label: "No Discount" },
        ]}
      ></Filter>
    </TableOperations>
  );
}
