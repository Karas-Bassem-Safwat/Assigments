export enum Gender {
    male,
    female
}

export enum Role {
    user,
    admin,
    super_admin,
    super_super_admin,
}

export interface Iuser{
name: string
email: string
password: string
age: number
isOnIine: boolean
isActive: boolean
gender: Gender
phone: string
confirmedAt: Date
changedCredentialsAt: Date
role: Role
profilePic: string
coverPics: [string]
bio: string
}