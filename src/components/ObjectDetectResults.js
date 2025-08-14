import { colors } from "@/utils/helpers";

export default function Index({ data, onItemHover }) {

    return (
        <>
            <div className="flex flex-wrap gap-2 pl-2 w-[320px]">
                {
                    data && data.map((item, idx) => {
                        return <span
                            onMouseEnter={(e) => {
                                let obj = {
                                    points: data[idx].bbox,
                                    color: colors()[idx % colors().length]
                                }
                                onItemHover(obj)
                            }}
                            onMouseLeave={(e) => {
                                onItemHover({
                                    points: [],
                                    color: null
                                })
                            }}
                            key={idx}
                            className='px-4 py-2 rounded-[10px] bg-red-400 text-white font-bold text-sm shadow hover:cursor-pointer'
                            style={{ backgroundColor: colors()[idx % colors().length] }}
                        >{item.class_name}</span>
                    })
                }
            </div>
        </>
    );
}