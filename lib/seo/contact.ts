export function getContactEmail(): string {
  return process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'sales@structurelogistics.com'
}

export function getContactPhone(): string {
  return process.env.NEXT_PUBLIC_CONTACT_PHONE || '+971 55 387 1664'
}


