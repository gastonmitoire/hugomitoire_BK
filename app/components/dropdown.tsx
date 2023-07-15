// dropdown component

import * as React from "react";

interface DropdownProps {
  options: string[];
  selected: string;
  onSelectedChange: (selected: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selected,
  onSelectedChange,
}) => {
  const renderedOptions = options.map((option) => {
    return (
      <div
        key={option}
        className="item"
        onClick={() => onSelectedChange(option)}
      >
        {option}
      </div>
    );
  });

  return (
    <div className="ui form">
      <div className="field">
        <label className="label">Select a Color</label>
        <div className="ui selection dropdown visible active">
          <i className="dropdown icon"></i>
          <div className="text">{selected}</div>
          <div className="menu visible transition">{renderedOptions}</div>
        </div>
      </div>
    </div>
  );
};
