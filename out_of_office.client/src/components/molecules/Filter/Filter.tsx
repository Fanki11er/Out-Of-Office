import { Column } from "@tanstack/react-table";
import { CombinedValue } from "../../../types/outOffOffice";
import DebouncedInput from "../DebounceImput/DebounceImput";
import { useMemo } from "react";
import { StyledDefaultSelect } from "../../atoms/StyledDefaultSelect/StyledDefaultSelect.styles";

type Props<T> = {
  column: Column<T, unknown>;
};

function Filter<T>({ column }: Props<T>) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  const facetedValues = column.getFacetedUniqueValues();

  const sortedUniqueCombinedValues = useMemo(() => {
    const uniqueValues: CombinedValue[] = [];
    const columnValues =
      filterVariant === "combinedSelect"
        ? Array.from(facetedValues.keys())
        : [];
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

  const sortedUniqueStandardValues = useMemo(
    () =>
      filterVariant === "range"
        ? []
        : Array.from(facetedValues.keys()).sort().slice(0, 5000),

    [facetedValues, filterVariant]
  );

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
      {filterVariant === "combinedSelect" && (
        <StyledDefaultSelect
          onChange={(e) => column.setFilterValue(e.target.value)}
          value={columnFilterValue?.toString()}
        >
          <option value="">All</option>
          {sortedUniqueCombinedValues.map((value) => (
            <option value={value.id} key={value.value}>
              {value.value}
            </option>
          ))}
        </StyledDefaultSelect>
      )}

      {filterVariant === "standardSelect" && (
        <StyledDefaultSelect
          onChange={(e) => column.setFilterValue(e.target.value)}
          value={columnFilterValue?.toString()}
        >
          <option value="">All</option>
          {sortedUniqueStandardValues.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </StyledDefaultSelect>
      )}
      {filterVariant === "text" && (
        <DebouncedInput
          onChange={(value) => column.setFilterValue(value)}
          placeholder={`Search...`}
          initialValue={(columnFilterValue ?? "") as string}
        />
      )}
      {filterVariant === "number" && (
        <DebouncedInput
          type="number"
          initialValue={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((prev: [number, number]) => [
              value,
              prev?.[1],
            ])
          }
          placeholder={`Id`}
        />
      )}
    </>
  );
}

export default Filter;
