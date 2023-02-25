import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Cart from "../cart";
import { Provider } from "react-redux";
import store from "../../../store/store";
// import RequireAuth from "../../../store/requireAuth";
import { BrowserRouter as Router} from "react-router-dom";
const Render = ()=>{
return(
    <Provider store={store}>
        <Router>
          <Cart />
        </Router>
        </Provider>
)
} 
describe("render cart page and check the elements", () => {
  test("check first div in navbar ", () => {
    render(
        Render()
    );

    const mainDiv = screen.getByRole("main_container");
    expect(mainDiv).toBeInTheDocument();
  });
  test('check h1 headers count in component ', () => {
      render(Render())
  const SecondDiv = screen.getAllByRole('heading', {level: 1})
  expect(SecondDiv).toHaveLength(3)

  })
  test('check h3 headers count in component ', () => {
    render(Render())
const SecondDiv = screen.getAllByRole('heading', {level: 3})
expect(SecondDiv).toHaveLength(6)

})
test('check button count in component ', () => {
    render(Render())
const button = screen.getAllByRole('button')
expect(button).toHaveLength(3)

})
test('check listItemContainer if is present in component ', () => {
    render(Render())
const listDiv = screen.getByRole('listItemContainer')
expect(listDiv).toBeInTheDocument()




})

// test("increments counter", () => {
//     // render the component on virtual dom
//     render(Render());
    
//     //select the elements you want to interact with
//     const counter = screen.getByTestId("counter");
//     // const increment_btn = screen.getByTestId("increment");
    
//     //interact with those elements
//     fireEvent.click(counter);
    
//     //assert the expected result
//     expect(counter).toHaveTextContent("1");
//     });



  // test('check link div container length    ', () => {
  //     render(<Cart/>)
  // const firstDiv = screen.getAllByRole('tagContainer')
  // expect(firstDiv).toHaveLength(2)

  // })
  // test('check link div container length    ', () => {
  //     render(<Cart/>)
  // const firstDiv = screen.getAllByRole('tagContainer')
  // expect(firstDiv).toHaveLength(2)

  // })
  // test('check if specific text is the compenent ', () => {
  //     render(<Cart/>)
  //     const LinkElement = screen.getByText(/Awesome! Free shipping Deals Only Here!/i)
  //     expect(LinkElement).toBeInTheDocument()

  // })
});
