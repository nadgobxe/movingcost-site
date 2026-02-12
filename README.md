# MovingCost.co.uk

Web app + admin dashboard for running moving-cost funnels with AnyVan perks.

## Commands

```bash
npm install
npm run dev    # local dev
npm run lint
npm run build
```

## Env Vars

```
DATABASE_URL=postgres://...
```

## Schema

The SQL schema lives in `schema.sql`. Apply it to your Vercel Postgres instance:

```bash
psql "$DATABASE_URL" -f schema.sql
```
