import React, { useState } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { data } from "./Data";

const Tree = () => {
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState(["product1"]);
  const [printValue, setPrintValue] = useState([]);

  const onExpand = expanded => {
    setExpanded(expanded);
  };

  const filterData = nodeLable => {
    const ftr = Object.keys(printValue)
      .filter(label => label !== nodeLable)
      .reduce((res, key) => ((res[key] = printValue[key]), res), {});
    setPrintValue(ftr);
  };

  const onCheck = (checked, nodes) => {
    if (nodes.children === undefined) {
      if (!checked.includes(nodes.value)) {
        const filtered = printValue[nodes.parent.label].filter( label => label !== nodes.label);
        {filtered.length > 0 ? setPrintValue({ ...printValue, [nodes.parent.label]: filtered }) : filterData(nodes.parent.label)}
      } else {
        let temp = printValue[nodes.parent.label];
        {temp ? temp.push(nodes.label) : (temp = [nodes.label]);}
        setPrintValue({...printValue,[nodes.parent.label]: temp});
      }
    } else {
      {!checked.includes(nodes.value) ? filterData(nodes.label) : setPrintValue({ ...printValue, [nodes.label]: null })}
    }
    setChecked(checked);
  };

  return (
    <>
      <h4>Browse Products</h4>
      <div
        style={{
          background: "gray",
          width: "30%",
          minHeight: "300px",
          maxHeight: "85vh",
          overflowY: "scroll",
        }}
      >
        <CheckboxTree
          nodes={data}
          checkModel="all"
          checked={checked}
          expanded={expanded}
          iconsClass="fa5"
          onCheck={onCheck}
          onExpand={onExpand}
          multiSelect
        />
      </div>
      <h4>Selected Varients</h4>
      {Object.keys(printValue).map((item, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              border: "1px solid gray",
              background: "gray",
              padding: "7px",
              width: "30%",
              marginTop: "10px",
            }}
          >
            {item}
            {printValue[item]?.map((varient, index) => {
              return <div key={index}>,{varient}</div>;
            })}
          </div>
        );
      })}
    </>
  );
};

export default Tree;
