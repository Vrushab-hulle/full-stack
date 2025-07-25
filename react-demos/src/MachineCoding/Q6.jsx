//Q6. How can you pass data from a parent component to a child component?

function ChildComponent({ data }) {
  return <div>{data}</div>;
}

function Q6() {
  let name = "this data is coming from Parent";
  return (
    <div>
      <p>we are in parent</p>
      <ChildComponent data={name} />
    </div>
  );
}

export default Q6;
