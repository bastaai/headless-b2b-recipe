export type DropdownEntry = {
  value: any;
  label: any;
  selected: boolean;
};

export type DropdownPropType = {
  values: DropdownEntry[];
  onChange: (entry: DropdownEntry) => void;
};

export const Dropdown = ({ values, onChange }: DropdownPropType) => {
  const options = values.map((x, idx) => {
    if (x.selected) {
      return (
        <option key={`maxbid-select-${idx}`} value={x.value} selected>
          {x.label}
        </option>
      );
    } else {
      return (
        <option key={`maxbid-select-${idx}`} value={x.value}>
          {x.label}
        </option>
      );
    }
  });

  return (
    <select
      onChange={(event) => {
        const entries = values.filter((x) => {
          return x.value.toString() === event.target.value.toString();
        });
        if (entries.length !== 1) {
          throw Error("value not found");
        }

        onChange(entries[0]);
      }}
    >
      {options}
    </select>
  );
};
