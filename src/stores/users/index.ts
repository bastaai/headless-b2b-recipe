import bcrypt from "bcrypt"; // Or bcrypt

export const users = [
  {
    id: "f84bbc6c-d76a-4d43-bbb9-72a99f8a5a2a",
    email: "alice@example.com",
    passwordHash: bcrypt.hashSync("basta", 10),
    isVerified: true,
  },
  {
    id: "a26ea7c6-8d3e-45da-a7b0-3f0b69ede352",
    email: "bob@example.com",
    passwordHash: bcrypt.hashSync("basta", 10),
    isVerified: true,
  },
  {
    id: "ed25eeb4-1d9d-4e3e-a2e5-feb52a86a0b5",
    email: "carol@example.com",
    passwordHash: bcrypt.hashSync("basta", 10),
    isVerified: false,
  },
];
