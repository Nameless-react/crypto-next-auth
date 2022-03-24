import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom"
import "@testing-library/jest-dom/extend-expect";
import Coins from "../components/coins";

const coinProps = {
    name: "ApeCoin",
    image: "https://assets.coingecko.com/coins/images/24383/large/apecoin.jpg?1647476455",
    market_cap: 1604918892,
    symbol: "ape",
    market_cap_rank: 75,
    current_price: 12.28,
    price_change_percentage_24h: 16.76017,
    id: "apecoin"
}

const mockHandler = jest.fn()

describe("<Coins />", () => {
    let component;

    beforeEach(() => {
        component = render(<Coins {...coinProps}/>)
    });
    
    test("render a coin", () => {
        const symbol =  component.getByText("ape");
        expect(symbol).toHaveClass("symbol")
        console.log(prettyDOM(symbol))


        const name = component.getByText("ApeCoin")
        name.props

        expect(mockHandler.mock.calls).toHaveLength(1);

    })
})
