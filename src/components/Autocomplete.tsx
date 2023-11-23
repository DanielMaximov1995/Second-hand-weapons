'use client'
import {useState, ChangeEvent, FC, useEffect, useRef} from "react";
import {CheckIcon, ChevronIcon} from "@/components/Icons";


interface AutocompleteProps {
    handleChange ?: (selected :any) => void;
    options : any[];
    label : string;
    name : string
}

const Autocomplete: FC<AutocompleteProps> = (props) => {
    const { handleChange, options , label , name } = props
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState<any | null>(null);
    const [isFocused, setIsFocused] = useState(false);
    const boxRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if(options.length === 0) {
            setSelected(null)
        }
    },[options])

    useEffect(() => {
        if(selected?.name !== query) {
            setSelected(null)
        }
    },[query])

    const filteredOptions = options.filter((option : any) =>
        option.name.toLowerCase().includes(query.toLowerCase())
    );

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleFocus = () => {
        setIsFocused(prev => !prev);
    };

    const handleSelect = (option : any) => {
        setQuery(option?.name);
        setSelected((prev : any) => option?._id === prev?._id ? null : option);
        handleFocus()
        if (handleChange) {
            handleChange({target: {name, value: option?._id}})
        }
    };

    useEffect(() => {
        if(selected === null) {
            setQuery('')
            if (handleChange) {
                handleChange({target: {name, value: ""}})
            }
        }
    },[selected])

    useEffect(() => {
        const handleOutsideClick = async (event : MouseEvent) => {
            if (
                boxRef.current &&
                !boxRef?.current?.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef?.current?.contains(event.target as Node)
            ) {
                setIsFocused(false)
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [boxRef, buttonRef, setIsFocused]);

    return (
        <div className="relative peer">
            <div className="relative w-full ">
                <input
                    type="text"
                    id='id'
                    placeholder=""
                    value={query}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    className="w-full input peer"
                />

                <button
                    className="absolute inset-y-0 left-0 flex items-center pl-2"
                    onClick={handleFocus}
                    ref={buttonRef}
                >
                    <ChevronIcon position={"bottom"}/>
                </button>
                <label
                    htmlFor={"id"}
                    className="absolute right-2 -top-3 text-sm right-4 effect bg-white px-[1px] peer-focus:text-primary peer-focus:text-sm peer-focus:-top-3 peer-placeholder-shown:text-[18px] peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400"
                >
                    {label}
                </label>
            </div>
            <div ref={boxRef} className={`absolute ${isFocused && filteredOptions.length > 0 ? "opacity-100 block" : "hidden opacity-0"} peer-focus-visible:opacity-100 mt-1 z-high max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm transition-opacity duration-100 ease-in-out`}>
                {query.length > 0 && (
                    <div className="relative cursor-pointer select-none py-2 pl-10 pr-4 text-gray-900">
                        חיפוש &quot;{query}&quot;
                    </div>
                )}

                {filteredOptions.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                       לא נמצא.
                    </div>
                ) : (
                    filteredOptions.map((option : any) => {
                        let selectedOption = selected?._id === option?._id
                        return <div
                            key={option?._id}
                            className={`relative ${selectedOption ? "pointer-event-none" : "cursor-pointer"} hover:bg-secAccent hover:text-white select-none py-2 pl-10 pr-4 text-primary`}
                            onClick={() => handleSelect(option)}
                        >
                            <span className={`block truncate`}>{option.name}</span>
                            {selectedOption && (
                                <span className={`absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600`}>
                                    <CheckIcon />
                                </span>
                            )}
                        </div>
                    })
                )}
            </div>
        </div>
    );
};

export default Autocomplete;