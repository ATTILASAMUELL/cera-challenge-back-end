export function normalizeCPF(raw) {
  return (raw || '').replace(/\D/g, '')
}

export function validateCPF(raw) {
  const cpf = normalizeCPF(raw)
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false

  const calc = (factor) =>
    cpf
      .slice(0, factor - 1)
      .split('')
      .reduce((t, d, i) => t + +d * (factor - i), 0)

  const dv1 = (11 - (calc(10) % 11)) % 10
  const dv2 = (11 - (calc(11) % 11)) % 10

  return dv1 === +cpf[9] && dv2 === +cpf[10]
}
