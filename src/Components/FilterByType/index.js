import './index.css'

const FilterByType = props => {
  const {data, onClickFilterType} = props
  const {label, employmentTypeId} = data
  const onClickBtn = event => {
    onClickFilterType(event, employmentTypeId)
  }
  return (
    <li className="filter-item">
      <input
        type="checkbox"
        id={employmentTypeId}
        value={employmentTypeId}
        onChange={onClickBtn}
        className="input-box"
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}

export default FilterByType
