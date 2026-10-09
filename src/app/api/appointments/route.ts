import type { NextRequest } from "next/server";
import type { Appointment } from "@/types";

let appointments: Appointment[] = [
  {
    id: 1,
    pet: "Mimi",
    title: "Jantar da Mimi",
    category: "Alimentação",
    date: "2026-10-08",
    time: "19:00",
    notes: "Ração e água.",
  },
  {
    id: 2,
    pet: "Nina",
    title: "Ninar a Nina",
    category: "Rotina",
    date: "2026-10-08",
    time: "20:00",
    notes: "",
  },
  {
    id: 3,
    pet: "Thor",
    title: "Banho do Thor",
    category: "Higiene",
    date: "2026-10-09",
    time: "21:00",
    notes: "Usar shampoo neutro.",
  },
];

async function readBody(request: NextRequest): Promise<Partial<Appointment>> {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

function getId(request: NextRequest) {
  return Number(request.nextUrl.searchParams.get("id"));
}

export function GET() {
  return Response.json(appointments);
}

export async function POST(request: NextRequest) {
  const body = await readBody(request);
  const { title, pet, category, date, time } = body;
  if (!title || !pet || !category || !date || !time) {
    return Response.json(
      { message: "Preencha todos os campos obrigatórios." },
      { status: 400 },
    );
  }
  const item: Appointment = {
    notes: "",
    ...body,
    id: Date.now(),
    title,
    pet,
    category,
    date,
    time,
  };
  appointments.push(item);
  return Response.json(item, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const id = getId(request);
  if (!id)
    return Response.json({ message: "Informe um id válido." }, { status: 400 });

  const index = appointments.findIndex((item) => item.id === id);
  if (index === -1)
    return Response.json(
      { message: "Compromisso não encontrado." },
      { status: 404 },
    );
  appointments[index] = {
    ...appointments[index],
    ...(await readBody(request)),
    id,
  };
  return Response.json(appointments[index]);
}

export function DELETE(request: NextRequest) {
  const id = getId(request);
  if (!id)
    return Response.json({ message: "Informe um id válido." }, { status: 400 });

  const exists = appointments.some((item) => item.id === id);
  if (!exists)
    return Response.json(
      { message: "Compromisso não encontrado." },
      { status: 404 },
    );
  appointments = appointments.filter((item) => item.id !== id);
  return new Response(null, { status: 204 });
}
