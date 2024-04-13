import './index.css'

const SkillsItem = props => {
  const {details} = props
  const {name, imageUrl} = details
  return (
    <li className="skills-item">
      <img src={imageUrl} alt={name} className="skills-img" />
      <p className="skills-name">{name}</p>
    </li>
  )
}

export default SkillsItem
