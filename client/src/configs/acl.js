import { AbilityBuilder, Ability } from '@casl/ability'

export const AppAbility = Ability

// src/configs/acl.js

const defineRulesFor = (role, subject) => {
  const { can, rules } = new AbilityBuilder(AppAbility)

  if (role === 'admin') {
    can('manage', 'all')
  } else if (role === 'artist') {
    can(['read'], 'bookings')
    can(['manage'], 'inbox')
    can(['read'], 'finance')
    can(['manage'], 'account')
    // Add other permissions for artist here
  } else if (role === 'organizer') {
    can(['read'], 'bookings')
    can(['manage'], 'inbox')
    can(['read'], 'finance')
    can(['manage'], 'account')
    // Add other permissions for organizer here
  } else if (role === 'client') {
    can(['read'], 'acl-page')
  } else {
    can(['read', 'create', 'update', 'delete'], subject)
  }

  return rules
}

export const buildAbilityFor = (role, subject) => {
  return new AppAbility(defineRulesFor(role, subject), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: object => object.type
  })
}

export const defaultACLObj = {
  action: 'manage',
  subject: 'all'
}

export default defineRulesFor
