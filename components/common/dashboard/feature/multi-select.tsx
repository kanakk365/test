import React from "react";
import Select, { StylesConfig } from "react-select";

interface MultiSelectDropdownProps {
  options: string[];
  value?: string[];
  onChange: (newValue: string[]) => void;
  placeholder?: string;
  isLoading?: boolean;
  darkMode?: boolean;
}

export const MultiSelectCombobox: React.FC<MultiSelectDropdownProps> = ({
  options,
  value = [],
  onChange,
  placeholder = "Select options...",
  isLoading = false,
  darkMode = false,
}) => {
  // Convert string arrays to format required by react-select
  const selectOptions = options.map((opt) => ({ value: opt, label: opt }));
  const selectedValues = value.map((v) => ({ value: v, label: v }));

  // Define styles for dark mode and light mode
  const darkModeStyles: StylesConfig = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#333",
      borderColor: "#555",
      color: "#fff",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#333",
      borderColor: "#555",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#555" : "#333",
      color: "#fff",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#555",
      color: "#fff",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#fff",
      ":hover": {
        backgroundColor: "#777",
        color: "#fff",
      },
    }),
  };

  const lightModeStyles: StylesConfig = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#fff",
      borderColor: "#ccc",
      color: "#000",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#fff",
      borderColor: "#ccc",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#eee" : "#fff",
      color: "#000",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#eee",
      color: "#000",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#000",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#000",
      ":hover": {
        backgroundColor: "#ccc",
        color: "#000",
      },
    }),
  };

  return (
    <Select
      isMulti
      options={selectOptions}
      value={selectedValues}
      onChange={(newValue) => {
        // Convert back to string array when sending to parent
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const selectedOptions = (newValue || []).map((item: any) => item.value);
        onChange(selectedOptions);
      }}
      placeholder={placeholder}
      isLoading={isLoading}
      styles={darkMode ? darkModeStyles : lightModeStyles}
      className="min-w-[200px]"
    />
  );
};
