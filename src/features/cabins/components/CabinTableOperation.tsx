import Filter from "../../../core/ui/Filter";
import SortBy from "../../../core/ui/SortBy";
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
      <SortBy
        options={[
          { value: "name-asc", label: "Name (A-Z)" },
          { value: "name-desc", label: "Name (Z-A)" },

          { value: "regularPrice-asc", label: "Price (Low First)" },
          { value: "regularPrice-desc", label: "Price (High First)" },

          { value: "maxCapacity-asc", label: "Capacity (Small First)" },
          { value: "maxCapacity-desc", label: "Capacity (Large First)" },

          { value: "discount-asc", label: "Discount (Low First)" },
          { value: "discount-desc", label: "Discount (High First)" },
        ]}
      />
    </TableOperations>
  );
}
