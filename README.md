PROBLEM 1: Explain what the simple List component does.
A simple List component is a UI element that presents a collection of items in a vertical or horizontal layout.
It enables users to easily read and interact with the items in the list.
The List component is commonly used in mobile apps and web applications.
Users can select one or more items to perform actions or view more details about the item.
The List component is easy to implement and customize, which makes it a popular choice for developers.
Developers can tailor the List component to their application's specific needs.
Additional features such as sorting, filtering, and pagination can be added to enhance the List component's functionality and user experience.



PROBLEM 2 : What problems / warnings are there with code?
      --Problems--
TypeError: PropTypes.shapeOf is not a function (List.jsx:53)

Invariant Violation: Calling PropTypes validators directly is not supported by the prop-types package. (List.jsx:52)

Warning: Each child in a list should have a unique "key" prop. (List.jsx:38)

Warning: Failed prop type: Invalid prop isSelected of type function supplied to WrappedSingleListItem, expected boolean.

TypeError: setSelectedIndex is not a function

useState returns an array where the first item is value and the other one is a function using which we have to update the associated value. But, in the code the array items are reversed.

Warning: Cannot update a component (WrappedListComponent) while rendering a different component (WrappedSingleListItem). To locate the bad setState() call inside WrappedSingleListItem.

Uncaught TypeError: Cannot read properties of null (reading 'map'). Add Optional Chaining in case the data is not available.

  -- solution--
Replace "shapeOf" with "shape" in PropTypes (List.js:53)

Use PropTypes.checkPropTypes() instead of calling validators directly (List.js:52)

Add a "key" prop to each child element when iterating through an array with map (List.js:38)

Ensure the correct data type is being passed to isSelected prop.

Ensure that setSelectedIndex is defined and passed as a prop .

useState returns an array where the first item is value and the other one is a function using which we have to update the associated value

Avoid calling setState() inside a component's render method, use a different lifecycle method instead (List.js:34)

Use Optional Chaining to handle null or undefined data (List.js:39)





PROBLEM 3: Please fix, optimize, and/or modify the component as much as you think is necessary.
 import { useState, useEffect, memo } from "react";
 import PropTypes from "prop-types";

 // Single List Item
 const WrappedSingleListItem = ({ index, isSelected, onClickHandler, text }) => {
return (
	<li
		style={{ backgroundColor: isSelected ? "green" : "red" }}
		onClick={() => onClickHandler(index)}
	>
		{text}
	</li>
);
 };

 WrappedSingleListItem.propTypes = {
index: PropTypes.number,
isSelected: PropTypes.bool,
onClickHandler: PropTypes.func.isRequired,
text: PropTypes.string.isRequired,
 };

 const SingleListItem = memo(WrappedSingleListItem);

 // List Component
 const WrappedListComponent = ({ items }) => {
const [selectedIndex, setSelectedIndex] = useState();

useEffect(() => {
	setSelectedIndex(null);
}, [items]);

const handleClick = (index) => {
	setSelectedIndex(index);
};

return (
	<ul style={{ textAlign: "left" }}>
		{items?.map((item, index) => (
			<SingleListItem
				key={index}
				onClickHandler={() => handleClick(index)}
				text={item.text}
				index={index}
				isSelected={selectedIndex === index}
			/>
		))}
	</ul>
);
 };

 WrappedListComponent.propTypes = {
items: PropTypes.arrayOf(
	PropTypes.shape({
		text: PropTypes.string.isRequired,
	})
),
 };

 WrappedListComponent.defaultProps = {
items: null,
 };

 const List = memo(WrappedListComponent);

 export default List;
// Now we pass props itrms in list components as an array items in app.js
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
