export async function apiGet(path) {
  const res = await fetch(path, { headers: { "Accept": "application/json" }});
  if (!res.ok) throw new Error(await safeErr(res));
  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(await safeErr(res));
  return res.json();
}

async function safeErr(res) {
  try {
    const data = await res.json();
    return data?.error || res.statusText;
  } catch {
    return res.statusText;
  }
}
