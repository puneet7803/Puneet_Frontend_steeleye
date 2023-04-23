import List from "./list";

function App() {
  return (
    <>
      <List
        items={[
          { text: "Hi" },
          { text: "Hello, Steeleye" },
          { text: "This is Front End Assignment" },
          { text: "By Puneet Chauhan" }
        ]}
      />
    </>
  );
}

export default App;