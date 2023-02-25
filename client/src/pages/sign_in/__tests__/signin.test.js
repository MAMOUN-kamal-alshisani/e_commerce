import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignIn from "../signin";
import { Provider } from "react-redux";
import store from "../../../store/store";
// import RequireAuth from "../../../store/requireAuth";
import { BrowserRouter as Router} from "react-router-dom";
const Render = ()=>{
return(
    // <Provider store={store}>
        <Router>
          <SignIn />
        </Router>
        // </Provider>
)
} 
describe("render signIn page and check the elements", () => {
  test("check Email placeholder Input ", () => {
    render(
        Render()
    );
    
    const EmailInput = screen.getByText(/Enter email/i);
    expect(EmailInput).toBeInTheDocument();
  });
//   test('check h1 headers count in component ', () => {
//       render(Render())
//   const SecondDiv = screen.getAllByRole('heading', {level: 1})
//   expect(SecondDiv).toHaveLength(3)

//   })
//   test('check h3 headers count in component ', () => {
//     render(Render())
// const SecondDiv = screen.getAllByRole('heading', {level: 3})
// expect(SecondDiv).toHaveLength(6)

// })
// test('check button count in component ', () => {
//     render(Render())
// const button = screen.getAllByRole('button')
// expect(button).toHaveLength(3)

// })
// test('check listItemContainer if is present in component ', () => {
//     render(Render())
// const listDiv = screen.getByRole('listItemContainer')
// expect(listDiv).toBeInTheDocument()




// })


})