import { Column } from "@tanstack/react-table";
import { CombinedValue, EmployeeDTO } from "../../../types/outOffOffice";
import DebouncedInput from "../DebounceImput/DebounceImput";
import { useMemo } from "react";

type Props = {
  column: Column<EmployeeDTO, unknown>;
};

const Filter = ({ column }: Props) => {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  const facetedValues = column.getFacetedUniqueValues();
  const sortedUniqueValues = useMemo(() => {
    const uniqueValues: CombinedValue[] = [];
    const columnValues =
      filterVariant === "select" ? Array.from(facetedValues.keys()) : [];
    columnValues.forEach((e) => {
      if (
        !uniqueValues.find((value) => {
          return e.id === value.id;
        })
      ) {
        uniqueValues.push(e);
      }
    });

    return uniqueValues;
  }, [facetedValues, filterVariant]);

  return (
    <>
      {filterVariant === "range" && (
        <>
          <DebouncedInput
            type="number"
            initialValue={(columnFilterValue as [number, number])?.[0] ?? ""}
            onChange={(value) =>
              column.setFilterValue((prev: [number, number]) => [
                value,
                prev?.[1],
              ])
            }
            placeholder={`Min`}
          />
          <DebouncedInput
            type="number"
            initialValue={(columnFilterValue as [number, number])?.[1] ?? ""}
            onChange={(value) =>
              column.setFilterValue((prev: [number, number]) => [
                prev?.[0],
                value,
              ])
            }
            placeholder={`Max`}
          />
        </>
      )}
      {filterVariant === "select" && (
        <select
          onChange={(e) => column.setFilterValue(e.target.value)}
          value={columnFilterValue?.toString()}
        >
          <option value="">All</option>
          {sortedUniqueValues.map((value) => (
            <option value={value.id} key={value.value}>
              {value.value}
            </option>
          ))}
        </select>
      )}
      {filterVariant === "text" && (
        <DebouncedInput
          onChange={(value) => column.setFilterValue(value)}
          placeholder={`Search...`}
          initialValue={(columnFilterValue ?? "") as string}
        />
      )}
    </>
  );
};

export default Filter;
