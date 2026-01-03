export function getMyAge() {
  const birthDate = new Date("1998-05-21");

  const today = new Date();

  // Obtener el nivel (edad)
  let level = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    level--;
  }

  // Calcular XP hacia el siguiente nivel
  let lastBirthday = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  if (today < lastBirthday) {
    lastBirthday.setFullYear(lastBirthday.getFullYear() - 1);
  }

  // Fecha de mi cumpleaños
  const nextBirthday = new Date(lastBirthday);
  nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);

  // Diferencia de tiempo para obtener el progreso de la "barra de XP"
  const diffTime = Math.abs(today - lastBirthday);
  const totalYearTime = Math.abs(nextBirthday - lastBirthday);

  const currentXP = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // en dias
  const neededXP = Math.ceil(totalYearTime / (1000 * 60 * 60 * 24)); // en dias
  const xpPercent = (currentXP / neededXP) * 100;

  return {
    level,
    currentXP,
    neededXP,
    xpPercent,
    birthDate: birthDate.toDateString(),
  };
}
