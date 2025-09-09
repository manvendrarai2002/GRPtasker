import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminEmail = 'admin@example.com'
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: await bcrypt.hash('admin123', 10),
      name: 'Admin',
      employeeId: 'A-0001',
      role: 'ADMIN',
    },
  })

  const emp = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      email: 'jane@example.com',
      password: await bcrypt.hash('password', 10),
      name: 'Jane Doe',
      employeeId: 'E-0001',
      role: 'EMPLOYEE',
    },
  })
  const group = await prisma.group.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Core Team',
      users: { connect: [{ id: admin.id }, { id: emp.id }] },
    },
  })
  await prisma.task.create({
    data: {
      title: 'Kickoff Meeting',
      description: 'Prepare agenda and share notes',
      priority: 'HIGH',
      groupId: group.id,
      assignees: { connect: [{ id: emp.id }] },
      checklist: { create: [{ text: 'Draft agenda' }, { text: 'Send invites' }] },
    },
  })
}

main().finally(async () => {
  await prisma.$disconnect()
})
