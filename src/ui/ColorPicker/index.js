import React, { useState } from "react";
import { BlockPicker } from "react-color";

const MyColorPicker = ({ field, form, handleChange, ...props }) => {
  const { value } = field;
  const [color, setColor] = useState(value);
  return (
    <div>
      <input {...field} {...props} value={color} style={{ display: "none" }} />
      <BlockPicker
        color={color}
        colors={[
          "#E09B33",
          "#EA3D32",
          "#E05A33",
          "#6A45A2",
          "#56BD66",
          "#1700FF",
          "#dce775",
          "#ff8a65",
          "#ba68c8",
          "transparent",
        ]}
        triangle="hide"
        onChange={(val) => {
          setColor(val.hex);
          handleChange(val.hex);
        }}
      />
    </div>
  );
};

export default MyColorPicker;
