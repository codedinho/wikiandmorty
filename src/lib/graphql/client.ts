async function fetchGraphQL(query: string, variables = {}) {
  const response = await fetch("https://rickandmortyapi.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }
  });

  if (!response.ok) {
    throw new Error("GraphQL request failed");
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error("GraphQL errors occurred: " + JSON.stringify(json.errors));
  }

  return json.data;
}

export default fetchGraphQL; 