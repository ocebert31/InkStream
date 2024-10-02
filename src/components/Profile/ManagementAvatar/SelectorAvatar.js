function SelectAvatar ({ label, value, options, onChange }) {
    return(
        <div>
            <label className="block text-sm font-medium text-gray-700">
                {label} :
                <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={value} onChange={onChange}>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    )
};

export default SelectAvatar;