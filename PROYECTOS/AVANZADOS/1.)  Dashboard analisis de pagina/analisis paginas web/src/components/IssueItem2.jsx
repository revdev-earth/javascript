import React from "react";

export default function IssueItem({ issue }) {
  return (
    <li>
      <b>{issue.tipo}:</b>{" "}
      <code className="bg-gray-100">{issue.elemento.slice(0, 50)}...</code>
    </li>
  );
}
