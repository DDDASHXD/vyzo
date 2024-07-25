import React, { useState, useEffect } from "react";
import { Tree } from "primereact/tree";

export default function BasicDemo() {
  const [nodes, setNodes] = useState();

  return (
    <div className="card flex justify-content-center">
      <Tree
        value={[{ label: "Whoop", children: [{ label: "whaap" }] }]}
        className="w-full md:w-30rem"
      />
    </div>
  );
}
