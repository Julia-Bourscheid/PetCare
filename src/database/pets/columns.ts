export const petColumns = `
  id, name, type, breed, age, weight,
  coalesce(to_char(next_vaccine, 'DD/MM/YYYY'), '') AS vaccine,
  icon, description`;
