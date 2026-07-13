ALTER TABLE "Task"
ADD COLUMN IF NOT EXISTS "userId" INTEGER;

INSERT INTO "User" ("name", "age")
SELECT 'default-user', NULL
WHERE NOT EXISTS (SELECT 1 FROM "User");

WITH owner AS (
  SELECT id FROM "User" ORDER BY id LIMIT 1
)
UPDATE "Task" AS t
SET "userId" = owner.id
FROM owner
WHERE t."userId" IS NULL;

ALTER TABLE "Task"
ALTER COLUMN "userId" SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'Task_userId_fkey'
  ) THEN
    ALTER TABLE "Task"
    ADD CONSTRAINT "Task_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE RESTRICT
    ON UPDATE CASCADE;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS "Task_userId_idx" ON "Task"("userId");
