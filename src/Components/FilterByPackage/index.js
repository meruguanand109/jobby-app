import './index.css'

const FilterByPackage = props => {
  const {data, onClickPackageFilter} = props
  const {label, salaryRangeId} = data
  const onClickBtn = () => {
    onClickPackageFilter(salaryRangeId)
  }
  return (
    <li className="filter-item">
      <input
        type="radio"
        id={salaryRangeId}
        value={salaryRangeId}
        onClick={onClickBtn}
        className="input-box"
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}

export default FilterByPackage
