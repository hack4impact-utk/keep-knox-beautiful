export async function getAlteredUsername(username: string): Promise<string> {
  if (!username) throw new Error("Invalid username");
  console.log("testing for pr");
  return username + "123";
}
