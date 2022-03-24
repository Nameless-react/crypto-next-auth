import Nav from "./Nav";
import Footer from "./footer";
import { SessionProvider } from "next-auth/react";


export default function Layout({ children }) {
    return (
    <SessionProvider session={children.props.session}>
        <Nav />
        {children}
        <Footer />
    </SessionProvider>
    )
}
