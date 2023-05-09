export const skillGenerator = (skills) => {
  if (!skills.length) return []
  // const skillsKeys = Object.keys(skills)
  // const skillsValue = Object.values(skills)

  const skillsRender = skills.split(',')?.map((skill, index) => {
    const defineSkillText = (skillKey) => {
      switch (skillKey) {
        case 'singByEar':
          return 'Sing by ear'
        case 'playByEar':
          return 'Play by ear'
        case 'readSheetMusic':
          return 'Read sheet music'
        default:
          return
      }
    }
    return defineSkillText(skill)
  })

  const removeAllUndefined = skillsRender.filter((el) => el !== undefined)
  return removeAllUndefined
}
