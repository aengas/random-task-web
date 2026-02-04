# RandomTask 🎲

En moderne webapplikasjon for å planlegge dagen din med tilfeldige oppgaver. Basert på konseptet fra den originale WPF-applikasjonen, nå tilgjengelig som en responsiv webapp.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma)

## ✨ Funksjoner

- **📝 Oppgaveliste** - Legg til og administrer oppgaver du vil gjøre
- **📌 Faste tider** - Definer møter, pauser eller andre faste aktiviteter
- **🎲 Tilfeldig planlegging** - Generer en dagsplan med tilfeldig rekkefølge
- **⚙️ Fleksible innstillinger** - Velg mellom alle oppgaver eller kun påkrevde
- **🔐 Brukerautentisering** - Logg inn og lagre dine oppgaver
- **📱 Mobilvennlig** - Fungerer på alle enheter

## 🚀 Kom i gang

### Forutsetninger

- [Node.js](https://nodejs.org/) 18 eller nyere
- [pnpm](https://pnpm.io/) (anbefalt) eller npm

### Installasjon

```bash
# Klon repositoryet
git clone https://github.com/DITT_BRUKERNAVN/random-task-web.git
cd random-task-web

# Installer avhengigheter
pnpm install

# Kopier miljøvariabler
cp .env.example .env.local

# Generer Prisma-klient og opprett database
pnpm prisma generate
pnpm prisma db push

# Start utviklingsserver
pnpm dev
```

Åpne [http://localhost:3000](http://localhost:3000) i nettleseren.

### Miljøvariabler

Opprett `.env.local` med følgende variabler:

```env
# Database (SQLite for lokal utvikling)
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=din-hemmelige-nøkkel-minst-32-tegn

# For produksjon med Neon PostgreSQL:
# POSTGRES_PRISMA_URL=
# POSTGRES_URL_NON_POOLING=
```

Generer `NEXTAUTH_SECRET`:

```bash
openssl rand -base64 32
```

## 📖 Bruk

### 1. Legg til oppgaver

Skriv inn oppgaver du vil gjøre i løpet av dagen. Marker oppgaver som **påkrevd** hvis de må gjøres.

### 2. Definer faste tider

Legg til møter, lunsj eller andre aktiviteter med faste start- og sluttider.

### 3. Konfigurer tidsinnstillinger

- **Starttid** - Når dagen begynner
- **Sluttid** - Når dagen slutter
- **Alle oppgaver** - Inkluder alle aktive oppgaver
- **Tilfeldig antall** - La appen velge antall ikke-påkrevde oppgaver

### 4. Beregn plan

Trykk **Beregn plan** for å generere en dagsplan med tidsangivelser.

## 🧪 Testing

```bash
# Kjør alle tester
pnpm test

# Kjør tester i watch-modus
pnpm test:watch
```

## 🏗️ Prosjektstruktur

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API-ruter
│   ├── auth/              # Autentiseringssider
│   └── page.tsx           # Hovedside
├── components/            # React-komponenter
│   ├── ui/               # Gjenbrukbare UI-komponenter
│   ├── tasks/            # Oppgave-komponenter
│   ├── fixed-tasks/      # Faste tider-komponenter
│   └── plan/             # Plan-komponenter
├── lib/                   # Hjelpefunksjoner
├── services/             # Forretningslogikk
├── stores/               # Zustand state management
├── types/                # TypeScript-typer
└── __tests__/            # Tester
```

## 🛠️ Teknologier

| Teknologi | Beskrivelse |
|-----------|-------------|
| [Next.js 15](https://nextjs.org/) | React-rammeverk med App Router |
| [TypeScript](https://www.typescriptlang.org/) | Typesikker JavaScript |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS |
| [Prisma](https://www.prisma.io/) | Database ORM |
| [NextAuth.js](https://next-auth.js.org/) | Autentisering |
| [Zustand](https://zustand-demo.pmnd.rs/) | State management |
| [Lucide React](https://lucide.dev/) | Ikoner |
| [Jest](https://jestjs.io/) | Testing |

## 🌐 Deploy

### Vercel (anbefalt)

1. Push til GitHub
2. Importer prosjektet i [Vercel](https://vercel.com)
3. Opprett en Neon PostgreSQL-database
4. Koble databasen til prosjektet
5. Legg til `NEXTAUTH_SECRET` som miljøvariabel
6. Deploy!

Se [dokumentasjonen](https://vercel.com/docs) for mer informasjon.

### Manuelt

```bash
# Bygg for produksjon
pnpm build

# Start produksjonsserver
pnpm start
```

## 📝 Scripts

| Script | Beskrivelse |
|--------|-------------|
| `pnpm dev` | Start utviklingsserver |
| `pnpm build` | Bygg for produksjon |
| `pnpm start` | Start produksjonsserver |
| `pnpm lint` | Kjør ESLint |
| `pnpm test` | Kjør tester |
| `pnpm prisma studio` | Åpne database-GUI |

## 🤝 Bidra

Bidrag er velkomne! 

1. Fork repositoryet
2. Lag en feature-branch (`git checkout -b feature/ny-funksjon`)
3. Commit endringene (`git commit -m 'Legg til ny funksjon'`)
4. Push til branchen (`git push origin feature/ny-funksjon`)
5. Åpne en Pull Request

## 📄 Lisens

MIT License - se [LICENSE](LICENSE) for detaljer.

## 🙏 Takk til

- Inspirert av den originale RandomTask WPF-applikasjonen
- Bygget med [Next.js](https://nextjs.org/)
- Hostet på [Vercel](https://vercel.com)