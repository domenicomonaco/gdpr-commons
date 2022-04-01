type male = 'male'
type female = 'female'
interface User {
  id: number
  name: string
  age: number
  isMarried: boolean
  gender: male | female
}

export const vlad: User = {
  id: 1,
  name: 'Vlad',
  age: 32,
  isMarried: true,
  gender: 'male',
}

const showInfo = (user: User): string => {
  return `This is ${user.name}. ${user.gender === 'male' ? 'He' : 'She'} is ${user.age
    } and ${user.gender === 'male' ? 'he' : 'she'} ${user.isMarried ? 'is' : 'is not'
    } married.`
}

export default showInfo
