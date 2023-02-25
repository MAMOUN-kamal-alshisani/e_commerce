import { render, screen, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom'
import NavBar from "../navbar";

describe('render Navbar component and check the elements', () => {
    

    test('check first div in navbar ', () => {
        render(<NavBar/>)
    const firstDiv = screen.getByTestId('navbar_ct')
    expect(firstDiv).toBeInTheDocument()
    
    })
    test('check second div in navbar ', () => {
        render(<NavBar/>)
    const SecondDiv = screen.getByTestId('mytestid')
    expect(SecondDiv).toBeInTheDocument()
    
    })

    test('check link div container length    ', () => {
        render(<NavBar/>)
    const firstDiv = screen.getByTestId('tagContainer')
    expect(firstDiv).toHaveLength(2)
    
    })
    test('check link div container length    ', () => {
        render(<NavBar/>)
    const firstDiv = screen.getByTestId('tagContainer')
    expect(firstDiv).toHaveLength(2)
    
    })
    test('check if specific text is the compenent ', () => {
        render(<NavBar/>)
        const LinkElement = screen.getByText(/Awesome! Free shipping Deals Only Here!/i)
        expect(LinkElement).toBeInTheDocument()
    
    })




});

