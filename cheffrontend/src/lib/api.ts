export type Chef = {
    id: number;
    name: string;
    cuisine: string;
    pricePerPerson: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function getChefs(): Promise<Chef[]> {
    const res = await fetch(`${API_URL}/api/chefs`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch chefs");
    return res.json();
}

export async function seedChef(): Promise<Chef> {
    const res = await fetch(`${API_URL}/api/chefs/seed`, { method: "POST" });
    if (!res.ok) throw new Error("Failed to seed chef");
    return res.json();
}
