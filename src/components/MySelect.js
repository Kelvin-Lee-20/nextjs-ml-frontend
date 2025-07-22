export default function Index({ data, key_prefix, handleChange, selectedIndex = 0 }) {
    return (
        <select
            className="
                cursor-pointer
                form-select 
                appearance-none
                block
                w-full
                px-3
                py-2
                text-base
                font-normal
                text-gray-700
                bg-white 
                bg-clip-padding 
                bg-no-repeat
                border 
                border-solid 
                border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 
                focus:bg-white 
                focus:border-blue-600 
                focus:outline-none"
            value={selectedIndex} onChange={handleChange}>
            {
                data.map((item, idx) => <option key={key_prefix + item} value={idx}>{item}</option>)
            }
        </select>
    );
}