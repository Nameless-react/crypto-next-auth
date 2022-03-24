import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom"
import "@testing-library/jest-dom/extend-expect";
import News from "../components/news"
 
test("Testing with Jest and React testing library", () => {
    const component = render(<News coin={"solana"} />)
    const div = component.container.querySelector("h3");
    
    console.log(prettyDOM(div));
    // component.debug();
});     


// El mockHandler lo que hace es espiar la funcion para saber cuantas veces se a llamado y asi saber si se esta ejecutando. Usualmente se usa cuando al componente que estamos probando le tenemos que pasar una funcion
const mockHandler = jest.fn()

// test("Clicking the link to the news page", () => {
//     const component = render(<News coin={"solana"} />)
//     const button =  component.getAllByText("More →")
    
//     console.log(button)
//     fireEvent.click(button)
//     expect(mockHandler.mock.calls).toHaveLength(1);
// })  