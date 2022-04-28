import Nav from "./Nav";
import Footer from "./footer";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "react-query";
import Meta from "./Head";
import { useState } from "react";
import SideBar from "./sideBar";
import { VscListFlat } from "react-icons/vsc";
import useWidth  from "../hooks/useWidth";

export default function Layout({ children }) {
    const [queryclient] = useState(() => new QueryClient());
    const [show, setShow] = useState(false);
    const { width } = useWidth();
    
    return (
    <QueryClientProvider client={queryclient}>
        <SessionProvider session={children.props.session}>
                <Meta name="Crypto"/>
                {width > 700 ? <Nav /> : !show && <VscListFlat className="open" onClick={() => setShow(prevValue => !prevValue)} />}
                {width < 700 && <SideBar show={show} setShow={setShow} />}
                {children}
                <Footer />
        </SessionProvider>
    </QueryClientProvider>
    )
}
