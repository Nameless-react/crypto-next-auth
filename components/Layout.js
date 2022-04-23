import Nav from "./Nav";
import Footer from "./footer";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools"
import { useState } from "react";
import { Hydrate } from "react-query/hydration";


export default function Layout({ children }) {
    const [queryclient] = useState(() => new QueryClient());  
    return (
    <QueryClientProvider client={queryclient}>
        <SessionProvider session={children.props.session} refetchInterval={60}>
            <ReactQueryDevtools />
            <Hydrate state={children.props.dehydratedState}>
                <Nav />
                {children}
                <Footer />
            </Hydrate>
        </SessionProvider>
    </QueryClientProvider>
    )
}
