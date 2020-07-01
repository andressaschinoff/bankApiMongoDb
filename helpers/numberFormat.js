const formatter = Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

function moneyFormat(value) {
  const money = formatter.format(value);

  return money;
}

export { moneyFormat };
