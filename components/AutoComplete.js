import { createAutocomplete } from "@algolia/autocomplete-core";
import Item from "./Item";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


export default function AutoComplete(props) {
    const route = useRouter();
    const [autoCompleteState, setAutoCompleteState] = useState({
        collections: [],
        isOpen: false
    });

    const autoComplete = useMemo(() => createAutocomplete({
        onStateChange: ({ state }) => setAutoCompleteState(state),
        placeholder: "Search",
        getSources: () => [{
                    sourceId: "cryto-next-api",
                    getItemInputValue(params) {
                        return params.item.name
                    },
                    getItemUrl({ item }) {
                        item.url = `/crypto/${item.id}`
                        return item.url
                    },
                    getItems: ({ query }) => {
                        if(!!query) {
                            return fetch(`/api/cryptocurrencies/search?q=${query}`)
                            .then(res => res.json())
                        }
                    },
                }],
                ...props,
            }), [props]);
        



        const formRef = useRef(null)
        const inputRef = useRef(null)
        const panelRef = useRef(null)

        const formProps = autoComplete.getFormProps({
            inputElement: inputRef.current,
        });
        
        const InputProps = autoComplete.getInputProps({
            inputElement: inputRef.current,

        });




        return (
            <form ref={formRef} className="auto-complete-form" {...formProps}>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
                <input type="text" className="searchInput" ref={inputRef} {...InputProps}/>
                {
                    autoCompleteState.isOpen && (
                        <div className="auto-complete-panel" ref={panelRef} {...autoComplete.getPanelProps()}>
                            {autoCompleteState.collections.map((collection, index) => {
                                const { items } = collection;
                                return (
                                    <ul {...autoComplete.getListProps()} className="auto-complete-items" key={index + 1}>
                                            {items.map((item, index) => <Item key={index + 1} index={index} {...item}/>)}
                                    </ul>
                                )   
                            })}
                        </div>
                    )
                }
            </form>
        )
}



