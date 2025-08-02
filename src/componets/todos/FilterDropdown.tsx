type FilterType = 'all' | 'active' | 'completed'

interface FilterDropdownProps {
    currentFilter: FilterType;
    onFilterChange: (newFilter: FilterType) => void
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ currentFilter, onFilterChange }) => {
    return (
        <div className="relative inline-block text-left">
            <select
                value={currentFilter}
                onChange={(e) => onFilterChange(e.target.value as FilterType)}
                className="
            inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 
            bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none 
            focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500
          "
            >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
            </select>
        </div>
    );
}

export default FilterDropdown;