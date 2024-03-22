-- CreateTable
CREATE TABLE "ThreadMessage" (
    "id" SERIAL NOT NULL,
    "type" TEXT DEFAULT 'chat',
    "data" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "threadId" TEXT,
    "from" TEXT,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ThreadMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ThreadMessage" ADD CONSTRAINT "ThreadMessage_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreadMessage" ADD CONSTRAINT "ThreadMessage_from_fkey" FOREIGN KEY ("from") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
