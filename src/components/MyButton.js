export default function Index({ title, onClick }) {
    return (
        <button
            className="cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={onClick}>
            {title}
        </button>
    );
}