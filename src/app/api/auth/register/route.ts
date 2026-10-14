import { insertUser } from "@/database/users/insert-user";
import { getUserByEmail } from "@/database/users/get-user-by-email";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name =
      typeof body.name === "string" ? body.name.trim() : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const password =
      typeof body.password === "string" ? body.password : "";

    // Validar campos obrigatórios
    if (!name || !email || !password) {
      return Response.json(
        { message: "Preencha todos os campos obrigatórios." },
        { status: 400 },
      );
    }

    // Validar formato do e-mail
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { message: "Informe um e-mail válido." },
        { status: 400 },
      );
    }

    // Validar tamanho da senha
    if (password.length < 8) {
      return Response.json(
        { message: "A senha deve ter pelo menos 8 caracteres." },
        { status: 400 },
      );
    }

    // Verificar se o e-mail já está cadastrado
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return Response.json(
        { message: "Este e-mail já está cadastrado." },
        { status: 409 },
      );
    }

    // Salvar o usuário no banco de dados
    const user = await insertUser({ name, email, password });

    return Response.json(
      {
        message: "Usuário cadastrado com sucesso!",
        user,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);

    return Response.json(
      {
        message:
          "Não foi possível realizar o cadastro. Tente novamente.",
      },
      { status: 500 },
    );
  }
}