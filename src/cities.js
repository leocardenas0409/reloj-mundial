// Datos del reloj mundial: región → ciudades con su zona horaria IANA.
// Para agregar una ciudad, añade una línea con su nombre, país y zona.
const REGIONS = [
  {
    id: "america",
    name: "América",
    cities: [
      { name: "Lima", country: "Perú", tz: "America/Lima" },
      { name: "Bogotá", country: "Colombia", tz: "America/Bogota" },
      { name: "Santiago", country: "Chile", tz: "America/Chile" },
      { name: "Nueva York", country: "Estados Unidos", tz: "America/New_York" },
      { name: "Los Ángeles", country: "Estados Unidos", tz: "America/Los_Angeles" },
      { name: "São Paulo", country: "Brasil", tz: "America/Sao_Paulo" },
      { name: "Buenos Aires", country: "Argentina", tz: "America/Argentina/Buenos_Aires" }
    ]
  },
  {
    id: "europa",
    name: "Europa",
    cities: [
      { name: "Londres", country: "Reino Unido", tz: "Europe/London" },
      { name: "Madrid", country: "España", tz: "Europe/Madrid" },
      { name: "París", country: "Francia", tz: "Europe/Paris" },
      { name: "Berlín", country: "Alemania", tz: "Europe/Berlin" },
      { name: "Roma", country: "Italia", tz: "Europe/Rome" },
      { name: "Moscú", country: "Rusia", tz: "Europe/Moscow" }
    ]
  },
  {
    id: "asia",
    name: "Asia",
    cities: [
      { name: "Dubái", country: "Emiratos Árabes", tz: "Asia/Dubai" },
      { name: "Nueva Delhi", country: "India", tz: "Asia/Kolkata" },
      { name: "Singapur", country: "Singapur", tz: "Asia/Singapore" },
      { name: "Shanghái", country: "China", tz: "Asia/Shanghai" },
      { name: "Seúl", country: "Corea del Sur", tz: "Asia/Seoul" },
      { name: "Tokio", country: "Japón", tz: "Asia/Tokyo" }
    ]
  },
  {
    id: "africa",
    name: "África",
    cities: [
      { name: "Casablanca", country: "Marruecos", tz: "Africa/Casablanca" },
      { name: "Lagos", country: "Nigeria", tz: "Africa/Lagos" },
      { name: "El Cairo", country: "Egipto", tz: "Africa/Cairo" },
      { name: "Nairobi", country: "Kenia", tz: "Africa/Nairobi" },
      { name: "Johannesburgo", country: "Sudáfrica", tz: "Africa/Johannesburg" }
    ]
  },
  {
    id: "oceania",
    name: "Oceanía",
    cities: [
      { name: "Perth", country: "Australia", tz: "Australia/Perth" },
      { name: "Sídney", country: "Australia", tz: "Australia/Sydney" },
      { name: "Melbourne", country: "Australia", tz: "Australia/Melbourne" },
      { name: "Auckland", country: "Nueva Zelanda", tz: "Pacific/Auckland" },
      { name: "Honolulu", country: "Estados Unidos", tz: "Pacific/Honolulu" }
    ]
  }
];
