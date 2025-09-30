
import IssueItem from "./IssueItem2";

export default function IssueList({ issues }) {
  if (!issues || issues.length === 0) {
    return <p>No se detectaron problemas (o no se pudo analizar).</p>;
  }

  return (
    <ul className="list-disc pl-5">
      {issues.map((issue, i) => (
        <IssueItem key={i} issue={issue} />
      ))}
    </ul>
  );
}
